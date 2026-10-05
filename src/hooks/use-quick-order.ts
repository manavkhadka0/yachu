"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useProducts } from "@/hooks/use-products";
import useProductCart from "@/store/zustand";
import { HERO_OFFER, OIL_TIERS, type OfferTier } from "@/constants/offers";

/* One-tap order: put the chosen pack in the cart at the offer price and open checkout */
export function useQuickOrder() {
  const router = useRouter();
  const { data: products } = useProducts();
  const { cart, addToCart } = useProductCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleOrder = (
    source: string,
    tier?: OfferTier,
    slug: string = HERO_OFFER.slug
  ) => {
    posthog.capture("home_order_clicked", {
      source,
      slug,
      quantity: tier?.qty ?? 1,
    });

    const product = products?.find((p) => p.slug === slug);
    if (!product) {
      router.push("/products");
      return;
    }

    const isInCart = cart.some((item) => item.product.id === product.id);
    if (tier || !isInCart) {
      const pack = tier ?? OIL_TIERS[0];
      addToCart([
        ...cart.filter((item) => item.product.id !== product.id),
        { product: { ...product, price: pack.perPcs }, count: pack.qty },
      ]);
    }
    setCheckoutOpen(true);
  };

  return { handleOrder, checkoutOpen, setCheckoutOpen };
}
