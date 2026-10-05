"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import CheckoutForm from "../product/CheckoutForm";
import posthog from "posthog-js";
import { useEffect, useRef } from "react";

function useIsMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

export function CheckoutModal({ isOpen, setIsOpen, onCloseSheet }) {
  const hasTrackedOpen = useRef(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen && !hasTrackedOpen.current) {
      try {
        posthog.capture("checkout_modal_opened");
      } catch (e) {}
      hasTrackedOpen.current = true;
    }
    if (!isOpen) hasTrackedOpen.current = false;
  }, [isOpen]);

  const header = (
    <div className="text-center px-8 pt-2 pb-2 border-b border-border">
      <h2 className="text-2xl font-display text-forest">Place your order</h2>
      <p className="text-sm text-foreground/50 mt-1">
        We will call you shortly to confirm
      </p>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="focus:outline-none !max-h-[97dvh] flex flex-col">
          <DrawerTitle className="sr-only">Place your order</DrawerTitle>
          <DrawerDescription className="sr-only">Fill in your details to place an order</DrawerDescription>
          {header}
          <div className="flex-1 overflow-y-auto">
            <CheckoutForm
              onSuccess={() => setIsOpen(false)}
              onCloseSheet={onCloseSheet}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-w-2xl w-full p-0  gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Place your order</DialogTitle>
          <DialogDescription>
            Fill in your details to place an order
          </DialogDescription>
        </DialogHeader>
        {header}
        <div className="overflow-y-auto max-h-[75vh] md:px-8">
          <CheckoutForm
            onSuccess={() => setIsOpen(false)}
            onCloseSheet={onCloseSheet}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
