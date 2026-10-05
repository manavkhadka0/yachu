"use client";

import { cn } from "@/lib/utils";
import type { OfferTier } from "@/constants/offers";

interface PackPickerProps {
  tiers: OfferTier[];
  selected: number;
  onSelect: (index: number) => void;
  label: string;
}

/* Radio rows for choosing a Dashain pack */
const PackPicker = ({ tiers, selected, onSelect, label }: PackPickerProps) => (
  <div role="radiogroup" aria-label={label} className="space-y-2.5">
    {tiers.map((tier, index) => {
      const active = index === selected;
      return (
        <button
          key={tier.qty}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onSelect(index)}
          className={cn(
            "flex w-full cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            active
              ? "border-forest bg-accent/60 shadow-sm"
              : "border-border bg-background hover:border-forest/30"
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
              active ? "border-forest" : "border-foreground/25"
            )}
          >
            {active && <span className="h-2.5 w-2.5 rounded-full bg-forest" />}
          </span>

          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2 text-base font-semibold text-forest">
              {tier.label}
              {tier.best && (
                <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Best value
                </span>
              )}
            </span>
            <span className="block text-xs text-foreground/65 sm:text-sm">
              {tier.perk}
            </span>
          </span>

          <span className="shrink-0 text-right">
            <span className="block text-lg font-bold leading-tight text-forest">
              Rs. {tier.price.toLocaleString()}
            </span>
            <span className="block text-xs text-foreground/55">
              <span className="line-through">
                Rs. {tier.originalPrice.toLocaleString()}
              </span>{" "}
              <span className="font-semibold text-bark">
                {tier.discountLabel}
              </span>
            </span>
          </span>
        </button>
      );
    })}
  </div>
);

export default PackPicker;
