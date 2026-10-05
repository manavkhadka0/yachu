"use client";

import { INGREDIENTS } from "@/constants/ingredients";
import React from "react";
import { motion } from "framer-motion";

export function IngredientsList() {
  return (
    <section className="pb-24 bg-card px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl text-forest font-display mb-8">
          Yachu Hair Oil - Ingredients
        </h3>
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {INGREDIENTS.map((ing) => (
            <motion.div
              key={ing.en}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 10 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200 } },
              }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-white border border-forest/10 rounded-full shadow-sm hover:shadow-md hover:border-gold transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <img
                src={ing.emoji}
                alt={ing.en}
                className="w-5 h-5 object-contain"
              />
              <span className="font-medium text-forest group-hover:text-gold transition-colors">
                {ing.en}
              </span>
              <span className="text-sm text-forest/70">({ing.np})</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
