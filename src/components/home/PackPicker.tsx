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
  <div role="radiogroup" aria-label={label} className="space-y-2">
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
            "flex w-full cursor-pointer items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            active
              ? "border-forest bg-forest/[0.06] shadow-sm"
              : "border-border/80 bg-background hover:border-forest/25"
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
              active ? "border-forest" : "border-foreground/20"
            )}
          >
            {active && <span className="h-2 w-2 rounded-full bg-forest" />}
          </span>

          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-sm font-semibold text-forest sm:text-[15px]">
              {tier.label}
              {tier.best && (
                <span className="rounded-md bg-gold/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-bark">
                  Best
                </span>
              )}
            </span>
            <span className="mt-0.5 block truncate text-[11px] text-foreground/60 sm:text-xs">
              {tier.perk}
            </span>
          </span>

          <span className="shrink-0 text-right">
            <span className="block text-[15px] font-bold tabular-nums leading-none text-forest sm:text-base">
              Rs. {tier.price.toLocaleString()}
            </span>
            <span className="mt-0.5 block text-[10px] tabular-nums text-foreground/45">
              <span className="line-through">
                Rs. {tier.originalPrice.toLocaleString()}
              </span>
            </span>
          </span>
        </button>
      );
    })}
  </div>
);

export default PackPicker;
