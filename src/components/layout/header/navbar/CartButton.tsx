"use client";
import React from "react";
import ProductCart from "@/components/product/ProductCart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { getTotalCount } from "@/services/lib/utils";
import useProductCart from "@/store/zustand";
import { ShoppingCartIcon } from "lucide-react";

interface CartButtonProps {
  className?: string;
}

const CartButton: React.FC<CartButtonProps> = ({ className }) => {
  const { cart } = useProductCart();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          data-cart-trigger // Add this attribute
          variant={"link"}
          size={"icon"}
          className={`relative text-primary ${className}`}
        >
          <ShoppingCartIcon />{" "}
          {cart.length > 0 && (
            <Badge className="absolute -top-1 -right-1 rounded-full text-primary-foreground bg-secondary h-5 w-5 p-0 flex items-center justify-center text-xs font-medium min-w-[20px]">
              {getTotalCount(cart)}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[540px]">
        <ProductCart onCloseSheet={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default CartButton;