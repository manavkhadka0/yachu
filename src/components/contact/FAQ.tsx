"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQs } from "@/types/faqs";

const FAQ_LIST: FAQs = [
  {
    id: 5,
    question: "How do I order, and how do I pay?",
    answer:
      "Tap Order Now, then fill in your name, phone number and delivery address. You can choose Cash on Delivery and pay only when your order arrives. You can also order by calling us or messaging us on WhatsApp or Viber.",
  },
  {
    id: 6,
    question: "Do you deliver outside Kathmandu? What is the delivery charge?",
    answer:
      "Yes, we deliver all over Nepal. The delivery charge is Rs. 100 inside Kathmandu Valley and Rs. 150 outside Kathmandu Valley.",
  },
  {
    id: 7,
    question: "How do I use Yachu Hair Oil?",
    answer:
      "Apply the oil twice a week. Gently massage it into your hair and scalp for 15 minutes, leave it in for 2-4 hours, then rinse thoroughly with a mild shampoo.",
  },
  {
    id: 1,
    question:
      "What makes Yachu Hair Oil different from other hair care products on the market?",
    answer:
      "Yachu Hair Oil stands out for its commitment to blending tradition with innovation. Our premium botanical oils, crafted through generations-old techniques, harness the power of natural ingredients like coconut, olive, almond, and castor oils. Our expert formulations are designed to cater to various hair goals, providing a unique and effective solution for healthier, more beautiful hair.",
  },
  {
    id: 2,
    question: "Are Yachu Hair Oils suitable for all hair types?",
    answer:
      "Yes, absolutely! Our carefully curated blends are versatile and suitable for all hair types. Whether you have fine, straight hair or thick, curly locks, our oils are formulated to nourish and enhance the natural beauty of your hair without weighing it down.",
  },
  {
    id: 3,
    question: "How quickly will I see results from using Yachu Hair Oil?",
    answer:
      "While individual results may vary, many of our customers notice positive changes in the texture and health of their hair after just a few uses. Consistency is key, and incorporating Yachu Hair Oil into your regular hair care routine will contribute to long-term benefits such as improved strength, reduced frizz, and enhanced shine.",
  },
  {
    id: 4,
    question: "Is Yachu committed to sustainable and ethical practices?",
    answer:
      "Absolutely. Yachu takes pride in conducting business responsibly and sustainably. Our oils are packaged in recyclable materials, and we actively participate in programs that contribute to environmental conservation, such as tree planting initiatives and carbon offset projects. We are dedicated to minimizing our environmental impact while providing exceptional hair care products.",
  },
];

const FAQ = ({ limit }: { limit?: number }) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="w-full space-y-3 text-left">
      {FAQ_LIST.slice(0, limit).map(({ question, answer }, index) => {
        const isOpen = open === index;
        return (
          <div
            key={question}
            className={`rounded-2xl border-2 transition-all ${
              isOpen
                ? "border-forest/30 bg-card shadow-lg"
                : "border-border bg-card hover:border-forest/20"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left md:p-6"
            >
              <span className="font-display text-lg text-forest md:text-xl">
                {question}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isOpen ? "bg-forest text-cream" : "bg-accent text-forest"
                }`}
              >
                {isOpen ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 leading-relaxed text-foreground/70 md:px-6">
                  {answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FAQ;
