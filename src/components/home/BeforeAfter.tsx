"use client";

import { ChevronRight, ImageIcon, Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/use-testimonials";
import type { Testimonial } from "@/services/api/testimonials";
import { getImageUrl } from "@/utils/image";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

// The API returns http:// media links; the site itself is served over https
const secure = (url: string) => getImageUrl(url).replace(/^http:\/\//, "https://");

function ImageSlot({
  src,
  alt,
  label,
  side,
  compact,
}: {
  src: string | null;
  alt: string;
  label: string;
  side: "before" | "after";
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        side === "before"
          ? "border-r border-border bg-[oklch(0.92_0.02_55)]"
          : "bg-[oklch(0.93_0.05_145)]"
      )}
    >
      {src ? (
        <img
          src={secure(src)}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <ImageIcon
          className={cn(
            compact ? "h-6 w-6" : "h-10 w-10",
            side === "before" ? "text-foreground/40" : "text-forest/50"
          )}
        />
      )}
      <span
        className={cn(
          "absolute rounded-full font-semibold uppercase tracking-widest",
          compact
            ? "top-1.5 px-1.5 py-0.5 text-[8px]"
            : "top-3 px-2 py-1 text-[10px]",
          side === "before"
            ? "left-1.5 bg-background/90 text-foreground/80 sm:left-3"
            : "right-1.5 bg-cream text-forest sm:right-3"
        )}
      >
        {label}
      </span>
    </div>
  );
}

function TestimonialCard({
  t,
  compact,
}: {
  t: Testimonial;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <article className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid aspect-[4/3] grid-cols-2">
          <ImageSlot
            src={t.before}
            alt={`${t.name} before`}
            label="Before"
            side="before"
            compact
          />
          <ImageSlot
            src={t.after}
            alt={`${t.name} after`}
            label="After"
            side="after"
            compact
          />
        </div>
        <div className="px-2.5 py-2 sm:px-3 sm:py-2.5">
          <p className="truncate text-xs font-semibold text-forest sm:text-sm">
            {t.name}
          </p>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-foreground/80 sm:text-xs">
            {t.review}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:shadow-xl">
      <div className="grid aspect-square grid-cols-2">
        <ImageSlot
          src={t.before}
          alt={`${t.name} before`}
          label="Before"
          side="before"
        />
        <ImageSlot
          src={t.after}
          alt={`${t.name} after`}
          label="After"
          side="after"
        />
      </div>
      <div className="p-6">
        {(t.source || t.role || t.title) && (
          <div className="mb-3 flex items-center gap-3">
            {t.source && (
              <span className="rounded-full bg-forest/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-forest">
                {t.source}
              </span>
            )}
            {(t.role || t.title) && (
              <span className="text-xs uppercase tracking-wider text-foreground/70">
                {t.role || t.title}
              </span>
            )}
          </div>
        )}
        <Quote className="mb-2 h-5 w-5 text-gold" />
        <p className="font-display text-xl italic leading-snug text-forest">
          &ldquo;{t.review}&rdquo;
        </p>
        <p className="mt-4 text-sm text-foreground/70">— {t.name}</p>
      </div>
    </article>
  );
}

interface BeforeAfterProps {
  onOrder: (source: string) => void;
  /** Single row of cards that fill the available width */
  variant?: "default" | "compact";
}

const BeforeAfter = ({ onOrder, variant = "default" }: BeforeAfterProps) => {
  const { data: testimonials, isLoading, error } = useTestimonials();
  const compact = variant === "compact";

  if (isLoading || error || !testimonials?.length) return null;

  const items = testimonials.slice(0, compact ? 3 : 6);

  return (
    <section
      id="results"
      className={cn("relative", compact ? "py-10 sm:py-14" : "py-20 md:py-28")}
    >
      <div
        className={cn(
          "mx-auto",
          compact ? "max-w-6xl px-3.5 sm:px-5" : "max-w-7xl px-6"
        )}
      >
        <SectionHeading
          eyebrow={compact ? undefined : "Real scalps, real time"}
          title="Before & after"
          description={
            compact
              ? undefined
              : "No filters, no edits. Photos shared by the Yachu community."
          }
          size={compact ? "sm" : "default"}
          className={compact ? "mb-5 md:mb-6" : undefined}
        />

        {compact ? (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {items.map((t, index) => (
              <div
                key={t.id}
                className={cn(index === 2 && "hidden sm:block")}
              >
                <TestimonialCard t={t} compact />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
        )}

        <div
          className={cn(
            "flex flex-col items-center gap-2",
            compact ? "mt-6" : "mt-12 gap-3"
          )}
        >
          <button
            type="button"
            onClick={() => onOrder("before_after")}
            className={cn(
              "group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-forest font-medium tracking-wide text-cream transition-all hover:bg-forest/90 sm:w-auto",
              compact
                ? "h-11 px-6 text-sm shadow-[0_10px_28px_-12px_oklch(0.32_0.07_150/0.55)]"
                : "h-14 px-10 shadow-[0_15px_40px_-15px_oklch(0.32_0.07_150/0.6)]"
            )}
          >
            Start with one bottle
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
          </button>
          <p className="text-[11px] text-foreground/65 sm:text-xs">
            Individual results may vary.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
