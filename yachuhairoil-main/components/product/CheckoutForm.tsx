"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, CheckCircle2, Truck, Globe2 } from "lucide-react";
import posthog from "posthog-js";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn, calculateTotalPrice } from "@/lib/utils";

import { checkoutFormSchema } from "@/schemas/order.schemas";
import RHFInput from "@/components/react-hook-form/RHFInput";
import RHFTextarea from "@/components/react-hook-form/RHFTextarea";
import { useCartStore } from "@/hooks/useCartStore";
import { useCreateOrder } from "@/hooks/use-orders";

interface CheckoutFormProps {
  onSuccess?: () => void;
  onCloseSheet?: () => void;
  className?: string;
}

const CheckoutForm = ({
  onSuccess,
  onCloseSheet,
  className,
}: CheckoutFormProps) => {
  const { cart, clearCart } = useCartStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const createOrderMutation = useCreateOrder();

  const form = useForm({
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

  const onSubmit = async (data) => {
    const orderData = {
      full_name: data.name,
      email: data.email || null,
      phone_number: data.phone,
      alternate_phone_number: data.alternate_phone || null,
      delivery_address: data.address,
      payment_method: "Cash on Delivery",
      total_amount: calculateTotalPrice(cart),
      order_products: cart.map((item) => ({
        product_id: Number(item.product.id),
        quantity: item.count,
      })),
      remarks: data.remarks || null,
    };

    try {
      await createOrderMutation.mutateAsync(orderData);
      try {
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
      } catch (phError) {
        console.warn("PostHog event tracking failed:", phError);
      }

      clearCart();
      form.reset();
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
      <div className="flex flex-col items-center justify-center py-16 px-8 text-center space-y-6">
        <div className="rounded-full bg-[#2C4332]/10 p-5">
          <CheckCircle2 className="h-12 w-12 text-[#2C4332]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-display text-forest">Order Placed!</h3>
          <p className="text-sm text-foreground/50 leading-relaxed max-w-xs">
            Thank you. Our team will contact you shortly to confirm your
            details.
          </p>
        </div>
      </div>
    );
  }

  const isSubmitting = createOrderMutation.isPending;

  return (
    <div className={cn("px-6 py-4 space-y-5", className)}>
      {/* Delivery info */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-forest/5 border border-forest/10">
          <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
            <Globe2 className="w-5 h-5 text-forest" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-forest">We Ship Worldwide</h4>
            <p className="text-[11px] text-foreground/60 mt-0.5">
              Fast & reliable global delivery to your doorstep.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5 text-foreground/60" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Local Rates (Nepal)</h4>
            <p className="text-[11px] text-foreground/60 mt-0.5">
              Rs. 100 inside Kathmandu Valley · Rs. 150 outside
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <RHFInput
            name="name"
            label="Full Name"
            placeholder="John Doe"
            required
            disabled={isSubmitting}
          />

          <div className="grid grid-cols-2 gap-4">
            <RHFInput
              name="phone"
              label="Phone Number"
              placeholder="9865436650"
              type="tel"
              required
              disabled={isSubmitting}
            />
            <RHFInput
              name="alternate_phone"
              label="Alternate Phone"
              placeholder="9865436651"
              type="tel"
              disabled={isSubmitting}
            />
          </div>

          <RHFInput
            name="email"
            label="Email Address"
            placeholder="john@gmail.com"
            type="email"
            disabled={isSubmitting}
          />

          <RHFTextarea
            name="address"
            label="Delivery Address"
            rows={3}
            placeholder="New Baneshwor - 10, Kathmandu"
            required
            disabled={isSubmitting}
          />

          <RHFTextarea
            name="remarks"
            label="Remarks"
            rows={2}
            placeholder="Any special instructions for your order"
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full h-12 rounded-2xl bg-forest hover:bg-forest/90 text-cream font-bold text-lg shadow-lg mt-2",
              isSubmitting && "animate-pulse",
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Place Order (Cash on Delivery)"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
