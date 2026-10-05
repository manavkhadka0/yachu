import { Play } from "lucide-react";

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

export function HowToUse() {
  return (
    <section id="how" className="relative py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="md:text-center mb-14">
          <p className="font-script text-2xl text-gold mb-2">A simple ritual</p>
          <h2 className="text-4xl md:text-6xl text-forest">
            How to use Yachu Hair Oil
          </h2>
          <p className="mt-4 text-foreground/65 max-w-xl mx-auto">
            Four mindful steps. Twice a week. That's the whole secret.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <ol className="space-y-5">
            {steps.map((s) => (
              <li
                key={s.n}
                className="group flex gap-6 py-2 md:p-6 rounded-2xl  bg-background hover:border-forest/30 hover:shadow-sm transition-all hover:-translate-y-0.5"
              >
                <div className="font-display text-5xl text-gold transition-colors min-w-[3rem]">
                  {s.n}
                </div>
                <div>
                  <h3 className="text-2xl text-forest mb-1">{s.title}</h3>
                  <p className="leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="relative">
            <div className="max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg bg-gray-900 aspect-[9/16]">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/1FlgZBS61Sw?autoplay=0"
                title="Yachu Hair Oil How to Use"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="absolute -top-8 -left-4 w-24 h-24 opacity-40 animate-leaf-sway">
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
}
