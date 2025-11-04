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
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild> </DialogTrigger>
     <DialogContent className="sm:max-w-[725px] max-w-full mx-auto p-0 h-full sm:h-auto sm:max-h-[90vh] flex flex-col">
  <DialogHeader className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 shrink-0">
    <DialogTitle className="text-xl sm:text-2xl text-center">
      Place your order now
    </DialogTitle>
    <DialogDescription className="text-center">
      We will call you shortly to confirm your order
    </DialogDescription>
  </DialogHeader>
  
  <div className="overflow-y-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 flex-1">
    <CheckoutForm
      onSuccess={() => setIsOpen(false)}
      onCloseSheet={onCloseSheet}
    />
  </div>
</DialogContent>
    </Dialog>
  );
}
