import { CartItem } from "@/types/product";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Bulk pricing configuration for oil products
const BULK_PRICING = {
  3: { pricePerUnit: 2200, label: "3 pcs oil - Rs.2200" },
  6: { pricePerUnit: 2150, label: "6 pcs oil - Rs.2150" },
  12: { pricePerUnit: 2050, label: "12 pcs oil - Rs.2050" }
};

// Define oil product slugs that qualify for bulk pricing
const OIL_PRODUCT_SLUGS = ["hairfall-case", "dandruff-case", "baldness-case"];

// Helper function to determine which bulk pricing tier applies
const getBulkPricingTier = (totalQuantity: number) => {
  if (totalQuantity >= 12) return BULK_PRICING[12];
  if (totalQuantity >= 6) return BULK_PRICING[6];
  if (totalQuantity >= 3) return BULK_PRICING[3];
  return null;
};

export function calculateTotalPrice(cartItems: CartItem[]): number {
  // Calculate total oil quantity for bulk pricing
  const totalOilQuantity = cartItems.reduce((total, { product, count }) => {
    if (OIL_PRODUCT_SLUGS.includes(product.slug)) {
      return total + count;
    }
    return total;
  }, 0);

  // Determine which bulk pricing tier applies
  const bulkPricingTier = getBulkPricingTier(totalOilQuantity);

  // Calculate total price with bulk pricing logic
  let totalPrice = 0;
  
  cartItems.forEach(({ product, count }) => {
    if (OIL_PRODUCT_SLUGS.includes(product.slug) && bulkPricingTier) {
      // Apply bulk pricing for oil products
      totalPrice += count * bulkPricingTier.pricePerUnit;
    } else {
      // Regular pricing for non-oil products or when bulk pricing doesn't apply
      totalPrice += count * product.price;
    }
  });
  
  return totalPrice;
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