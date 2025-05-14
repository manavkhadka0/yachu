"use client";
import React from "react";
import ProductCart from "@/components/product/ProductCart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { getTotalCount } from "@/lib/utils";
import useProductCart from "@/store/zustand";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
interface CartButtonProps {
  className?: string;
}

const CartButton: React.FC<CartButtonProps> = ({ className }) => {
  const { cart } = useProductCart();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    
      <Link href="/checkout">
          <Button
          variant={"link"}
          size={"icon"}
          className={`relative ${className}`}
        >
          <ShoppingCartIcon />{" "}
          {cart.length > 0 && (
            <Badge className="absolute -top-1 -right-1 rounded-full hover:text-blue-300 h-5 w-5 p-2 flex items-center justify-center">
              {getTotalCount(cart)}
            </Badge>
          )}
        </Button>
        </Link>
      
  );
};

export default CartButton;
