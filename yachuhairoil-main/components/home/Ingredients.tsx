"use client";

import { INGREDIENTS } from "@/constants/ingredients";
import React, { useRef, useState, useEffect } from "react";

export function Ingredients() {
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
      className="relative py-24 md:py-32 bg-card overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="md:text-center mb-12">
          <p className="font-script text-2xl text-gold mb-2">
            Born of the earth
          </p>
          <h2 className="text-4xl md:text-6xl text-forest">
            33 herbs from Nepal
          </h2>
        </div>

        <div
          ref={containerRef}
          className="relative mx-auto aspect-square flex items-center justify-center"
          style={{ width: "min(640px, 87vw)" }}
        >
          {/* Dotted Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 640 640" className="w-full h-full opacity-20">
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
                  className="absolute top-1/2 left-1/2"
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
                  className="absolute top-1/2 left-1/2"
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
            className="relative z-10 rounded-full bg-gradient-to-br from-forest to-bark flex flex-col items-center justify-center text-cream shadow-2xl border-4 border-card"
            style={{ width: size * 0.275, height: size * 0.275 }}
          >
            <div
              className="font-display leading-none"
              style={{ fontSize: size * 0.094 }}
            >
              33
            </div>
            <div
              className="uppercase tracking-[0.3em] mt-1 text-cream/80"
              style={{ fontSize: size * 0.016 }}
            >
              Wild herbs
            </div>
            <div
              className="font-script text-gold mt-1"
              style={{ fontSize: size * 0.031 }}
            >
              from Nepal
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IngredientChip({
  ing,
  size = "md",
  containerSize = 640,
}: {
  ing: { en: string; np: string; emoji: string };
  size?: "sm" | "md";
  containerSize?: number;
}) {
  const chipSize = size === "sm" ? containerSize * 0.086 : containerSize * 0.1;

  return (
    <div
      className="group rounded-full bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center hover:scale-110 hover:border-gold hover:shadow-xl transition-all duration-300 cursor-pointer"
      style={{ width: chipSize, height: chipSize }}
    >
      <img
        src={ing.emoji}
        alt={ing.en}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
