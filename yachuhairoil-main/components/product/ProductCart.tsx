"use client";

import { calculateTotalPrice } from "@/lib/utils";
import { useCartStore } from "@/hooks/useCartStore";
import { Button } from "../ui/button";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { CheckoutModal } from "../popover/CheckoutModal";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";

const ProductCart = ({ onCloseSheet }) => {
  const { cart, increaseCount, decreaseCount, removeItem } = useCartStore();
  const [openCheckoutForm, setOpenCheckoutForm] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("inside");
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
    <div className="flex flex-col h-full bg-background text-foreground overflow-hidden">
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
          {/* Scrollable items */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4">
            <AnimatePresence>
              {cart.map(({ product, count }) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="relative flex items-center gap-4 bg-card p-4 rounded-2xl border border-border">
                    <button
                      className="absolute top-3 right-3 p-1 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      onClick={() => removeItem(product.id)}
                    >
                      <X className="h-3 w-3" />
                    </button>

                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream border border-border flex-shrink-0">
                      <img
                        src={product.image1}
                        alt={product.title}
                        width="80"
                        height="80"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <h3 className="font-bold text-forest text-sm mb-0.5 truncate pr-4">
                          {product.title}
                        </h3>
                        <p className="text-foreground/60 text-[11px]">
                          Rs. {product.price}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden bg-muted">
                          <button
                            className="p-1 px-3 hover:bg-background"
                            onClick={() => decreaseCount(product.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">
                            {count}
                          </span>
                          <button
                            className="p-1 px-3 hover:bg-background"
                            onClick={() => increaseCount(product.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-bold text-forest text-sm">
                          Rs. {product.price * count}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Sticky footer */}
          <div className="shrink-0 px-6 pt-4 pb-8 border-t border-border space-y-3 bg-background">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/50">Subtotal</span>
              <span className="font-medium text-foreground">
                Rs. {totalPrice}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-foreground/50">Delivery</span>
              <Select
                value={deliveryLocation}
                onValueChange={setDeliveryLocation}
              >
                <SelectTrigger className="w-[140px] h-9 text-sm text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inside">Inside Valley</SelectItem>
                  <SelectItem value="outside">Outside Valley</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-foreground/50">Shipping</span>
              <span className="font-medium text-foreground">
                Rs. {shippingCharge}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                Total
              </p>
              <p className="font-bold text-forest text-lg">Rs. {finalTotal}</p>
            </div>

            <Button
              className="w-full h-14 rounded-2xl bg-forest hover:bg-forest/90 text-cream font-bold text-lg shadow-lg"
              onClick={handleCheckout}
            >
              Proceed to Checkout
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      )}

      <CheckoutModal
        isOpen={openCheckoutForm}
        setIsOpen={setOpenCheckoutForm}
        onCloseSheet={onCloseSheet}
      />
    </div>
  );
};

export default ProductCart;
