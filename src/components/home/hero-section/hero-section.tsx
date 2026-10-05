"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Banknote, ChevronRight, MessageCircle, Truck } from "lucide-react";
import {
  OIL_TIERS,
  whatsappOrderUrl,
  type OfferTier,
} from "@/constants/offers";
import PackPicker from "@/components/home/PackPicker";
import TikaJamara from "@/components/shared/TikaJamara";
import posthog from "posthog-js";

interface HeroSectionProps {
  onOrder: (source: string, tier?: OfferTier) => void;
}

const HeroSection = ({ onOrder }: HeroSectionProps) => {
  const [selected, setSelected] = useState(0);
  const tier = OIL_TIERS[selected];

  const handleCtaClick = (cta: string, destination: string) => {
    posthog.capture("cta_hero_clicked", {
      cta_text: cta,
      destination,
    });
  };

  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* organic blob accents */}
      <div className="absolute -left-24 top-20 h-96 w-96 rounded-full bg-sage/20 blur-3xl" />
      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-sage/10 opacity-60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-14 pt-10 md:pb-20 md:pt-14 lg:grid-cols-2">
        {/* Left content */}
        <div className="relative z-10">
          <p className="flex animate-fade-up items-end gap-2 font-script text-2xl text-gold md:text-3xl">
            <TikaJamara className="h-12 w-10 shrink-0" />
            Dashain Dhamaka offer
          </p>
          <h1
            className="mt-1 animate-fade-up text-5xl font-bold leading-[1.05] text-forest md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            Yachu Hair Oil
          </h1>
          <p
            className="mt-5 max-w-md animate-fade-up text-lg font-medium text-forest md:text-xl"
            style={{ animationDelay: "0.2s" }}
          >
            For dandruff, hair fall and baldness. Crafted in Nepal with 33
            natural ingredients.
          </p>

          {/* Dashain offer picker */}
          <div
            className="mt-7 max-w-lg animate-fade-up rounded-3xl border border-border bg-card p-4 shadow-[0_25px_60px_-30px_oklch(0.32_0.07_150/0.45)] sm:p-5"
            style={{ animationDelay: "0.3s" }}
          >
            <PackPicker
              tiers={OIL_TIERS}
              selected={selected}
              onSelect={setSelected}
              label="Dashain pack"
            />

            <button
              type="button"
              onClick={() => {
                handleCtaClick("Order Now", "checkout");
                onOrder("hero", tier);
              }}
              className="group mt-4 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-forest text-base font-medium tracking-wide text-cream shadow-[0_15px_40px_-15px_oklch(0.32_0.07_150/0.6)] transition-all hover:bg-forest/90 md:text-lg"
            >
              Order Now · Rs. {tier.price.toLocaleString()}
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs font-medium text-foreground/70 sm:text-sm">
              <li className="flex items-center gap-1.5">
                <Banknote className="h-4 w-4 text-gold" />
                Cash on Delivery
              </li>
              <li className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-gold" />
                Delivery all over Nepal
              </li>
            </ul>
          </div>

          <div
            className="mt-6 flex animate-fade-up flex-wrap items-center gap-x-8 gap-y-3"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-3xl font-extrabold text-forest md:text-4xl">
              50K+{" "}
              <span className="text-sm font-semibold md:text-base">
                Customers Trust Yachu
              </span>
            </p>
            <Link
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCtaClick("Order on WhatsApp", "whatsapp")}
              className="flex items-center gap-2 text-sm font-semibold text-forest underline-offset-4 hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              Order on WhatsApp
            </Link>
          </div>
        </div>

        {/* Right image */}
        <div
          className="relative animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative mx-auto max-w-sm lg:max-w-xl">
            <TikaJamara className="absolute -top-8 right-2 z-10 h-28 w-24 rotate-12 animate-leaf-sway drop-shadow-lg md:h-36 md:w-28" />
            <Image
              src="/hero.png"
              alt="Yachu Hair Oil"
              width={695}
              height={687}
              priority
              sizes="(max-width: 1024px) 90vw, 576px"
              className="h-auto w-full rounded-[2rem] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
