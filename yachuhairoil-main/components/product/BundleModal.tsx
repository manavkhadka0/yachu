"use client";

import React, { useState, useEffect } from "react";
import { X, ShoppingBag, Check, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/image";
import { useCartStore } from "@/hooks/useCartStore";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";

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

interface BundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: TProduct[];
  bundleType?: "ritual" | "threeOils";
  onCheckout?: () => void;
}

export function BundleModal({ isOpen, onClose, products, bundleType = "ritual", onCheckout }: BundleModalProps) {
  const isMobile = useIsMobile();
  const { addToCart } = useCartStore();

  // Filter products: oils vs shampoo
  const oils = products.filter(
    (p) =>
      p.title.toLowerCase().includes("oil") ||
      !p.title.toLowerCase().includes("shampoo"),
  );
  const shampoos = products.filter((p) =>
    p.title.toLowerCase().includes("shampoo"),
  );

  const defaultShampoo = shampoos[0] || null;

  // Selected oil state
  const [selectedOilId, setSelectedOilId] = useState<string | null>(null);

  // Set default selected oil once products are available
  useEffect(() => {
    if (oils.length > 0 && !selectedOilId) {
      setSelectedOilId(oils[0].id);
    }
  }, [oils, selectedOilId]);

  const selectedOil = oils.find((o) => o.id === selectedOilId) || null;

  // Calculate pricing details
  let oilPrice = 0;
  let oilMrp = 0;
  let shampooPrice = 0;
  let shampooMrp = 0;
  let totalMrp = 0;
  let totalSellingPrice = 0;
  let savings = 0;
  let savePercentage = 0;

  if (selectedOil) {
    oilPrice = parseFloat(selectedOil.price as any) || 0;
    oilMrp = oilPrice + 200;
  }

  if (defaultShampoo) {
    shampooPrice = parseFloat(defaultShampoo.price as any) || 0;
    shampooMrp = shampooPrice + 200;
  }

  if (bundleType === "threeOils" && selectedOil) {
    totalMrp = oilPrice * 3;
    totalSellingPrice = Math.round(totalMrp * 0.9); // 10% OFF
    savings = totalMrp - totalSellingPrice;
    savePercentage = 10;
  } else if (selectedOil && defaultShampoo) {
    // ritual bundle
    totalMrp = oilPrice + shampooPrice;
    totalSellingPrice = Math.round(totalMrp * 0.9); // 10% OFF
    savings = totalMrp - totalSellingPrice;
    savePercentage = 10;
  }

  const handleAddBundle = () => {
    if (bundleType === "ritual" && (!selectedOil || !defaultShampoo)) {
      toast.error("Please ensure the oil and shampoo are available.");
      return;
    }
    if (bundleType === "threeOils" && !selectedOil) {
      toast.error("Please select a hair oil.");
      return;
    }

    if (bundleType === "threeOils" && selectedOil) {
      addToCart([{ product: selectedOil, count: 3 }]);
    } else if (selectedOil && defaultShampoo) {
      addToCart([
        { product: selectedOil, count: 1 },
        { product: defaultShampoo, count: 1 },
      ]);
    }

    onClose();
    if (onCheckout) {
      onCheckout();
    }
  };

  const renderContent = () => {
    return (
      <div className="flex flex-col bg-background text-foreground overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-border bg-card">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold/20 text-bark text-[10px] font-semibold uppercase tracking-wider mb-1">
              {bundleType === "threeOils" ? "Buy 3 & Save" : "Ritual Bundle Deal"}
            </span>
            <h2 className="text-xl md:text-2xl font-display text-forest leading-tight">
              {bundleType === "threeOils" ? "Stock Up" : "Pair & Save"}
            </h2>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="p-5 space-y-5 max-h-[55vh] overflow-y-auto">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-widest text-foreground/50 block mb-2">
              1. Select Hair Oil
            </label>
            <div className="grid gap-3">
              {oils.map((oil) => {
                const isSelected = oil.id === selectedOilId;
                return (
                  <button
                    key={oil.id}
                    onClick={() => setSelectedOilId(oil.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-forest bg-forest/5"
                        : "border-border bg-card hover:border-foreground/20"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-cream border border-border flex-shrink-0">
                      <img
                        src={getImageUrl(oil.image1)}
                        alt={oil.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-forest text-sm truncate">
                        {oil.title}
                      </p>
                      <p className="text-[11px] text-foreground/60">
                        Rs. {oil.price}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-forest bg-forest text-cream"
                          : "border-border"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Shampoo Description (automatic include) */}
          {bundleType === "ritual" && defaultShampoo && (
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-foreground/50 block mb-2">
                2. Included Shampoo
              </label>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/40">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-cream border border-border flex-shrink-0">
                  <img
                    src={getImageUrl(defaultShampoo.image1)}
                    alt={defaultShampoo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-forest text-sm truncate">
                    {defaultShampoo.title}
                  </p>
                  <p className="text-[11px] text-foreground/60">
                    Specifically crafted to rinse clean and complete your
                    ritual.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-forest bg-forest/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Included
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        <div className="px-5 py-4 border-t border-border bg-card space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[11px] text-foreground/50 line-through">
                Regular Price: Rs. {totalMrp}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-2xl font-bold text-forest">
                  Rs. {totalSellingPrice}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[oklch(0.92_0.06_145)] text-forest text-[11px] font-bold">
                  {savePercentage}% OFF
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                Save Rs. {savings}
              </span>
            </div>
          </div>

          <Button
            onClick={handleAddBundle}
            className="w-full h-12 rounded-xl bg-forest hover:bg-forest/90 text-cream font-bold text-base shadow-lg flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Checkout Now
          </Button>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="focus:outline-none max-h-[85vh]">
          <DrawerTitle className="sr-only">Choose Bundle</DrawerTitle>
          <DrawerDescription className="sr-only">Choose bundle options</DrawerDescription>
          {renderContent()}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden focus:outline-none">
        <DialogTitle className="sr-only">Choose Bundle</DialogTitle>
        <DialogDescription className="sr-only">Choose bundle options</DialogDescription>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
