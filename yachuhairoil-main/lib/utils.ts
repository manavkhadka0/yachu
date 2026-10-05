import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CartItem } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function calculateTotalPrice(cart: CartItem[]): number {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.count, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);
  
  // Apply 10% discount for any bundle (2 or more items)
  if (totalItems >= 2) {
    return Math.round(total * 0.9);
  }
  return total;
}

export function newCart(cartItem: CartItem, cart: CartItem[]): CartItem[] {
  const existingItem = cart.find(
    (item) => String(item.product.id) === String(cartItem.product.id)
  );
  if (existingItem) {
    existingItem.count += cartItem.count;
  } else {
    cart.push(cartItem);
  }
  return cart;
}

export const getTotalCount = (cartItems: CartItem[] | undefined): number => {
  return cartItems?.reduce((total, item) => total + item.count, 0) ?? 0;
};
