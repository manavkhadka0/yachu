"use client";

import Image from "next/image";
import { Sparkles, Gift, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import useProductCart from "@/store/zustand";
import { useProducts } from "@/hooks/use-products";
import { newCart } from "@/services/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { CheckoutModal } from "@/components/popover/CheckoutModal";

type BundleTier = {
  qty: number;
  label: string;
  originalPrice: number;
  offerPrice: number;
  perPcs: number;
  discountPct: string;
  perks: string[];
  best?: boolean;
};

type ProductOffer = {
  slug: string;
  name: string;
  tiers: BundleTier[];
};

const OFFERS: ProductOffer[] = [
  {
    slug: "yachu-hair-oil",
    name: "Yachu Hair Oil",
    tiers: [
      {
        qty: 1,
        label: "1 bottle",
        originalPrice: 2500,
        offerPrice: 2250,
        perPcs: 2250,
        discountPct: "10% off",
        perks: ["1 Scratch Card"],
      },
      {
        qty: 2,
        label: "2 bottles",
        originalPrice: 5000,
        offerPrice: 4500,
        perPcs: 2250,
        discountPct: "10% off",
        perks: ["2 Scratch Cards"],
      },
      {
        qty: 3,
        label: "3 bottles",
        originalPrice: 7500,
        offerPrice: 6270,
        perPcs: 2090,
        discountPct: "~16% off",
        perks: ["3 Scratch Cards", "1 Free Yachu Facewash"],
        best: true,
      },
    ],
  },
  {
    slug: "yachu-shampoo-300-ml",
    name: "Yachu Shampoo",
    tiers: [
      {
        qty: 1,
        label: "1 bottle",
        originalPrice: 999,
        offerPrice: 899,
        perPcs: 899,
        discountPct: "10% off",
        perks: ["1 Scratch Card"],
      },
      {
        qty: 2,
        label: "2 bottles",
        originalPrice: 1998,
        offerPrice: 1798,
        perPcs: 899,
        discountPct: "10% off",
        perks: ["2 Scratch Cards"],
      },
      {
        qty: 3,
        label: "3 bottles",
        originalPrice: 2997,
        offerPrice: 2422,
        perPcs: 807,
        discountPct: "~19% off",
        perks: ["3 Scratch Cards"],
        best: true,
      },
    ],
  },
];

export default function DashainOfferSection() {
  const { data: products } = useProducts();
  const { cart, addToCart } = useProductCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Look up product images from API
  const getProductImage = (slug: string) =>
    products?.find((p) => p.slug === slug)?.image1 ?? null;

  const handleOrder = (slug: string, tier: BundleTier) => {
    const product = products?.find((p) => p.slug === slug);
    if (!product) {
      toast.error("Product not available. Please try again shortly.");
      return;
    }

    // Override price to the per-piece offer price so total_amount is discounted
    const discountedProduct = { ...product, price: tier.perPcs };
    let updatedCart = [...cart];
    for (let i = 0; i < tier.qty; i++) {
      updatedCart = newCart({ product: discountedProduct, count: 1 }, updatedCart);
    }
    addToCart(updatedCart);
    toast.success(`${tier.qty}× ${product.title} added at Dashain price!`, {
      description: `Rs. ${tier.offerPrice.toLocaleString()} total (${tier.discountPct})`,
    });
    setCheckoutOpen(true);
  };

  return (
    <>
      <section id="dashain-offers" className="w-full bg-[#fff6e5] border-y border-border py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                बडा दशैं विशेष अफर · Dashain 2081
              </span>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              Buy More, Save More This Dashain
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Every purchase includes a lucky draw scratch card — get a chance to win a brand-new scooter!
            </p>
          </div>

          {/* Product Blocks */}
          {OFFERS.map((offer) => (
            <div key={offer.slug} className="space-y-3">
              {/* Product heading */}
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-foreground shrink-0">{offer.name}</h3>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Tier cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {offer.tiers.map((tier) => {
                  const savings = tier.originalPrice - tier.offerPrice;
                  return (
                    <div
                      key={tier.qty}
                      className={`relative rounded-xl border bg-white flex flex-col gap-3 p-5 transition-shadow hover:shadow-md ${
                        tier.best
                          ? "border-primary ring-2 ring-primary/20 shadow-sm"
                          : "border-border"
                      }`}
                    >
                      {/* Best value badge */}
                      {tier.best && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                          <Badge className="bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                            Best Value
                          </Badge>
                        </div>
                      )}

                      {/* Product image */}
                      {(() => {
                        const img = getProductImage(offer.slug);
                        return img ? (
                          <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden bg-muted mb-1">
                            <Image
                              src={img}
                              alt={offer.name}
                              fill
                              sizes="220px"
                              className="object-contain p-3"
                            />
                            {/* Qty overlay */}
                            <span className="absolute bottom-1.5 right-1.5 text-[10px] font-bold bg-foreground/80 text-background rounded px-1.5 py-0.5">
                              ×{tier.qty}
                            </span>
                          </div>
                        ) : null;
                      })()}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm font-bold text-foreground">{tier.label}</span>
                        <span className="text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
                          {tier.discountPct}
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground line-through">
                          Rs. {tier.originalPrice.toLocaleString()}
                        </p>
                        <p className="text-2xl font-extrabold text-foreground tracking-tight">
                          Rs. {tier.offerPrice.toLocaleString()}
                        </p>
                        {tier.qty > 1 && (
                          <p className="text-xs text-muted-foreground">
                            Rs. {tier.perPcs.toLocaleString()} per piece
                          </p>
                        )}
                        <p className="text-xs font-semibold text-green-700">
                          You save Rs. {savings.toLocaleString()}
                        </p>
                      </div>

                      {/* Perks */}
                      <ul className="space-y-1">
                        {tier.perks.map((perk) => (
                          <li
                            key={perk}
                            className="flex items-center gap-1.5 text-[11px] font-medium text-foreground"
                          >
                            <Gift className="w-3 h-3 text-primary shrink-0" />
                            {perk}
                          </li>
                        ))}
                        <li className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                          <span className="text-[10px]">🎰</span>
                          Lucky draw entry included
                        </li>
                      </ul>

                      {/* Order CTA */}
                      <button
                        onClick={() => handleOrder(offer.slug, tier)}
                        className={`mt-auto w-full flex items-center justify-center gap-2 rounded-full py-2 text-xs font-bold transition-all duration-200 ${
                          tier.best
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                            : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30"
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Order {tier.label} — Rs. {tier.offerPrice.toLocaleString()}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Footer */}
          <p className="text-center text-[11px] text-muted-foreground">
            * Festive offer valid during Dashain 2081 season. Discounted prices applied automatically at checkout. All Nepal delivery available.
          </p>
        </div>
      </section>

      <CheckoutModal isOpen={checkoutOpen} setIsOpen={setCheckoutOpen} />
    </>
  );
}
