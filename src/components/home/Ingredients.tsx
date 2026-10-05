"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { INGREDIENTS } from "@/constants/ingredients";
import SectionHeading from "./SectionHeading";

type Ingredient = (typeof INGREDIENTS)[number];

function IngredientChip({
  ing,
  size = "md",
  containerSize = 640,
}: {
  ing: Ingredient;
  size?: "sm" | "md";
  containerSize?: number;
}) {
  const chipSize = size === "sm" ? containerSize * 0.086 : containerSize * 0.1;

  return (
    <div
      title={`${ing.en} (${ing.np})`}
      className="flex items-center justify-center overflow-hidden rounded-full border-2 border-slate-100 bg-white shadow-sm transition-all duration-300 hover:scale-110 hover:border-gold hover:shadow-xl"
      style={{ width: chipSize, height: chipSize }}
    >
      <Image
        src={ing.emoji}
        alt={ing.en}
        width={96}
        height={96}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

const Ingredients = () => {
  const inner = INGREDIENTS.slice(0, 12);
  const outer = INGREDIENTS.slice(12);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(640);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize(entry.contentRect.width);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const outerRadius = size * 0.469; // ~300px at 640
  const innerRadius = size * 0.281; // ~180px at 640

  return (
    <section
      id="ingredients"
      className="relative overflow-hidden bg-card py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Born of the earth" title="33 herbs from Nepal" />

        <div
          ref={containerRef}
          className="relative mx-auto flex aspect-square items-center justify-center"
          style={{ width: "min(640px, 87vw)" }}
        >
          {/* Dotted Rings */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 640 640" className="h-full w-full opacity-20">
              <circle
                cx="320"
                cy="320"
                r="180"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <circle
                cx="320"
                cy="320"
                r="300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
            </svg>
          </div>

          {/* Outer Ring */}
          <div className="absolute inset-0 animate-spin-slow">
            {outer.map((ing, i) => {
              const angle = (i / outer.length) * 360;
              return (
                <div
                  key={ing.en}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${outerRadius}px) rotate(-${angle}deg)`,
                  }}
                >
                  <IngredientChip ing={ing} size="sm" containerSize={size} />
                </div>
              );
            })}
          </div>

          {/* Inner Ring */}
          <div className="absolute inset-0 animate-counter-spin">
            {inner.map((ing, i) => {
              const angle = (i / inner.length) * 360;
              return (
                <div
                  key={ing.en}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${innerRadius}px) rotate(-${angle}deg)`,
                  }}
                >
                  <IngredientChip ing={ing} size="md" containerSize={size} />
                </div>
              );
            })}
          </div>

          {/* Center Disc */}
          <div
            className="relative z-10 flex flex-col items-center justify-center rounded-full border-4 border-card bg-gradient-to-br from-forest to-bark text-cream shadow-2xl"
            style={{ width: size * 0.275, height: size * 0.275 }}
          >
            <div
              className="font-display leading-none"
              style={{ fontSize: size * 0.094 }}
            >
              33
            </div>
            <div
              className="mt-1 uppercase tracking-[0.3em] text-cream/80"
              style={{ fontSize: size * 0.016 }}
            >
              Wild herbs
            </div>
            <div
              className="mt-1 font-script text-gold"
              style={{ fontSize: size * 0.031 }}
            >
              from Nepal
            </div>
          </div>
        </div>

        {/* Full list */}
        <div className="mx-auto mt-16 max-w-5xl md:text-center">
          <h3 className="mb-8 font-display text-2xl text-forest md:text-3xl">
            Yachu Hair Oil - Ingredients
          </h3>
          <ul className="flex flex-wrap gap-2.5 md:justify-center md:gap-3">
            {INGREDIENTS.map((ing) => (
              <li
                key={ing.en}
                className="flex items-center gap-2 rounded-full border border-forest/10 bg-white px-3.5 py-2 shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md"
              >
                <Image
                  src={ing.emoji}
                  alt=""
                  width={40}
                  height={40}
                  className="h-5 w-5 object-contain"
                />
                <span className="text-sm font-medium text-forest md:text-base">
                  {ing.en}
                </span>
                <span className="font-devanagari text-xs text-forest/70 md:text-sm">
                  ({ing.np})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Ingredients;
