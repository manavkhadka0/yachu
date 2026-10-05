"use client";

import { useTestimonials } from "@/hooks/use-testimonials";
import { ImageIcon, Quote } from "lucide-react";

function ImageSlot({ src, alt, label, side }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${
        side === "before"
          ? "bg-[oklch(0.92_0.02_55)] border-r border-border"
          : "bg-[oklch(0.93_0.05_145)]"
      }`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <ImageIcon
          className={`w-10 h-10 ${
            side === "before" ? "text-foreground/30" : "text-forest/40"
          }`}
        />
      )}
      <span
        className={`absolute top-3 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
          side === "before"
            ? "left-3 text-foreground/60 bg-background/80"
            : "right-3 text-forest bg-cream"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <article className="group rounded-3xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all">
      <div className="grid grid-cols-2 aspect-square">
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
          <div className="flex items-center gap-3 mb-3">
            {t.source && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-forest/10 text-forest uppercase tracking-wider font-medium">
                {t.source}
              </span>
            )}
            {(t.role || t.title) && (
              <span className="text-xs text-foreground/55 uppercase tracking-wider">
                {t.role || t.title}
              </span>
            )}
          </div>
        )}
        <Quote className="w-5 h-5 text-gold mb-2" />
        <p className="font-display italic text-xl text-forest leading-snug">
          "{t.review}"
        </p>
        <p className="mt-4 text-sm text-foreground/55">— {t.name}</p>
      </div>
    </article>
  );
}

function SectionHeader() {
  return (
    <div className="md:text-center mb-14">
      <p className="font-script text-2xl text-gold mb-2">
        Real scalps, real time
      </p>
      <h2 className="text-4xl md:text-6xl text-forest">Before & after</h2>
      <p className="mt-4 text-foreground/65 max-w-xl mx-auto">
        No filters, no edits. Photos shared by the Yachu community.
      </p>
    </div>
  );
}

export function BeforeAfter() {
  const { data: testimonials, isLoading, error } = useTestimonials();

  if (isLoading || error) return null;

  return (
    <section id="results" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader />

        {testimonials?.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-foreground/65">No testimonials found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials?.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
