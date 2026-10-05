"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { Plus, Minus, ShoppingCart, ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import ProductCart from "./ProductCart";
import { useCartAnimation } from "@/hooks/useCartAnimation";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export default function ProductActions({ product }) {
  const { cart, addToCart, increaseCount, decreaseCount, removeItem } =
    useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const isMobile = useIsMobile();
  const { triggerFlyToCart } = useCartAnimation();

  useEffect(() => {
    if (!product) return;
    const cartItem = cart.find(
      (item) => String(item.product.id) === String(product.id),
    );
    setIsInCart(!!cartItem);
    setQuantity(cartItem ? cartItem.count : 1);
  }, [cart, product]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!product) return;
    addToCart(product);
    triggerFlyToCart(e.currentTarget);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
    toast.success("Added to cart", {
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    if (!isInCart) addToCart(product);
    setIsCartOpen(true);
  };

  const handleIncrease = () => {
    if (!product) return;
    isInCart ? increaseCount(product.id) : setQuantity((p) => p + 1);
  };

  const handleDecrease = () => {
    if (!product) return;
    if (isInCart) {
      if (quantity > 1) {
        decreaseCount(product.id);
      } else {
        removeItem(product.id);
        toast.info("Removed from cart", {
          description: `${product.title} removed.`,
        });
      }
    } else if (quantity > 1) {
      setQuantity((p) => p - 1);
    }
  };

  return (
    <>
      <style>{`
        @keyframes label-in {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes btn-pop {
          0%   { transform: scale(1); }
          35%  { transform: scale(0.94); }
          65%  { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div className="w-full space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {isInCart && (
            <div className="flex items-center justify-between w-full sm:w-auto min-w-[140px] h-14 border border-border rounded-xl bg-muted px-4">
              <button
                onClick={handleDecrease}
                className="p-1 rounded-md hover:bg-background/80 transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold text-lg min-w-[24px] text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="p-1 rounded-md hover:bg-background/80 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex-1 w-full flex flex-col sm:flex-row gap-4">
            {!isInCart ? (
              <button
                onClick={handleAddToCart}
                disabled={justAdded}
                style={{
                  animation: justAdded ? "btn-pop 0.32s ease forwards" : "none",
                  transition: "background-color 0.22s ease",
                }}
                className={`flex-1 h-14 rounded-xl font-bold tracking-widest text-sm uppercase cursor-pointer shadow-sm relative overflow-hidden flex items-center justify-center gap-2
                  ${justAdded ? "bg-[oklch(0.35_0.08_145)] text-cream" : "bg-forest hover:bg-forest/90 text-cream"}`}
              >
                {justAdded ? (
                  <span
                    className="flex items-center gap-2"
                    style={{ animation: "label-in 0.18s ease 0.08s both" }}
                  >
                    <Check className="w-5 h-5" /> Added!
                  </span>
                ) : (
                  <span className="flex items-center gap-2 py-4">
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </span>
                )}
              </button>
            ) : (
              <div className="flex-1 py-4 text-sm text-forest font-medium flex items-center gap-2 justify-center sm:justify-start">
                Item in cart
              </div>
            )}

            <button
              onClick={handleBuyNow}
              className="flex-1 py-4 h-14 rounded-xl bg-yellow-cta hover:brightness-95 text-[oklch(0.2_0.04_55)] font-bold tracking-widest text-sm uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-5 h-5" /> Buy It Now
            </button>
          </div>
        </div>

        {isMobile ? (
          <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
            <DrawerContent className="focus:outline-none !max-h-[95dvh] flex flex-col">
              <ProductCart onCloseSheet={() => setIsCartOpen(false)} />
            </DrawerContent>
          </Drawer>
        ) : (
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-[300px] sm:w-[540px] p-0">
              <SheetTitle className="sr-only">Shopping Cart</SheetTitle>
              <ProductCart onCloseSheet={() => setIsCartOpen(false)} />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </>
  );
}
