import { CartItem } from "@/types/product";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  dashainUnitPrice,
  DASHAIN_UNIT_PRICE,
  DASHAIN_PACKS,
} from "@/constants/offers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_PRICE_PER_BOTTLE = 2500;

// Standard price per bottle
const PRICE_PER_BOTTLE_1_2 = 2500;
const PRICE_PER_BOTTLE_3_PLUS = 2500;

/**
 * Returns the effective unit price for a given product and quantity.
 * If the product is part of a pack tier (e.g. hair oil or shampoo), it returns the tier per-piece price.
 * If it has a static offer price, it returns that.
 * Otherwise, it returns the product's regular price.
 */
export function getItemUnitPrice(
  product: { slug: string; price: number },
  qty: number = 1
): number {
  const tierPrice = dashainUnitPrice(product.slug, qty);
  if (tierPrice !== undefined) return tierPrice;

  const staticOffer = DASHAIN_UNIT_PRICE[product.slug];
  if (staticOffer !== undefined) {
    return staticOffer;
  }

  return product.price;
}

/**
 * Returns the original (undiscounted) unit price for a product.
 */
export function getItemOriginalPrice(
  product: { slug: string; price: number }
): number {
  const pack = DASHAIN_PACKS.find((item) => item.slug === product.slug);
  if (pack && pack.tiers.length > 0) {
    return pack.tiers[0].originalPrice;
  }
  return product.price;
}

/**
 * Returns pricing information for a product: unitPrice, originalPrice, hasDiscount, discountPercent, subtotal
 */
export function getProductPricing(
  product: { slug: string; price: number },
  qty: number = 1
) {
  const unitPrice = getItemUnitPrice(product, qty);
  const originalPrice = getItemOriginalPrice(product);
  const hasDiscount = originalPrice > unitPrice;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - unitPrice) / originalPrice) * 100)
    : 0;
  const totalPrice = unitPrice * qty;

  return {
    unitPrice,
    originalPrice,
    hasDiscount,
    discountPercent,
    totalPrice,
  };
}

/** Returns the discount rate based on total bottle count across the cart (legacy helper) */
export function getDiscountRate(totalBottles: number): number {
  if (totalBottles >= 3) return Math.round((1 - PRICE_PER_BOTTLE_3_PLUS / BASE_PRICE_PER_BOTTLE) * 100) / 100;
  if (totalBottles >= 1) return 0.10;
  return 0;
}

/** Returns the discounted price per bottle based on total quantity (legacy helper) */
export function getDiscountedPricePerBottle(totalBottles: number): number {
  if (totalBottles >= 3) return PRICE_PER_BOTTLE_3_PLUS;
  if (totalBottles >= 1) return PRICE_PER_BOTTLE_1_2;
  return BASE_PRICE_PER_BOTTLE;
}

export function calculateTotalPrice(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => {
    const unitPrice = getItemUnitPrice(item.product, item.count);
    return total + unitPrice * item.count;
  }, 0);
}

export function newCart(cartItem: CartItem, cart: CartItem[]) {
  const existingItemIndex = cart.findIndex(
    (item) => String(item.product.id) === String(cartItem.product.id)
  );
  if (existingItemIndex > -1) {
    const updatedCount = cart[existingItemIndex].count + cartItem.count;
    const unitPrice = getItemUnitPrice(cartItem.product, updatedCount);
    cart[existingItemIndex] = {
      ...cart[existingItemIndex],
      count: updatedCount,
      product: {
        ...cart[existingItemIndex].product,
        price: unitPrice,
      },
    };
  } else {
    const unitPrice = getItemUnitPrice(cartItem.product, cartItem.count);
    cart.push({
      ...cartItem,
      product: {
        ...cartItem.product,
        price: unitPrice,
      },
    });
  }
  return cart;
}

export const getTotalCount = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.count, 0);
};
