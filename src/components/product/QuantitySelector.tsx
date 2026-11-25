"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onSetQuantity?: (qty: number) => void;
  disabled?: boolean;
  itemLabel?: string;
  variant?: "details" | "cart" | "checkout";
}

/**
 * Quantity stepper with direct numeric input for single and bulk orders.
 */
export function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
  onSetQuantity,
  disabled = false,
  itemLabel = "item",
  variant = "details",
}: QuantitySelectorProps) {
  const [draft, setDraft] = useState(String(quantity));

  useEffect(() => {
    setDraft(String(quantity));
  }, [quantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
    setDraft(digitsOnly);
    if (!digitsOnly) return;
    const parsed = Number.parseInt(digitsOnly, 10);
    if (Number.isFinite(parsed) && parsed >= 1) {
      onSetQuantity?.(parsed);
    }
  };

  const handleBlur = () => {
    const parsed = Number.parseInt(draft, 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
      setDraft(String(quantity));
      return;
    }
    setDraft(String(parsed));
    if (parsed !== quantity) {
      onSetQuantity?.(parsed);
    }
  };

  if (variant === "checkout") {
    return (
      <div className="flex shrink-0 items-center rounded-full border bg-white">
        <button
          type="button"
          aria-label={`Decrease quantity of ${itemLabel}`}
          onClick={onDecrease}
          disabled={disabled || quantity <= 1}
          className="flex h-9 w-8 cursor-pointer items-center justify-center rounded-full text-foreground disabled:cursor-not-allowed disabled:opacity-30 sm:h-10 sm:w-9"
        >
          <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label={`Quantity of ${itemLabel}`}
          value={draft}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={disabled}
          className="w-8 bg-transparent text-center text-sm font-bold tabular-nums text-foreground focus:outline-none sm:w-9 sm:text-base"
        />
        <button
          type="button"
          aria-label={`Increase quantity of ${itemLabel}`}
          onClick={onIncrease}
          disabled={disabled}
          className="flex h-9 w-8 cursor-pointer items-center justify-center rounded-full text-foreground disabled:opacity-30 sm:h-10 sm:w-9"
        >
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
    );
  }

  if (variant === "cart") {
    return (
      <div className="flex items-center gap-2 mt-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Decrease quantity of ${itemLabel}`}
          className="h-8 w-8 rounded-xl flex-shrink-0"
          onClick={onDecrease}
          disabled={disabled || quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label={`Quantity of ${itemLabel}`}
          value={draft}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={disabled}
          className="h-8 w-12 rounded-lg border border-border bg-background text-center font-medium text-sm text-foreground tabular-nums focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Increase quantity of ${itemLabel}`}
          className="h-8 w-8 rounded-xl flex-shrink-0"
          onClick={onIncrease}
          disabled={disabled}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-1 p-1 border border-border rounded-xl bg-muted/40 shrink-0 h-11 sm:h-12 px-1.5 sm:px-2"
      )}
    >
      <Button
        type="button"
        onClick={onDecrease}
        variant="ghost"
        size="icon"
        aria-label={`Decrease quantity of ${itemLabel}`}
        disabled={disabled || quantity <= 1}
        className="h-8 w-8 rounded-lg flex-shrink-0 cursor-pointer disabled:opacity-30"
      >
        <Minus className="h-3.5 w-3.5" />
      </Button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label={`Quantity of ${itemLabel}`}
        value={draft}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled}
        className="w-11 sm:w-12 bg-transparent text-center font-bold text-sm sm:text-base text-foreground tabular-nums focus:outline-none"
      />
      <Button
        type="button"
        onClick={onIncrease}
        variant="ghost"
        size="icon"
        aria-label={`Increase quantity of ${itemLabel}`}
        disabled={disabled}
        className="h-8 w-8 rounded-lg flex-shrink-0 cursor-pointer"
      >
        <Plus className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
