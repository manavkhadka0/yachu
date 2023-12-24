"use client";
import ProductCart from "@/components/product/ProductCart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { getTotalCount } from "@/lib/utils";
import useProductCart from "@/store/zustand";
import { ShoppingCartIcon } from "lucide-react";

const CartButton = () => {
  const { cart } = useProductCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"link"} size={"icon"} className=" relative">
          <ShoppingCartIcon />{" "}
          {cart.length > 0 && (
            <Badge className="absolute -top-1 -right-1 rounded-full h-5 w-5 p-2 flex items-center justify-center">
              {getTotalCount(cart)}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[540px]">
        <ProductCart />
      </SheetContent>
    </Sheet>
  );
};
export default CartButton;
