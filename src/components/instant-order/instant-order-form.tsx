"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  Star,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Gift,
} from "lucide-react";
import { instantOrderFormSchema } from "@/types/zod.schema";
import { useCreateInstantOrder } from "@/hooks/use-instant-order";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { z } from "zod";
import posthog from "posthog-js";

type InstantOrderFormData = z.infer<typeof instantOrderFormSchema>;

// Declare fbq for TypeScript
declare global {
  interface Window {
    fbq?: (track: string, event: string, params?: Record<string, any>) => void;
  }
}

const InstantOrderForm = () => {
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [orderCount, setOrderCount] = useState(124);
  const [alertIndex, setAlertIndex] = useState(0);

  const createInstantOrderMutation = useCreateInstantOrder();

  // Dynamic Stock Alerts
  const stockAlerts = [
    <span key="1">
      Only <span className="font-bold text-red-600">9 bottles</span> left in
      stock!
    </span>,
    <span key="2">
      🔥 Selling fast in{" "}
      <span className="font-bold text-slate-900">Lalitpur</span>!
    </span>,
    <span key="3">
      ⚡ <span className="font-bold text-slate-900">11 people</span> are viewing
      this
    </span>,
    <span key="4">
      ⚠️ Low Stock: <span className="font-bold text-red-600">High Demand</span>
    </span>,
  ];

  useEffect(() => {
    // Random number between 100 and 140 for initial order count
    setOrderCount(Math.floor(Math.random() * (140 - 100 + 1)) + 100);

    // Rotate alerts every 3 seconds
    const interval = setInterval(() => {
      setAlertIndex((prev) => (prev + 1) % stockAlerts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const form = useForm({
    resolver: zodResolver(instantOrderFormSchema),
    defaultValues: {
      name: "",
      address: "",
      phone_number: "",
      quantity: 1,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    getValues,
    setValue,
    watch,
  } = form;

  const quantity = watch("quantity");
  const price = quantity === 3 ? 6750 : 2500;

  const onSubmit = async (data: InstantOrderFormData) => {
    try {
      setIsError(false);
      await createInstantOrderMutation.mutateAsync({
        name: data.name,
        address: data.address,
        phone_number: data.phone_number,
        quantity: data.quantity || 1,
      });

      const totalPrice = data.quantity === 3 ? 6750 : 2500;

      // Track instant order submission with PostHog
      posthog.capture("instant_order_submitted", {
        quantity: data.quantity || 1,
        total_price: totalPrice,
        product_name: "Yachu Hair Oil",
        delivery_address: data.address,
        offer_type: data.quantity === 3 ? "family_pack" : "trial_pack",
      });

      // Track Facebook Pixel Purchase event
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Purchase", {
          value: totalPrice,
          currency: "NPR",
          content_name: "Yachu Hair Oil",
          content_type: "product",
          num_items: data.quantity || 1,
        });
      }

      setIsSuccessDialogOpen(true);
      reset({ ...data, name: "", address: "", phone_number: "" }); // Reset fields but keep quantity logic if needed
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
      // Track order error with PostHog
      posthog.captureException(error);
    }
  };

  const RatingStars = () => (
    <div className="flex gap-0.5 text-primary">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/20 relative overflow-hidden pb-24 md:pb-28">
      <div className="max-w-md md:max-w-2xl mx-auto relative z-10">
        {/* Single Column Layout */}
        <div className="w-full">
          <Card className="border-0   bg-white/80  relative overflow-hidden rounded-none">
            {/* Product Image Area */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden bg-slate-100 group">
              <img
                src="/yachu-hair-oil-bottle.jpg"
                alt="Yachu Hair Oil"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <CardHeader className="space-y-3 md:space-y-4 pb-2 relative z-20 -mt-10 md:-mt-12 rounded-t-3xl bg-white/80 backdrop-blur-xl pt-5 md:pt-6 mx-2 md:mx-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">
                    Yachu Hair Oil
                  </h1>
                  <div className="flex items-center gap-2 mt-0.5 md:mt-1">
                    <RatingStars />
                    <span className="text-xs md:text-sm text-slate-500 font-medium">
                      (4.9/5)
                    </span>
                  </div>
                </div>
                {/* Price removed from header as it varies now */}
              </div>

              {/* Dynamic Alert Box */}
              <div className="bg-amber-50 border border-amber-100 text-amber-800 px-3 h-9 rounded-lg text-xs flex items-center gap-2 overflow-hidden relative shadow-sm">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <div className="flex-1 relative h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={alertIndex}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center whitespace-nowrap"
                    >
                      {stockAlerts[alertIndex]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-2 md:pt-4 px-4 md:px-6 pb-4 md:pb-6">
              <form
                id="order-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-5"
              >
                {/* Offer Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    Choose Quantity
                  </Label>
                  <div className="grid gap-2.5">
                    <div
                      className={cn(
                        "relative border-2 rounded-xl p-3 cursor-pointer transition-all duration-200 flex items-center justify-between",
                        quantity === 1
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-slate-100 bg-slate-50 hover:border-primary/30"
                      )}
                      onClick={() => setValue("quantity", 1)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            quantity === 1
                              ? "border-primary"
                              : "border-slate-300"
                          )}
                        >
                          {quantity === 1 && (
                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">
                            1 Bottle
                          </div>
                          <div className="text-xs text-slate-500">
                            Trial Pack
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-slate-900">Rs. 2500</div>
                    </div>

                    <div
                      className={cn(
                        "relative border-2 rounded-xl p-3 cursor-pointer transition-all duration-200 flex items-center justify-between overflow-hidden",
                        quantity === 3
                          ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/20"
                          : "border-slate-100 bg-slate-50 hover:border-primary/30"
                      )}
                      onClick={() => setValue("quantity", 3)}
                    >
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-bl-lg flex items-center gap-1">
                        <Gift className="w-3 h-3" />
                        BEST OFFER
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            quantity === 3
                              ? "border-primary"
                              : "border-slate-300"
                          )}
                        >
                          {quantity === 3 && (
                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            Buy 3 Bottles
                          </div>
                          <div className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                            At Rs. 2250 each
                          </div>
                        </div>
                      </div>
                      <div className="text-right pt-2">
                        <div className="font-bold text-slate-900 text-lg">
                          Rs. 6750
                        </div>
                        <div className="text-xs text-slate-400 line-through">
                          Rs. 7500
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100 w-full" />

                {/* Name Input */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-semibold">
                    Full Name
                  </Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="name"
                        placeholder="e.g. Anjali Sharma"
                        className={cn(
                          "bg-slate-50 transition-all focus:bg-white h-14 text-base",
                          errors.name && "border-red-500 bg-red-50"
                        )}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 font-medium ml-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone Input */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone_number"
                    className="text-sm font-semibold"
                  >
                    Phone Number
                  </Label>
                  <Controller
                    name="phone_number"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <Input
                          {...field}
                          id="phone_number"
                          type="tel"
                          placeholder="98XXXXXXXX"
                          className={cn(
                            " bg-slate-50 transition-all focus:bg-white h-14 text-base",
                            errors.phone_number && "border-red-500 bg-red-50"
                          )}
                        />
                      </div>
                    )}
                  />
                  {errors.phone_number && (
                    <p className="text-xs text-red-500 font-medium ml-1">
                      {errors.phone_number.message}
                    </p>
                  )}
                </div>

                {/* Address Input */}
                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-sm font-semibold">
                    Delivery Address
                  </Label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        id="address"
                        rows={3}
                        placeholder="Tole, Ward No, City..."
                        className={cn(
                          "flex w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:bg-white resize-none",
                          errors.address && "border-red-500 bg-red-50"
                        )}
                      />
                    )}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500 font-medium ml-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Security Text */}
                <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 pb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Secure Payment on Delivery
                </p>
              </form>
            </CardContent>

            {/* Social Proof Footer */}
            <div className="bg-slate-50 p-4 md:p-5 border-t border-slate-100 flex items-center justify-between text-xs md:text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                🔥{" "}
                <span className="text-slate-700 font-bold">{orderCount}</span>{" "}
                ordered today
              </span>
              <span>Sankhamul, Lalitpur</span>
            </div>
          </Card>

          {/* Error Fallback */}
          {isError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-800 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold text-sm">Connection Error</p>
                <p className="text-xs">
                  Please check your internet or try again.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Bar - Always Visible */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] p-4 pb-6 md:pb-6">
        <div className="flex items-center gap-4 max-w-md md:max-w-2xl mx-auto">
          <div className="flex-1">
            <div className="text-[10px] md:text-xs text-slate-500 font-semibold uppercase tracking-wide">
              Total to Pay
            </div>
            <div className="text-xl md:text-2xl font-extrabold text-slate-900">
              Rs. {price}
            </div>
          </div>
          <Button
            size="lg"
            variant="default"
            disabled={isSubmitting || createInstantOrderMutation.isPending}
            className="flex-[2] md:flex-[1.5] h-12 md:h-14 text-base md:text-lg shadow-xl shadow-primary/20 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent font-semibold"
            onClick={() => {
              // Trigger form submit programmatically
              const form = document.getElementById(
                "order-form"
              ) as HTMLFormElement;
              if (form) form.requestSubmit();
            }}
          >
            {isSubmitting || createInstantOrderMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                <span className="hidden md:inline">Processing...</span>
                <span className="md:hidden">Processing...</span>
              </>
            ) : (
              <>
                <span className="hidden md:inline">
                  Confirm Order - Rs. {price}
                </span>
                <span className="md:hidden">
                  Confirm Order <ArrowRight className="ml-2 w-4 h-4 inline" />
                </span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-in zoom-in spin-in-90 duration-300">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl text-center text-slate-900">
              Order Placed!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Thank you,{" "}
              <span className="font-semibold text-slate-900">
                {getValues().name}
              </span>
              . <br />
              We will call you shortly to confirm delivery to Sankhamul.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-slate-50 p-4 rounded-xl mt-4 text-left space-y-2 border border-slate-100">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Items</span>
              <span className="font-medium text-slate-900">
                {quantity === 3 ? "3 Bottles (Family Pack)" : "1 Bottle"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Amount to Pay</span>
              <span className="font-bold text-slate-900">Rs. {price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Delivery Location</span>
              <span className="font-medium text-slate-900">
                Sankhamul, Lalitpur
              </span>
            </div>
          </div>
          <div className="mt-6">
            <Button
              className="w-full bg-slate-900 hover:bg-slate-800 rounded-xl h-12"
              onClick={() => setIsSuccessDialogOpen(false)}
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstantOrderForm;
