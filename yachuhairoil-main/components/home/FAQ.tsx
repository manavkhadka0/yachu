"use client";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/faqData";

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="md:text-center mb-12">
          <p className="font-script text-2xl text-gold mb-2">Good questions</p>
          <h2 className="text-4xl md:text-6xl text-forest">Frequently asked</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-2xl border-2 transition-all ${
                  isOpen
                    ? "border-forest/30 bg-card shadow-lg"
                    : "border-border bg-card hover:border-forest/20"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                >
                  <span className="font-display text-lg md:text-xl text-forest">
                    {f.q}
                  </span>
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-forest text-cream" : "bg-accent text-forest"}`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-6 text-foreground/70 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
