import { CartItem } from "@/types/product";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_PRICE_PER_BOTTLE = 2500;

// Fixed discounted prices per bottle per tier
const PRICE_PER_BOTTLE_1_2 = 2250; // 10% off → 2500 × 0.90 = 2250
const PRICE_PER_BOTTLE_3_PLUS = 2090; // 16.4% off → 3 × 2090 = 6270

/** Returns the discount rate based on total bottle count across the cart */
export function getDiscountRate(totalBottles: number): number {
  if (totalBottles >= 3) return Math.round((1 - PRICE_PER_BOTTLE_3_PLUS / BASE_PRICE_PER_BOTTLE) * 100) / 100;
  if (totalBottles >= 1) return 0.10;
  return 0;
}

/** Returns the discounted price per bottle based on total quantity */
export function getDiscountedPricePerBottle(totalBottles: number): number {
  if (totalBottles >= 3) return PRICE_PER_BOTTLE_3_PLUS;
  if (totalBottles >= 1) return PRICE_PER_BOTTLE_1_2;
  return BASE_PRICE_PER_BOTTLE;
}

export function calculateTotalPrice(cartItems: CartItem[]): number {
  const totalBottles = cartItems.reduce((sum, item) => sum + item.count, 0);
  const pricePerBottle = getDiscountedPricePerBottle(totalBottles);
  return pricePerBottle * totalBottles;
}

export function newCart(cartItem: CartItem, cart: CartItem[]) {
  const existingItem = cart.find(
    (item) => item.product.id === cartItem.product.id
  );
  if (existingItem) {
    existingItem.count += cartItem.count;
  } else {
    cart.push(cartItem);
  }
  return cart;
}

export const getTotalCount = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.count, 0);
};
