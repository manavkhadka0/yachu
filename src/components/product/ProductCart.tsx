"use client";

import { calculateTotalPrice } from "@/services/lib/utils";
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
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import Link from "next/link";

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
    <div className="flex flex-col h-full max-h-screen bg-background">
      {/* Header with Badge */}
      <div className="flex items-center justify-between p-4 py-8 bg-card border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-5 w-5 text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Shopping Cart
          </h2>
        </div>
        <Badge
          variant="secondary"
          className="text-secondary-foreground font-medium"
        >
          {cart.length} item{cart.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 py-12 px-4">
          <div className="rounded-full bg-muted p-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              Your cart is empty
            </h3>
            <p className="text-sm text-muted-foreground">
              Add some items to get started
            </p>
          </div>
          <Button variant="outline" onClick={onCloseSheet} className="mt-4">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Scrollable Items Area - Fixed height with proper scrolling */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                <AnimatePresence>
                  {cart.map(({ product, count }) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="relative bg-card border-border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-card hover:bg-destructive hover:text-destructive-foreground border border-border z-10"
                          onClick={() => removeItem(product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>

                        <CardContent className="flex gap-4 p-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0 h-20 w-20 overflow-hidden rounded-lg border border-border">
                            <img
                              src={product.image1}
                              alt={product.title}
                              width="80"
                              height="80"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex flex-1 flex-col justify-between min-w-0">
                            <div>
                              <h3 className="font-medium text-foreground text-base mb-1 truncate">
                                {product.title}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                Rs. {product.price}
                              </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-xl flex-shrink-0"
                                onClick={() => decreaseCount(product.id)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium text-foreground flex-shrink-0">
                                {count}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-xl flex-shrink-0"
                                onClick={() => increaseCount(product.id)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </div>

          {/* Summary Section - Fixed at bottom */}
          <div className="flex-shrink-0 border-t border-border">
            <Card className="rounded-none bg-card border-0">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-3">
                  {/* Subtotal Row */}
                  <div className="flex justify-between text-sm">
                    <Label className="text-muted-foreground font-normal">
                      Subtotal
                    </Label>
                    <span className="font-medium text-foreground">
                      Rs. {totalPrice}
                    </span>
                  </div>

                  {/* Delivery Location Row */}
                  <div className="flex justify-between items-center">
                    <Label className="text-muted-foreground font-normal text-sm">
                      Delivery Location
                    </Label>
                    <Select
                      value={deliveryLocation}
                      onValueChange={(value: "inside" | "outside") =>
                        setDeliveryLocation(value)
                      }
                    >
                      <SelectTrigger className="w-[140px] h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inside" className="text-sm">
                          Inside Valley
                        </SelectItem>
                        <SelectItem value="outside" className="text-sm">
                          Outside Valley
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Shipping Row */}
                  <div className="flex justify-between text-sm">
                    <Label className="text-muted-foreground font-normal">
                      Shipping
                    </Label>
                    <Badge
                      variant="secondary"
                      className="text-secondary-foreground"
                    >
                      Rs. {shippingCharge}
                    </Badge>
                  </div>

                  <Separator className="my-3" />

                  {/* Total Row */}
                  <div className="flex justify-between items-center">
                    <Label className="font-medium text-foreground">Total</Label>
                    <Badge variant="default" className="text-base px-3 py-1">
                      Rs. {finalTotal}
                    </Badge>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  className="w-full h-12 text-base font-medium"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
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
