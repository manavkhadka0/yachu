"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import {
  Loader2,
  CheckCircle2,
  Banknote,
  Minus,
  Plus,
  ChevronDown,
  ShoppingBag,
  Gift,
} from "lucide-react";
import { checkoutFormSchema } from "@/types/zod.schema";
import RHFInput from "../react-hook-form/RHFInput";
import RHFTextarea from "../react-hook-form/RHFTextarea";
import useProductCart from "@/store/zustand";
import { calculateTotalPrice } from "@/services/lib/utils";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { useCreateOrder } from "@/hooks/use-orders";
import { TCreateOrderRequest } from "@/types/order";
import {
  initiateNPSPayment,
  getNPSStatus,
  NPSInitiateResponse,
} from "@/services/api/nps";
import posthog from "posthog-js";
import { toast } from "sonner";
import { DASHAIN_PACKS, dashainUnitPrice } from "@/constants/offers";

interface CheckoutFormProps {
  onSuccess?: () => void;
  onCloseSheet?: () => void;
  className?: string;
  initialDeliveryLocation?: "inside" | "outside";
  onDeliveryLocationChange?: (location: "inside" | "outside") => void;
}

type PaymentMethodType = "cod" | "nps";

const CheckoutForm = ({
  onSuccess,
  onCloseSheet,
  className,
  initialDeliveryLocation = "inside",
  onDeliveryLocationChange,
}: CheckoutFormProps) => {
  const { cart, clearCart, addToCart, increaseCount, decreaseCount } =
    useProductCart();

  // Keep pack products on the Dashain price that matches their quantity
  useEffect(() => {
    let changed = false;
    const next = cart.map((item) => {
      const price = dashainUnitPrice(item.product.slug, item.count);
      if (price === undefined || price === item.product.price) return item;
      changed = true;
      return { ...item, product: { ...item.product, price } };
    });
    if (changed) addToCart(next);
  }, [cart, addToCart]);

  // Offer the best-value pack when a pack product is below it
  const upsell = cart
    .map((item) => {
      const pack = DASHAIN_PACKS.find((p) => p.slug === item.product.slug);
      const best = pack?.tiers.find((t) => t.best);
      return best && item.count < best.qty ? { item, best } : null;
    })
    .find((entry) => entry !== null);

  const applyUpsell = () => {
    if (!upsell) return;
    posthog.capture("checkout_upsell_accepted", {
      product_slug: upsell.item.product.slug,
      quantity: upsell.best.qty,
    });
    addToCart(
      cart.map((item) =>
        item.product.id === upsell.item.product.id
          ? {
              product: { ...item.product, price: upsell.best.perPcs },
              count: upsell.best.qty,
            }
          : item
      )
    );
  };
  const [deliveryLocation, setDeliveryLocation] = useState<"inside" | "outside">(
    initialDeliveryLocation || "inside"
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isNpsEnabled, setIsNpsEnabled] = useState<boolean | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cod");
  const [isInitiatingNps, setIsInitiatingNps] = useState(false);
  const [gatewayForm, setGatewayForm] = useState<
    NPSInitiateResponse["gateway_form"] | null
  >(null);

  const formRef = useRef<HTMLFormElement>(null);
  const createOrderMutation = useCreateOrder();

  useEffect(() => {
    if (initialDeliveryLocation) {
      setDeliveryLocation(initialDeliveryLocation);
    }
  }, [initialDeliveryLocation]);

  const handleDeliveryLocationChange = (loc: "inside" | "outside") => {
    setDeliveryLocation(loc);
    onDeliveryLocationChange?.(loc);
  };

  const subtotal = calculateTotalPrice(cart);
  const deliveryCharge = deliveryLocation === "inside" ? 100 : 150;
  const totalAmount = subtotal + deliveryCharge;

  // Cash on Delivery stays the default; online payment is offered when enabled
  useEffect(() => {
    getNPSStatus()
      .then((res) => setIsNpsEnabled(res.is_enabled))
      .catch((err) => {
        console.warn("Could not check NPS status:", err);
        setIsNpsEnabled(false);
      });
  }, []);

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      alternate_phone: "",
      address: "",
      remarks: "",
    },
  });

  const { handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const locationLabel =
      deliveryLocation === "inside"
        ? "Inside Kathmandu Valley"
        : "Outside Kathmandu Valley";
    const formattedAddress = `${data.address.trim()} (${locationLabel})`;
    const deliveryRemarks = `Delivery: ${locationLabel} (Rs. ${deliveryCharge})`;
    const formattedRemarks = data.remarks
      ? `${data.remarks.trim()} | ${deliveryRemarks}`
      : deliveryRemarks;

    if (paymentMethod === "nps") {
      // --- Payment-First Method (Create Order After Payment Success) ---
      setIsInitiatingNps(true);
      try {
        // Save checkout customer form details into localStorage for backend verification on redirect callback
        const checkoutPayload = {
          name: data.name,
          email: data.email || null,
          phone: data.phone,
          alternate_phone: data.alternate_phone || null,
          address: formattedAddress,
          delivery_location: deliveryLocation,
          delivery_charge: deliveryCharge,
          subtotal: subtotal,
          total_amount: totalAmount,
          remarks: formattedRemarks,
          order_products: cart.map((item) => ({
            product_id: Number(item.product.id),
            quantity: item.count,
          })),
        };
        localStorage.setItem(
          "nps_pending_checkout",
          JSON.stringify(checkoutPayload)
        );

        const callbackUrl = `${window.location.origin}/payment/nps/callback`;

        // Call /api/nps/initiate/ with order_id: null and full total amount with delivery charge
        const npsResponse = await initiateNPSPayment(
          totalAmount,
          null,
          `Checkout for ${data.name}`,
          callbackUrl
        );

        posthog.capture("nps_payment_initiated", {
          total_amount: totalAmount,
          subtotal: subtotal,
          delivery_charge: deliveryCharge,
          delivery_location: deliveryLocation,
          products_count: cart.length,
          merchant_txn_id: npsResponse.merchant_txn_id,
        });

        setGatewayForm(npsResponse.gateway_form);

        // Auto-submit the hidden gateway form to redirect user to NPS portal
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.submit();
          }
        }, 100);
      } catch (err: unknown) {
        console.error("NPS initiation failed:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Could not connect to Nepal Payment Solution gateway.";
        toast.error("Payment Initiation Failed", {
          description: errorMessage,
        });
        setIsInitiatingNps(false);
      }
      return;
    }

    // --- Cash on Delivery Flow ---
    const orderData: TCreateOrderRequest = {
      full_name: data.name,
      email: data.email || null,
      phone_number: data.phone,
      alternate_phone_number: data.alternate_phone || null,
      delivery_address: formattedAddress,
      payment_method: "Cash on Delivery",
      payment_type: "COD",
      total_amount: totalAmount,
      order_products: cart.map((item) => ({
        product_id: Number(item.product.id),
        quantity: item.count,
      })),
      remarks: formattedRemarks,
    };

    try {
      await createOrderMutation.mutateAsync(orderData);

      posthog.capture("order_placed", {
        total_amount: orderData.total_amount,
        subtotal: subtotal,
        delivery_charge: deliveryCharge,
        delivery_location: deliveryLocation,
        payment_method: orderData.payment_method,
        products_count: cart.length,
        product_ids: cart.map((item) => item.product.id),
        product_titles: cart.map((item) => item.product.title),
        delivery_address: orderData.delivery_address,
      });

      if (data.email) {
        posthog.identify(data.email, {
          name: data.name,
          phone: data.phone,
          email: data.email,
        });
      }

      clearCart();
      reset();
      setIsSuccess(true);

      setTimeout(() => {
        onSuccess?.();
        onCloseSheet?.();
      }, 2000);
    } catch (error) {
      console.error("Order submission failed:", error);
    }
  };

  if (isSuccess) {
    return (
      <Card className={cn("border-0 shadow-none", className)}>
        <CardContent className="flex flex-col items-center justify-center py-12 px-4 space-y-6 text-center">
          <div className="rounded-full bg-primary/10 p-3 border border-primary/20">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl text-foreground">
              Order Placed Successfully!
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Thank you for your order. One of our representatives will contact
              you shortly to confirm your order details.
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isSubmitting = createOrderMutation.isPending || isInitiatingNps;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        <p className="text-lg font-semibold text-foreground">
          Your cart is empty
        </p>
        <p className="text-sm text-muted-foreground">
          Add a product to place your order.
        </p>
      </div>
    );
  }

  const choiceClass = (active: boolean) =>
    cn(
      "flex h-14 cursor-pointer flex-col items-start justify-center gap-0.5 whitespace-nowrap rounded-xl border-2 px-3.5 text-sm font-semibold text-foreground transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:text-base",
      active
        ? "border-forest bg-accent/60"
        : "border-border bg-background hover:border-forest/30"
    );

  return (
    <Card className={cn("border-0 bg-transparent py-0 shadow-none", className)}>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Order summary */}
            <div className="rounded-2xl bg-cream p-3.5">
              <ul className="space-y-3">
                {cart.map(({ product, count }) => (
                  <li key={product.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border bg-white">
                      <img
                        src={product.image1}
                        alt=""
                        width="48"
                        height="48"
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <p className="min-w-0 flex-1 truncate text-base font-semibold text-foreground">
                      {product.title}
                    </p>
                    <div className="flex shrink-0 items-center rounded-full border bg-white">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.title}`}
                        onClick={() => decreaseCount(product.id)}
                        disabled={isSubmitting || count <= 1}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-base font-bold tabular-nums">
                        {count}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.title}`}
                        onClick={() => increaseCount(product.id)}
                        disabled={isSubmitting}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-foreground disabled:opacity-30"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {upsell && (
                <button
                  type="button"
                  onClick={applyUpsell}
                  disabled={isSubmitting}
                  className="mt-3 flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-gold/40 bg-gold/10 px-3 py-2.5 text-left transition-colors hover:bg-gold/20"
                >
                  <Gift className="h-5 w-5 shrink-0 text-gold" />
                  <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-forest">
                    Get {upsell.best.qty} and save Rs.{" "}
                    {(
                      upsell.best.originalPrice - upsell.best.price
                    ).toLocaleString()}
                    {upsell.best.perk.startsWith("Free") && " + free Facewash"}
                  </span>
                  <span className="shrink-0 rounded-full bg-forest px-3 py-1.5 text-xs font-bold text-cream">
                    Get {upsell.best.qty}
                  </span>
                </button>
              )}

              <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
                <span className="text-sm text-foreground">
                  Total with delivery
                </span>
                <span className="text-xl font-extrabold text-foreground">
                  Rs. {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <RHFInput
              name="name"
              label="Full name"
              floatingLabel
              autoComplete="name"
              disabled={isSubmitting}
            />

            <RHFInput
              name="phone"
              label="Phone number"
              floatingLabel
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              disabled={isSubmitting}
            />

            {/* Delivery Location Selector */}
            <div
              role="radiogroup"
              aria-label="Delivery location"
              className="grid grid-cols-2 gap-2.5"
            >
              {(
                [
                  { value: "inside", label: "Inside Valley", charge: 100 },
                  { value: "outside", label: "Outside Valley", charge: 150 },
                ] as const
              ).map((option) => {
                const active = deliveryLocation === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => handleDeliveryLocationChange(option.value)}
                    disabled={isSubmitting}
                    className={choiceClass(active)}
                  >
                    {option.label}
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                      Rs. {option.charge}
                    </span>
                  </button>
                );
              })}
            </div>

            <RHFTextarea
              name="address"
              label="Delivery address"
              floatingLabel
              rows={2}
              autoComplete="street-address"
              className="min-h-[80px]"
              disabled={isSubmitting}
            />

            {/* Payment Method Selector */}
            {isNpsEnabled && (
              <div
                role="radiogroup"
                aria-label="Payment method"
                className="grid grid-cols-2 gap-2.5"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={paymentMethod === "cod"}
                  onClick={() => setPaymentMethod("cod")}
                  disabled={isSubmitting}
                  className={choiceClass(paymentMethod === "cod")}
                >
                  Cash on Delivery
                  <Banknote className="hidden h-5 w-5 shrink-0 text-primary sm:block" />
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={paymentMethod === "nps"}
                  onClick={() => setPaymentMethod("nps")}
                  disabled={isSubmitting}
                  className={choiceClass(paymentMethod === "nps")}
                >
                  Pay online
                  <Image
                    src="/nps.png"
                    alt="NPS"
                    width={40}
                    height={18}
                    className="hidden h-4 w-auto shrink-0 object-contain sm:block"
                  />
                </button>
              </div>
            )}

            {/* Optional details stay out of the way until asked for */}
            <button
              type="button"
              aria-expanded={showMore}
              onClick={() => setShowMore((open) => !open)}
              className="flex cursor-pointer items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  showMore && "rotate-180"
                )}
              />
              Add a note or email
            </button>

            <div className={cn("space-y-3", !showMore && "hidden")}>
              <RHFInput
                name="alternate_phone"
                label="Alternate phone number"
                floatingLabel
                type="tel"
                inputMode="numeric"
                disabled={isSubmitting}
              />
              <RHFInput
                name="email"
                label="Email address"
                floatingLabel
                type="email"
                autoComplete="email"
                disabled={isSubmitting}
              />
              <RHFTextarea
                name="remarks"
                label="Note for your order"
                floatingLabel
                rows={2}
                disabled={isSubmitting}
              />
            </div>

            {/* Submit stays pinned to the bottom of the sheet */}
            <div className="sticky bottom-0 -mx-5 rounded-b-3xl bg-background px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:-mx-7 sm:px-7">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 w-full rounded-full text-base font-bold shadow-lg shadow-primary/30 sm:text-lg"
                variant="default"
              >
                {isInitiatingNps ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Redirecting to NPS Gateway...</span>
                  </>
                ) : createOrderMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Placing your order...</span>
                  </>
                ) : paymentMethod === "nps" ? (
                  `Pay Rs. ${totalAmount.toLocaleString()}`
                ) : (
                  `Confirm Order · Rs. ${totalAmount.toLocaleString()}`
                )}
              </Button>
            </div>
          </form>

          {/* Hidden Gateway Form for Auto-Submit */}
          {gatewayForm && (
            <form
              ref={formRef}
              action={gatewayForm.action_url}
              method={gatewayForm.method}
              encType={gatewayForm.enctype}
              className="hidden"
            >
              {Object.entries(gatewayForm.form_fields).map(([key, value]) => (
                <input key={key} type="hidden" name={key} value={value} />
              ))}
            </form>
          )}
        </Form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
