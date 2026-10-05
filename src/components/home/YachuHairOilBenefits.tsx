"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Droplets,
  Leaf,
  Shield,
  Sun,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

/* Decorative falling oil drop */
function OilDrop({ x, delay, size }: { x: number; delay: number; size: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute z-0"
      style={{ left: `${x}%`, top: "-40px" }}
      initial={{ y: -40, opacity: 0, scale: 0 }}
      animate={{
        y: ["0%", "120vh"],
        opacity: [0, 0.7, 0.7, 0],
        scale: [0, size, size, size * 0.8],
      }}
      transition={{
        duration: 5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        repeat: Infinity,
        repeatDelay: 4,
      }}
    >
      <svg width={24 * size} height={30 * size} viewBox="0 0 28 36" fill="none">
        <path
          d="M14 2C14 2 2 14 2 22C2 29 7.4 34 14 34C20.6 34 26 29 26 22C26 14 14 2 14 2Z"
          fill="#C8A96E"
          className="opacity-40"
        />
        <path
          d="M10 20C10 20 8 22 8 24C8 26.2 10 27 11 27"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-30"
        />
      </svg>
    </motion.div>
  );
}

interface Benefit {
  icon: LucideIcon;
  title: string;
  desc: string;
  tone: "forest" | "gold";
}

const benefits: Benefit[] = [
  {
    icon: Leaf,
    title: "100% Natural Ingredients",
    desc: "Deep Nourishment — Penetrates hair follicles to provide essential nutrients and promote healthy growth.",
    tone: "forest",
  },
  {
    icon: Sun,
    title: "UV Protection",
    desc: "Shields hair from harmful sun rays, preventing damage and color fading throughout the day.",
    tone: "gold",
  },
  {
    icon: Shield,
    title: "Strengthens Hair",
    desc: "Reduces breakage and split ends, leaving your hair stronger, more resilient and full of life.",
    tone: "forest",
  },
  {
    icon: Droplets,
    title: "Revitalizes Scalp",
    desc: "Stimulates blood circulation in the scalp, promoting healthier and faster hair growth.",
    tone: "gold",
  },
];

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = benefit.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.21, 0.45, 0.32, 0.9],
      }}
      whileHover={{ y: -5 }}
      className="group relative rounded-3xl border border-stone-200/50 p-7 backdrop-blur-sm transition-all duration-500 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 md:p-8"
    >
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 ${
          benefit.tone === "forest"
            ? "bg-forest/10 text-forest"
            : "bg-gold/10 text-gold"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-3 font-display text-xl font-bold leading-tight text-forest">
        {benefit.title}
      </h3>
      <p className="text-sm leading-relaxed text-foreground/65">
        {benefit.desc}
      </p>
    </motion.div>
  );
}

const drops = [
  { x: 5, delay: 0, size: 0.7 },
  { x: 15, delay: 2, size: 0.9 },
  { x: 80, delay: 1, size: 0.8 },
  { x: 92, delay: 3, size: 0.6 },
];

interface BenefitsProps {
  onOrder: (source: string) => void;
}

const YachuHairOilBenefits = ({ onOrder }: BenefitsProps) => {
  const sectionRef = useRef(null);
  const titleInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      {/* Background FX */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        {drops.map((d) => (
          <OilDrop key={d.x} {...d} />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-14 md:mb-20 md:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            className="mb-5 text-4xl text-forest md:text-6xl"
          >
            Benefits of Yachu Hair Oil
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            className="text-lg leading-relaxed text-foreground/65"
          >
            Discover the transformative power of 33 natural ingredients.
          </motion.p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="order-2 space-y-6 lg:order-1 lg:space-y-8">
            {benefits.slice(0, 2).map((b, i) => (
              <BenefitCard key={b.title} benefit={b} index={i} />
            ))}
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative">
              <motion.div
                className="absolute inset-0 scale-150 rounded-full bg-gold/10 blur-3xl"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Image
                  src="/hairfall-bottle.png"
                  alt="Yachu Hair Oil bottle"
                  width={670}
                  height={714}
                  sizes="(max-width: 1024px) 70vw, 384px"
                  className="h-auto w-64 drop-shadow-2xl sm:w-80 lg:w-96"
                />
              </motion.div>
            </div>
          </div>

          <div className="order-3 space-y-6 lg:space-y-8">
            {benefits.slice(2).map((b, i) => (
              <BenefitCard key={b.title} benefit={b} index={i + 2} />
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center md:mt-20">
          <button
            type="button"
            onClick={() => onOrder("benefits")}
            className="group flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-forest px-12 font-medium text-cream shadow-xl transition-all hover:bg-forest/90 sm:w-auto"
          >
            Order Yachu Hair Oil
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default YachuHairOilBenefits;
