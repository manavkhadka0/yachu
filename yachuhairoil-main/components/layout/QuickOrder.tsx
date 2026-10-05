"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/image";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { CheckoutModal } from "@/components/popover/CheckoutModal";
import { productsApi } from "@/services";
import type { TProduct } from "@/types";

export function QuickOrder({
  products: initialProducts,
  isMobileBar = false,
}: {
  products?: TProduct[];
  isMobileBar?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openCheckoutForm, setOpenCheckoutForm] = useState(false);
  const [products, setProducts] = useState<TProduct[]>(initialProducts || []);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
    } else {
      productsApi.getProducts().then((res) => {
        if (res) setProducts(res);
      });
    }
  }, [initialProducts]);

  useEffect(() => {
    if (products?.length > 0) {
      const initial: Record<string, number> = {};
      products.forEach((p) => (initial[p.id] = quantities[p.id] ?? 0));
      setQuantities(initial);
    }
  }, [products]);

  const setQty = (id: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, value) }));
  };

  const selectedItems = products?.filter((p) => quantities[p.id] > 0) ?? [];

  const total = selectedItems.reduce(
    (sum, p) => sum + p.price * quantities[p.id],
    0,
  );

  const handleCheckout = () => {
    // Build cart items array in the format useCartStore expects
    const cartItems = selectedItems.map((p) => ({
      product: p,
      count: quantities[p.id],
    }));
    // Set cart directly using the array form of addToCart
    addToCart(cartItems);
    // Close the drawer and open checkout
    setIsOpen(false);
    setOpenCheckoutForm(true);
  };

  const handleCheckoutClose = () => {
    setOpenCheckoutForm(false);
    // Reset quantities after checkout flow completes
    const reset: Record<string, number> = {};
    products.forEach((p) => (reset[p.id] = 0));
    setQuantities(reset);
  };

  return (
    <>
      {isMobileBar ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full h-14 rounded-full bg-forest text-cream font-bold shadow-2xl flex items-center justify-center gap-3 text-base cursor-pointer"
        >
          <ShoppingCart className="w-5 h-5" /> Order Now
        </button>
      ) : (
        <div className="fixed bottom-4 left-6 right-20 z-40 md:hidden h-14">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full h-full rounded-full bg-forest text-cream font-bold shadow-2xl flex items-center justify-center gap-3 text-base cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" /> Order Now
          </button>
        </div>
      )}

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent
          className="md:hidden focus:outline-none flex flex-col"
          style={{ maxHeight: "95dvh" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 pt-6 pb-4 shrink-0">
            <h2 className="text-2xl font-display text-forest">Quick Order</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 bg-muted rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 px-6 space-y-6 pb-4">
            {/* Product selector grid */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 block mb-3">
                Select Products
              </label>
              <div className="grid grid-cols-2 gap-3">
                {products?.map((p) => {
                  const qty = quantities[p.id] ?? 0;
                  const isSelected = qty > 0;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setQty(p.id, isSelected ? 0 : 1)}
                      className={`p-3 rounded-2xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-forest bg-forest/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <p className="font-bold text-forest text-xs line-clamp-1">
                        {p.title}
                      </p>
                      <p className="text-[10px] text-foreground/60">
                        Rs. {p.price}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected items detail */}
            {selectedItems.length > 0 && (
              <div className="space-y-3">
                {selectedItems.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 bg-card p-4 rounded-2xl border border-border"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream border border-border shrink-0">
                      <img
                        src={getImageUrl(p.image1)}
                        className="w-full h-full object-cover"
                        alt={p.title}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-forest text-sm truncate">
                        {p.title}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden bg-muted">
                          <button
                            onClick={() => setQty(p.id, quantities[p.id] - 1)}
                            className="p-1 px-3 hover:bg-background"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">
                            {quantities[p.id]}
                          </span>
                          <button
                            onClick={() => setQty(p.id, quantities[p.id] + 1)}
                            className="p-1 px-3 hover:bg-background"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-bold text-forest">
                          Rs. {p.price * quantities[p.id]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="flex justify-between items-center px-1 py-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                    Total
                  </p>
                  <p className="font-bold text-forest text-lg">Rs. {total}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sticky footer button */}
          <div className="shrink-0 px-6 py-4 border-t border-border bg-background">
            <Button
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              className="w-full h-14 rounded-2xl bg-forest hover:bg-forest/90 text-cream font-bold text-lg shadow-lg disabled:opacity-40"
            >
              {selectedItems.length === 0 ? "Select a product" : `Checkout`}
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Checkout modal — rendered outside the drawer */}
      <CheckoutModal
        isOpen={openCheckoutForm}
        setIsOpen={setOpenCheckoutForm}
        onCloseSheet={handleCheckoutClose}
      />
    </>
  );
}
