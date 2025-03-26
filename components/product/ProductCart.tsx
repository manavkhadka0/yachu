"use client";

import { calculateTotalPrice } from "@/lib/utils";
import useProductCart from "@/store/zustand";
import Image from "next/image";
import { Button } from "../ui/button";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { CheckoutModal } from "../popover/CheckoutModal";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ProductCartProps {
  onCloseSheet?: () => void;
}

const ProductCart = ({ onCloseSheet }: ProductCartProps) => {
  const { cart, increaseCount, decreaseCount, removeItem } = useProductCart();
  const [openCheckoutForm, setOpenCheckoutForm] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState<
    "inside" | "outside"
  >("inside");
  const totalPrice = calculateTotalPrice(cart);
  const shippingCharge = deliveryLocation === "inside" ? 100 : 150;
  const finalTotal = totalPrice + shippingCharge;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warning("Cart is empty!", {
        description: "Please add items to cart first.",
      });
      return;
    }
    setOpenCheckoutForm(true);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          <h2 className="text-xl font-bold">Shopping Cart</h2>
        </div>
        <span className="text-sm text-muted-foreground">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 py-12">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-medium text-muted-foreground">
            Your cart is empty
          </p>
          <Button variant="outline" onClick={onCloseSheet}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 px-1 my-4">
            <div className="space-y-4">
              <AnimatePresence>
                {cart.map(({ product, count }) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 relative items-start bg-white rounded-lg p-4 border shadow-sm"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm hover:bg-red-50 hover:text-red-600"
                      onClick={() => removeItem(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    <div className="flex-shrink-0 aspect-square h-20 w-20 overflow-hidden rounded-md border">
                      <Image
                        src={product.image1}
                        alt={product.title}
                        height={80}
                        width={80}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      <h3 className="font-medium line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Rs. {product.price}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => decreaseCount(product.id)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {count}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => increaseCount(product.id)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>

          <div className="border-t pt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rs. {totalPrice}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">
                  Delivery Location
                </span>
                <Select
                  value={deliveryLocation}
                  onValueChange={(value: "inside" | "outside") =>
                    setDeliveryLocation(value)
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inside">Inside Valley</SelectItem>
                    <SelectItem value="outside">Outside Valley</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-amber-600">Rs. {shippingCharge}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="text-lg">Rs. {finalTotal}</span>
              </div>
            </div>

            <Button
              className="w-full h-12 text-base bg-amber-600 hover:bg-amber-700"
              onClick={handleCheckout}
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      )}

      <CheckoutModal
        isOpen={openCheckoutForm}
        setIsOpen={setOpenCheckoutForm}
      />
    </div>
  );
};

export default ProductCart;
