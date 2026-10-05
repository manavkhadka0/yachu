"use client";

import { ChevronRight, ImageIcon, Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/use-testimonials";
import type { Testimonial } from "@/services/api/testimonials";
import { getImageUrl } from "@/utils/image";
import SectionHeading from "./SectionHeading";

// The API returns http:// media links; the site itself is served over https
const secure = (url: string) => getImageUrl(url).replace(/^http:\/\//, "https://");

function ImageSlot({
  src,
  alt,
  label,
  side,
}: {
  src: string | null;
  alt: string;
  label: string;
  side: "before" | "after";
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${
        side === "before"
          ? "border-r border-border bg-[oklch(0.92_0.02_55)]"
          : "bg-[oklch(0.93_0.05_145)]"
      }`}
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
          className={`h-10 w-10 ${
            side === "before" ? "text-foreground/30" : "text-forest/40"
          }`}
        />
      )}
      <span
        className={`absolute top-3 rounded-full px-2 py-1 text-[10px] uppercase tracking-widest ${
          side === "before"
            ? "left-3 bg-background/80 text-foreground/60"
            : "right-3 bg-cream text-forest"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
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
              <span className="text-xs uppercase tracking-wider text-foreground/55">
                {t.role || t.title}
              </span>
            )}
          </div>
        )}
        <Quote className="mb-2 h-5 w-5 text-gold" />
        <p className="font-display text-xl italic leading-snug text-forest">
          &ldquo;{t.review}&rdquo;
        </p>
        <p className="mt-4 text-sm text-foreground/55">— {t.name}</p>
      </div>
    </article>
  );
}

interface BeforeAfterProps {
  onOrder: (source: string) => void;
}

const BeforeAfter = ({ onOrder }: BeforeAfterProps) => {
  const { data: testimonials, isLoading, error } = useTestimonials();

  if (isLoading || error || !testimonials?.length) return null;

  return (
    <section id="results" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Real scalps, real time"
          title="Before & after"
          description="No filters, no edits. Photos shared by the Yachu community."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 6).map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => onOrder("before_after")}
            className="group flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-forest px-10 font-medium tracking-wide text-cream shadow-[0_15px_40px_-15px_oklch(0.32_0.07_150/0.6)] transition-all hover:bg-forest/90 sm:w-auto"
          >
            Start with one bottle
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="text-xs text-foreground/55">
            Individual results may vary.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
