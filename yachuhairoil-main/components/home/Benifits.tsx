"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Sun, Shield, Droplets } from "lucide-react";
import { useRouter } from "next/navigation";

// ─── Oil Drop Component ─────────────────────────────────────────────────────────────
function OilDrop({ x, delay, size = 1, color = "#C8A96E" }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-0"
      style={{ left: `${x}%`, top: "-40px" }}
      initial={{ y: -40, opacity: 0, scale: 0 }}
      animate={{
        y: ["0%", "120vh"],
        opacity: [0, 0.7, 0.7, 0],
        scale: [0, size, size, size * 0.8],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        repeat: Infinity,
        repeatDelay: 3 + Math.random() * 3,
      }}
    >
      <svg width={24 * size} height={30 * size} viewBox="0 0 28 36" fill="none">
        <path
          d="M14 2C14 2 2 14 2 22C2 29 7.4 34 14 34C20.6 34 26 29 26 22C26 14 14 2 14 2Z"
          fill={color}
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

// ─── Hair Strand Component ──────────────────────────────────────────────────────────
function HairStrand({ x, delay, opacity = 0.1 }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-0"
      style={{ left: `${x}%`, top: "-80px" }}
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: ["0%", "130vh"],
        opacity: [0, opacity, opacity, 0],
        rotate: [-1, 1, -0.5, 0.5, 0],
      }}
      transition={{
        duration: 6 + Math.random() * 3,
        delay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 5 + Math.random() * 4,
      }}
    >
      <svg width="2" height="60" viewBox="0 0 3 80">
        <path
          d={`M1.5 0 C${1 + Math.sin(delay) * 1.5} 20, ${1.5 - Math.cos(delay)} 40, ${1 + Math.sin(delay * 2) * 1.5} 60, 1.5 80`}
          stroke="#2C4332"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          className="opacity-20"
        />
      </svg>
    </motion.div>
  );
}

const benefits = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "100% Natural Ingredients",
    desc: "Deep Nourishment — Penetrates hair follicles to provide essential nutrients and promote healthy growth.",
    color: "text-[#2C4332]",
    bg: "bg-[#E8EDE9]",
  },
  {
    icon: <Sun className="w-6 h-6" />,
    title: "UV Protection",
    desc: "Shields hair from harmful sun rays, preventing damage and color fading throughout the day.",
    color: "text-[#C8A96E]",
    bg: "bg-[#C8A96E]/10",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Strengthens Hair",
    desc: "Reduces breakage and split ends, leaving your hair stronger, more resilient and full of life.",
    color: "text-[#2C4332]",
    bg: "bg-[#E8EDE9]",
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    title: "Revitalizes Scalp",
    desc: "Stimulates blood circulation in the scalp, promoting healthier and faster hair growth.",
    color: "text-[#C8A96E]",
    bg: "bg-[#C8A96E]/10",
  },
];

function BenefitCard({ benefit, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
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
      className="group relative backdrop-blur-sm p-8 rounded-3xl border border-stone-200/50 hover:border-[#C8A96E]/30 hover:shadow-xl hover:shadow-[#C8A96E]/5 transition-all duration-500"
    >
      <div
        className={`w-14 h-14 rounded-2xl ${benefit.bg} ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
      >
        {benefit.icon}
      </div>
      <h3 className="font-display text-xl text-[#2C4332] font-bold mb-3 leading-tight">
        {benefit.title}
      </h3>
      <p className="text-stone-500 text-sm leading-relaxed font-body">
        {benefit.desc}
      </p>
    </motion.div>
  );
}

export default function Benefits() {
  const sectionRef = useRef(null);
  const titleInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const router = useRouter();

  const drops = [
    { x: 5, delay: 0, size: 0.7 },
    { x: 15, delay: 2, size: 0.9 },
    { x: 80, delay: 1, size: 0.8 },
    { x: 92, delay: 3, size: 0.6 },
  ];
  const strands = [10, 25, 75, 88].map((x, i) => ({
    x,
    delay: i * 1.5,
    opacity: 0.05 + (i % 2) * 0.05,
  }));

  return (
    <section
      ref={sectionRef}
      className="bg-white relative py-24 md:py-32 overflow-hidden bg-transparent"
    >
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {drops.map((d, i) => (
          <OilDrop key={i} x={d.x} delay={d.delay} size={d.size} />
        ))}
        {strands.map((s, i) => (
          <HairStrand key={i} x={s.x} delay={s.delay} opacity={s.opacity} />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        <div className="md:text-center mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-6xl text-forest mb-6"
          >
            Benefits of Yachu Hair Oil
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            className="text-lg leading-relaxed"
          >
            Discover the transformative power of 33 wild Himalayan herbs,
            cold-pressed to perfection.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            {benefits.slice(0, 2).map((b, i) => (
              <BenefitCard key={i} benefit={b} index={i} />
            ))}
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-[#C8A96E]/10 rounded-full blur-3xl scale-150"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src="/hairfall-bottle.png"
                alt="Bottle"
                className="w-96 h-auto drop-shadow-2xl relative z-10"
              />
            </div>
          </div>

          <div className="space-y-8 order-3">
            {benefits.slice(2).map((b, i) => (
              <BenefitCard key={i} benefit={b} index={i + 2} />
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => {
              router.push("/products");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-4 bg-[#2C4332] text-white rounded-full font-medium shadow-xl hover:bg-[#36523d] transition-all"
          >
            Shop Yachu Hair Oil
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
