"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CheckoutForm from "../product/CheckoutForm";
import posthog from "posthog-js";
import { useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onCloseSheet?: () => void;
  deliveryLocation?: "inside" | "outside";
  onDeliveryLocationChange?: (value: "inside" | "outside") => void;
}

export function CheckoutModal({
  isOpen,
  setIsOpen,
  onCloseSheet,
  deliveryLocation,
  onDeliveryLocationChange,
}: Props) {
  const hasTrackedOpen = useRef(false);

  // Track checkout modal opened with PostHog
  useEffect(() => {
    if (isOpen && !hasTrackedOpen.current) {
      posthog.capture("checkout_modal_opened");
      hasTrackedOpen.current = true;
    }
    if (!isOpen) {
      hasTrackedOpen.current = false;
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      {/* Bottom sheet on mobile, centered dialog from sm up */}
      <DialogContent className="top-auto bottom-0 left-0 flex max-h-[94dvh] w-full max-w-full translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-b-none rounded-t-3xl border-0 p-0 data-[state=open]:slide-in-from-bottom-10 sm:top-[50%] sm:bottom-auto sm:left-[50%] sm:max-h-[90vh] sm:max-w-xl sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-3xl sm:border sm:data-[state=open]:slide-in-from-bottom-0">
        <DialogHeader className="shrink-0 px-5 pb-1 pt-5 text-left sm:px-7">
          <DialogTitle className="text-xl font-bold sm:text-2xl">
            Complete your order
          </DialogTitle>
          <DialogDescription className="sr-only">
            Enter your name, phone number and delivery address. We will call
            you to confirm your order.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-3 sm:px-7">
          <CheckoutForm
            onSuccess={() => setIsOpen(false)}
            onCloseSheet={onCloseSheet}
            initialDeliveryLocation={deliveryLocation}
            onDeliveryLocationChange={onDeliveryLocationChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
