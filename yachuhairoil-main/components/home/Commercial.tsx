"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

export function Commercial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="commercial"
      className="relative py-24 md:py-32 bg-gradient-to-br from-forest to-[oklch(0.22_0.06_150)] overflow-hidden"
    >
      {/* decorative leaves */}
      <div className="absolute top-10 left-10 w-32 h-32 opacity-15 animate-leaf-sway">
        <svg viewBox="0 0 100 100">
          <path
            d="M50 10 C 25 30, 20 60, 50 90 C 80 60, 75 30, 50 10 Z"
            fill="oklch(0.85 0.04 145)"
          />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 w-40 h-40 opacity-15 animate-float">
        <svg viewBox="0 0 100 100">
          <path
            d="M50 10 C 25 30, 20 60, 50 90 C 80 60, 75 30, 50 10 Z"
            fill="oklch(0.85 0.04 145)"
          />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="md:text-center mb-12">
          <p className="font-script text-2xl text-gold mb-2">Watch the film</p>
          <h2 className="text-4xl md:text-6xl text-cream">
            The Yachu commercial
          </h2>
          <p className="mt-4 text-cream/75 max-w-xl mx-auto">
            A 90-second journey through the hills of Nepal, the hands of our
            farmers, and the bottle that holds it all.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-video rounded-3xl overflow-hidden border-2 border-gold/30 shadow-2xl bg-[oklch(0.18_0.04_150)]"
        >
          {playing ? (
            /* ── active player: autoplay=1 with audio ── */
            <iframe
              src="https://www.youtube.com/embed/RiXgVVIQPOo?si=41hyPKC-vb32RWAY&autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            /* ── thumbnail + play overlay ── */
            <button
              aria-label="Play commercial"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 w-full h-full group"
            >
              {/* YouTube thumbnail — loads only when section is in view */}
              {inView && (
                <img
                  src="https://img.youtube.com/vi/RiXgVVIQPOo/maxresdefault.jpg"
                  alt="Yachu commercial thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* dark scrim */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

              {/* play button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-cream flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-8 h-8 md:w-14 md:h-14 text-forest fill-forest ml-2" />
                </div>
                <p className="text-cream/80 text-xs md:text-sm uppercase tracking-widest">
                  Watch · 1:20
                </p>
              </div>
            </button>
          )}
        </div>

        {/* metadata */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          {[
            { l: "Filmed in", v: "Kathmandu" },
            { l: "Featuring", v: "Yachu Family" },
            { l: "Runtime", v: "1 min 20 sec" },
          ].map((m) => (
            <div
              key={m.l}
              className="px-4 py-3 rounded-2xl bg-cream/5 backdrop-blur border border-cream/10"
            >
              <div className="text-xs text-cream/60 uppercase tracking-widest">
                {m.l}
              </div>
              <div className="text-cream mt-1 text-xs md:text-base font-medium">
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
