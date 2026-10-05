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
      <section id="dashain-offers" className="w-full bg-neutral-50 border-y border-border py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12 xl:px-24 space-y-6">

          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                बडा दशैं विशेष अफर · Dashain 2083
              </span>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Buy More, Save More This Dashain
            </h2>
            <p className="text-base text-muted-foreground max-w-xl md:text-lg">
              Every purchase includes a lucky draw scratch card — get a chance to win a brand-new scooter!
            </p>
          </div>

          {/* Product Blocks */}
          {OFFERS.map((offer) => {
            const img = getProductImage(offer.slug);
            return (
              <div
                key={offer.slug}
                className="rounded-3xl border bg-white p-4 shadow-sm sm:p-6"
              >
                {/* Product heading */}
                <div className="mb-4 flex items-center gap-3">
                  {img && (
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border bg-white">
                      <Image
                        src={img}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold leading-tight text-foreground sm:text-xl">
                      {offer.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pick a pack. The more you buy, the more you save.
                    </p>
                  </div>
                </div>

                {/* Tier cards: rows on mobile, columns from sm up */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                  {offer.tiers.map((tier) => {
                    const savings = tier.originalPrice - tier.offerPrice;
                    return (
                      <div
                        key={tier.qty}
                        className={`relative flex items-center gap-3 rounded-2xl border-2 p-4 transition-shadow hover:shadow-md sm:flex-col sm:items-stretch sm:p-5 ${
                          tier.best
                            ? "border-primary bg-primary/5"
                            : "border-border bg-white"
                        }`}
                      >
                        {tier.best && (
                          <Badge className="absolute -top-2.5 left-4 rounded-full bg-foreground px-2.5 py-0.5 text-[10px] font-bold text-background sm:left-1/2 sm:-translate-x-1/2">
                            Best Value
                          </Badge>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-bold text-foreground">
                              {tier.label}
                            </span>
                            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
                              {tier.discountPct}
                            </span>
                          </div>

                          <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                            <span className="text-2xl font-extrabold tracking-tight text-foreground">
                              Rs. {tier.offerPrice.toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              Rs. {tier.originalPrice.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-accent-foreground">
                            You save Rs. {savings.toLocaleString()}
                            {tier.qty > 1 &&
                              ` · Rs. ${tier.perPcs.toLocaleString()} each`}
                          </p>

                          <ul className="mt-2 space-y-1">
                            {tier.perks.map((perk) => (
                              <li
                                key={perk}
                                className="flex items-center gap-1.5 text-xs font-medium text-foreground"
                              >
                                <Gift className="h-3.5 w-3.5 shrink-0 text-primary" />
                                {perk}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => handleOrder(offer.slug, tier)}
                          aria-label={`Order ${tier.label} of ${offer.name} for Rs. ${tier.offerPrice.toLocaleString()}`}
                          className={`flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition-all duration-200 sm:mt-auto sm:w-full ${
                            tier.best
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 hover:bg-primary/90"
                              : "border-2 border-primary/40 bg-white text-primary hover:bg-primary/10"
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Order
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Footer */}
          <p className="text-xs text-muted-foreground">
            * Festive offer valid during Dashain 2083 season. Discounted prices applied automatically at checkout. All Nepal delivery available.
          </p>
        </div>
      </section>

      <CheckoutModal isOpen={checkoutOpen} setIsOpen={setCheckoutOpen} />
    </>
  );
}
