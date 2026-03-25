"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import posthog from "posthog-js";

const HeroSection = () => {
  const handleCtaClick = (cta: string, destination: string) => {
    posthog.capture("cta_hero_clicked", {
      cta_text: cta,
      destination,
    });
  };

  return (
    <div className="container mx-auto px-6 pt-0 md:pt-2 lg:px-12 xl:px-30 lg:pb-20 flex flex-col md:flex-row justify-between items-center">

      {/* Left Content */}
      <div className="flex flex-col flex-1 justify-center w-full">

        {/* Title */}
        <h1 className="block xl:hidden text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
          <span className="text-primary">Yachu</span> <br />
          Hair Oil
        </h1>

        <h1 className="hidden xl:block text-5xl lg:text-7xl font-bold text-foreground">
          <span className="text-primary">Yachu</span> Hair Oil
        </h1>

        {/* Description */}
        <Card className="my-4 border-none shadow-none bg-transparent">
          <CardContent className="space-y-2 p-0 text-sm md:text-base lg:text-lg xl:text-2xl text-foreground font-semibold">
            <p>❌ Dandruff, Hair Loss, Baldness?</p>
            <p>🟢 Ultimate Solution = Yachu Hair Oil</p>
            <p>🍃 Crafted with a mix of 33 natural Ingredients</p>
            <p>✅ Easy, Affordable and Safe</p>
          </CardContent>
        </Card>

        {/* Problem Icons (Mobile Only) */}
        <div className="md:hidden flex gap-2 items-center mb-4">
          {[
            { label: "Dandruff?", src: "/dandruff.png" },
            { label: "Hairfall?", src: "/hairfall.webp" },
            { label: "Baldness?", src: "/baldness.png" },
          ].map((item, index) => (
            <div key={item.label} className="flex items-center gap-1">
              <Card className="flex flex-col items-center p-2 border bg-muted">
                <Image
                  src={item.src}
                  alt={item.label}
                  height={200}
                  width={200}
                  priority
                  className="h-8 w-8 rounded-full object-cover"
                />
                <p className="text-xs font-semibold mt-1 text-foreground text-center">
                  {item.label}
                </p>
              </Card>
              {index < 2 && (
                <ChevronRight className="text-primary h-4 w-4" />
              )}
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <Card className="flex flex-col gap-1 border-none shadow-none bg-transparent mb-4">
          <p className="text-3xl md:text-4xl lg:text-6xl font-extrabold w-fit">
            50K +
          </p>
          <p className="font-semibold text-muted-foreground text-sm md:text-base xl:text-xl">
            Hair Problems Solved
          </p>
        </Card>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

          {/* Primary Button */}
          <Button
            asChild
            size="lg"
            className="
              group relative overflow-hidden
              w-full sm:w-auto
              px-4 py-4 sm:px-6 sm:py-6
              rounded-full
              shadow-lg hover:shadow-primary/50
              transition-all duration-300
              border-2
            "
          >
            <Link
              href="/products"
              onClick={() =>
                handleCtaClick("Order Yachu Hair Oil Now", "/products")
              }
              className="flex items-center justify-center gap-2 text-center"
            >
              <span className="text-sm sm:text-base md:text-lg font-semibold whitespace-normal break-words">
                <span className="sm:hidden">                  Order Yachu Hair Oil Now
                </span>
                <span className="hidden sm:inline">
                  Order Yachu Hair Oil Now
                </span>
              </span>

              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          {/* Secondary Button */}
          <Button
            variant="outline"
            asChild
            className="
              w-full sm:w-auto
              px-4 py-4 sm:px-6 sm:py-6
              rounded-full
              border-2
              transition-all duration-300
            "
          >
            <Link
              href="/how-to-use"
              onClick={() =>
                handleCtaClick("How to Use", "/how-to-use")
              }
              className="flex items-center justify-center"
            >
              How to Use Yachu Hair Oil
            </Link>
          </Button>

        </div>
      </div>

      {/* Right Image (Hidden on Mobile) */}
      <div className="w-auto pt-9 hidden md:flex justify-end">
        <img
          src="/hero.png"
          alt="Hero Image"
          height={550}
          width={550}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default HeroSection;