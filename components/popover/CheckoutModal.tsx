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
}

export function CheckoutModal({ isOpen, setIsOpen }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader className="mb-8">
          <DialogTitle className=" text-xl sm:text-2xl text-center">
            Place your order now
          </DialogTitle>
          <DialogDescription className="text-center">
            We will call you shortly to confirm your order
          </DialogDescription>
        </DialogHeader>
        <CheckoutForm />
      </DialogContent>
    </Dialog>
  );
}
