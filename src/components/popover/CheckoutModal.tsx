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
      <DialogContent className="sm:max-w-[725px] max-w-full mx-auto p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl sm:text-2xl text-center">
            Place your order now
          </DialogTitle>
          <DialogDescription className="text-center">
            We will call you shortly to confirm your order
          </DialogDescription>
        </DialogHeader>
        <CheckoutForm
          onSuccess={() => setIsOpen(false)}
          onCloseSheet={onCloseSheet}
          initialDeliveryLocation={deliveryLocation}
          onDeliveryLocationChange={onDeliveryLocationChange}
        />
      </DialogContent>
    </Dialog>
  );
}
