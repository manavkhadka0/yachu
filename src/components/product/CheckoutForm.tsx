"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import {
  Loader2,
  Info,
  CheckCircle2,
  CreditCard,
  Banknote,
  ShieldCheck,
} from "lucide-react";
import { checkoutFormSchema } from "@/types/zod.schema";
import RHFInput from "../react-hook-form/RHFInput";
import RHFTextarea from "../react-hook-form/RHFTextarea";
import useProductCart from "@/store/zustand";
import { calculateTotalPrice } from "@/services/lib/utils";
import { useState, useRef, useEffect } from "react";
import { Alert, AlertDescription } from "../ui/alert";
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

interface CheckoutFormProps {
  onSuccess?: () => void;
  onCloseSheet?: () => void;
  className?: string;
}

type PaymentMethodType = "cod" | "nps";

const CheckoutForm = ({
  onSuccess,
  onCloseSheet,
  className,
}: CheckoutFormProps) => {
  const { cart, clearCart } = useProductCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isNpsEnabled, setIsNpsEnabled] = useState<boolean | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cod");
  const [isInitiatingNps, setIsInitiatingNps] = useState(false);
  const [gatewayForm, setGatewayForm] = useState<
    NPSInitiateResponse["gateway_form"] | null
  >(null);

  const formRef = useRef<HTMLFormElement>(null);
  const createOrderMutation = useCreateOrder();

  useEffect(() => {
    getNPSStatus()
      .then((res) => {
        setIsNpsEnabled(res.is_enabled);
        if (res.is_enabled) {
          setPaymentMethod("nps");
        } else {
          setPaymentMethod("cod");
        }
      })
      .catch((err) => {
        console.warn("Could not check NPS status:", err);
        setIsNpsEnabled(false);
        setPaymentMethod("cod");
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
    const totalAmount = calculateTotalPrice(cart);

    if (paymentMethod === "nps") {
      // --- OPTION B: Payment-First Method (Create Order After Payment Success) ---
      setIsInitiatingNps(true);
      try {
        // Save checkout customer form details into localStorage for backend verification on redirect callback
        const checkoutPayload = {
          name: data.name,
          email: data.email || null,
          phone: data.phone,
          alternate_phone: data.alternate_phone || null,
          address: data.address,
          remarks: data.remarks || null,
          order_products: cart.map((item) => ({
            product_id: Number(item.product.id),
            quantity: item.count,
          })),
        };
        localStorage.setItem(
          "nps_pending_checkout",
          JSON.stringify(checkoutPayload),
        );

        const callbackUrl = `${window.location.origin}/payment/nps/callback`;

        // Call /api/nps/initiate/ with order_id: null
        const npsResponse = await initiateNPSPayment(
          totalAmount,
          null,
          `Checkout for ${data.name}`,
          callbackUrl,
        );

        posthog.capture("nps_payment_initiated", {
          total_amount: totalAmount,
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
      delivery_address: data.address,
      payment_method: "Cash on Delivery",
      payment_type: "COD",
      total_amount: totalAmount,
      order_products: cart.map((item) => ({
        product_id: Number(item.product.id),
        quantity: item.count,
      })),
      remarks: data.remarks || null,
    };

    try {
      await createOrderMutation.mutateAsync(orderData);

      posthog.capture("order_placed", {
        total_amount: orderData.total_amount,
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
          <div className="rounded-full bg-emerald-500/10 p-3 border border-emerald-500/20">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
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

  return (
    <Card className={cn("border-0 shadow-none", className)}>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Alert className="border-l-4 border-l-amber-500 bg-amber-500/5 border-amber-500/20">
              <Info className="h-5 w-5 text-amber-600" />
              <AlertDescription className="text-foreground">
                Delivery charge: Rs. 100 for inside Kathmandu Valley, Rs. 150
                for outside Kathmandu Valley
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <RHFInput
                name="name"
                label="Full Name"
                placeholder="eg. John Doe"
                required
                className="text-base"
                disabled={isSubmitting}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <RHFInput
                  name="phone"
                  label="Phone Number"
                  placeholder="eg. 9865436650"
                  type="tel"
                  className="text-base"
                  required
                  disabled={isSubmitting}
                />
                <RHFInput
                  name="alternate_phone"
                  label="Alternate Phone Number (Optional)"
                  placeholder="eg. 9865436651"
                  type="tel"
                  className="text-base"
                  disabled={isSubmitting}
                />
              </div>

              <RHFInput
                name="email"
                label="Email Address (Optional)"
                placeholder="eg. john@gmail.com"
                type="email"
                className="text-base"
                disabled={isSubmitting}
              />

              <RHFTextarea
                name="address"
                label="Delivery Address"
                rows={3}
                placeholder="eg. New baneshwor - 10, Kathmandu"
                className="text-base"
                required
                disabled={isSubmitting}
              />

              <RHFTextarea
                name="remarks"
                label="Remarks (Optional)"
                rows={2}
                placeholder="Any special instructions or notes for your order"
                className="text-base"
                disabled={isSubmitting}
              />
            </div>

            {/* Payment Method Selector */}
            {isNpsEnabled && (
              <div className="space-y-3 pt-2">
                <label className="text-sm font-semibold text-foreground">
                  Payment Method
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("nps")}
                    disabled={isSubmitting}
                    className={cn(
                      "flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all gap-2 text-center text-sm font-medium cursor-pointer",
                      paymentMethod === "nps"
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-border/60 hover:border-border hover:bg-muted/30 text-muted-foreground",
                    )}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Pay with NPS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    disabled={isSubmitting}
                    className={cn(
                      "flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all gap-2 text-center text-sm font-medium cursor-pointer",
                      paymentMethod === "cod"
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-border/60 hover:border-border hover:bg-muted/30 text-muted-foreground",
                    )}
                  >
                    <Banknote className="h-5 w-5" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {paymentMethod === "nps" && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-lg border border-border/50">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>
                      Secured by Nepal Payment Solution (Mobile Banking,
                      Wallets, Cards)
                    </span>
                  </div>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full sm:text-lg p-6 transition-all relative font-semibold",
                isSubmitting && "animate-pulse",
              )}
              variant="default"
            >
              {isInitiatingNps ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  <span>Redirecting to NPS Gateway...</span>
                </>
              ) : createOrderMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  <span>Processing Order...</span>
                </>
              ) : paymentMethod === "nps" ? (
                `Pay Rs. ${calculateTotalPrice(cart)} with NPS`
              ) : (
                "Confirm Order (COD)"
              )}
            </Button>
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
