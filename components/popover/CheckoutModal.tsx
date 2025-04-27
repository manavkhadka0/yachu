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

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onCloseSheet?: () => void;
}

export function CheckoutModal({ isOpen, setIsOpen, onCloseSheet }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[725px] max-w-full mx-auto p-4 sm:p-6 lg:p-8 overflow-y-auto h-full sm:h-auto">
        <DialogHeader className="mb-8">
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
        />
      </DialogContent>
    </Dialog>
  );
}
