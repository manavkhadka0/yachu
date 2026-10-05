import React from "react";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    n: "01",
    title: "Frequency",
    body: "Apply the oil twice a week for optimal results.",
  },
  {
    n: "02",
    title: "Quantity",
    body: "For Short Hair: 10-12 ml. For Long Hair: 15-20 ml.",
  },
  {
    n: "03",
    title: "Application",
    body: "Gently massage the oil into your hair and scalp for 15 minutes.",
  },
  {
    n: "04",
    title: "Wait Time",
    body: "Leave the oil in your hair for 2-4 hours before washing.",
  },
  {
    n: "05",
    title: "Washing",
    body: "Rinse thoroughly with a mild shampoo to remove the oil.",
  },
];

const YachuHairOilHowToUse: React.FC = () => {
  return (
    <section id="how" className="relative bg-card py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="A simple ritual"
          title="How to use Yachu Hair Oil"
          description="Five mindful steps. Twice a week. That's the whole secret."
        />

        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <ol className="space-y-5">
            {steps.map((s) => (
              <li
                key={s.n}
                className="group flex gap-6 rounded-2xl bg-background py-2 transition-all hover:-translate-y-0.5 md:p-6 md:hover:shadow-sm"
              >
                <div className="min-w-[3rem] font-display text-5xl text-gold">
                  {s.n}
                </div>
                <div>
                  <h3 className="mb-1 text-2xl text-forest">{s.title}</h3>
                  <p className="leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="relative">
            <div className="mx-auto aspect-[9/16] max-w-sm overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/1FlgZBS61Sw?autoplay=0"
                title="Yachu Hair Oil How to Use"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div
              className="absolute -left-4 -top-8 h-24 w-24 animate-leaf-sway opacity-40"
              aria-hidden="true"
            >
              <svg viewBox="0 0 100 100">
                <path
                  d="M50 10 C 25 30, 20 60, 50 90 C 80 60, 75 30, 50 10 Z"
                  fill="oklch(0.45 0.09 145)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YachuHairOilHowToUse;
