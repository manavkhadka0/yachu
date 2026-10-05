"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { DASHAIN_PACKS, type OfferTier } from "@/constants/offers";
import { useProducts } from "@/hooks/use-products";
import PackPicker from "@/components/home/PackPicker";
import TikaJamara from "@/components/shared/TikaJamara";
import { cn } from "@/lib/utils";

interface DashainDhamakaProps {
  onOrder: (source: string, tier?: OfferTier, slug?: string) => void;
}

const Leaf = ({ className }: { className: string }) => (
  <div className={cn("absolute opacity-15", className)} aria-hidden="true">
    <svg viewBox="0 0 100 100">
      <path
        d="M50 10 C 25 30, 20 60, 50 90 C 80 60, 75 30, 50 10 Z"
        fill="oklch(0.85 0.04 145)"
      />
    </svg>
  </div>
);

const DashainDhamaka = ({ onOrder }: DashainDhamakaProps) => {
  const { data: products } = useProducts();
  const [productIndex, setProductIndex] = useState(0);
  const [tierIndex, setTierIndex] = useState(0);

  const pack = DASHAIN_PACKS[productIndex];
  const tier = pack.tiers[tierIndex];

  return (
    <section
      id="dashain-offers"
      className="relative overflow-hidden bg-gradient-to-br from-forest to-[oklch(0.22_0.06_150)] py-20 md:py-28"
    >
      <Leaf className="left-10 top-10 h-32 w-32 animate-leaf-sway" />
      <Leaf className="bottom-10 right-10 h-40 w-40 animate-float" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Offer story */}
        <div>
          <p className="mb-2 flex items-end gap-2 font-script text-3xl text-gold">
            <TikaJamara className="h-12 w-10 shrink-0" />
            Dashain Dhamaka
          </p>
          <h2 className="text-balance text-4xl text-cream md:text-6xl">
            Get a chance to win an Electric Scooter
          </h2>
          <p className="mt-4 max-w-xl text-cream/75">
            Every Yachu bottle comes with a Scratch &amp; Win card.
          </p>

          <button
            type="button"
            onClick={() => onOrder("dashain_dhamaka_image", tier, pack.slug)}
            aria-label="Order now and get a Scratch & Win card"
            className="group mt-8 block w-full cursor-pointer overflow-hidden rounded-3xl border-2 border-gold/30 shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Image
              src="/dashain.png"
              alt="Yachu Dashain Dhamaka: Scratch and Win, bumper prize scooter"
              width={1050}
              height={600}
              sizes="(max-width: 1024px) 100vw, 640px"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </button>
        </div>

        {/* Pack picker */}
        <div className="rounded-3xl bg-cream p-5 shadow-2xl sm:p-7">
          <h3 className="text-2xl text-forest md:text-3xl">Choose your pack</h3>

          <div
            role="tablist"
            aria-label="Product"
            className="mt-4 grid grid-cols-2 gap-1 rounded-full bg-forest/10 p-1"
          >
            {DASHAIN_PACKS.map((item, index) => {
              const active = index === productIndex;
              const image = products?.find((p) => p.slug === item.slug)?.image1;
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setProductIndex(index);
                    setTierIndex(0);
                  }}
                  className={cn(
                    "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all",
                    active
                      ? "bg-forest text-cream shadow"
                      : "text-forest hover:bg-forest/10"
                  )}
                >
                  {image && (
                    <span className="relative h-7 w-7 overflow-hidden rounded-full bg-white">
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="28px"
                        className="object-contain"
                      />
                    </span>
                  )}
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <PackPicker
              tiers={pack.tiers}
              selected={tierIndex}
              onSelect={setTierIndex}
              label={`${pack.name} pack`}
            />
          </div>

          <button
            type="button"
            onClick={() => onOrder("dashain_dhamaka", tier, pack.slug)}
            className="group mt-5 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-yellow-cta text-base font-bold tracking-wide text-[oklch(0.2_0.04_55)] transition-all hover:brightness-95 md:text-lg"
          >
            Order Now · Rs. {tier.price.toLocaleString()}
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="mt-3 text-center text-xs text-foreground/60">
            Cash on Delivery · Offer valid until Kartik 30 · Conditions apply
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashainDhamaka;
