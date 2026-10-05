"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import SectionHeading from "./SectionHeading";

const VIDEO_ID = "RiXgVVIQPOo";

const Commercial = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="commercial"
      className="relative overflow-hidden bg-gradient-to-br from-forest to-[oklch(0.22_0.06_150)] py-20 md:py-28"
    >
      {/* decorative leaves */}
      <div
        className="absolute left-10 top-10 h-32 w-32 animate-leaf-sway opacity-15"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100">
          <path
            d="M50 10 C 25 30, 20 60, 50 90 C 80 60, 75 30, 50 10 Z"
            fill="oklch(0.85 0.04 145)"
          />
        </svg>
      </div>
      <div
        className="absolute bottom-10 right-10 h-40 w-40 animate-float opacity-15"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100">
          <path
            d="M50 10 C 25 30, 20 60, 50 90 C 80 60, 75 30, 50 10 Z"
            fill="oklch(0.85 0.04 145)"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          tone="light"
          eyebrow="Watch the film"
          title="The Yachu commercial"
        />

        <div
          ref={containerRef}
          className="relative aspect-video overflow-hidden rounded-3xl border-2 border-gold/30 bg-[oklch(0.18_0.04_150)] shadow-2xl"
        >
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
              title="The Yachu commercial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button
              aria-label="Play commercial"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              {/* YouTube thumbnail, loaded only when the section is in view */}
              {inView && (
                <img
                  src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream shadow-2xl transition-transform duration-300 group-hover:scale-110 md:h-28 md:w-28">
                  <Play className="ml-1.5 h-8 w-8 fill-forest text-forest md:h-12 md:w-12" />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Commercial;
