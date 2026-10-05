import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartState {
  cart: CartItem[];
  addToCart: (itemOrItems: any, quantity?: number) => void;
  increaseCount: (productId: any) => void;
  decreaseCount: (productId: any) => void;
  removeItem: (productId: any) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (itemOrItems, quantity = 1) =>
        set((state: any) => {
          // If items is passed as an array (yachu flow style)
          if (Array.isArray(itemOrItems)) {
            return { cart: itemOrItems };
          }
          
          // Otherwise, handle it as a single product add (existing main app style)
          const product = itemOrItems;
          const existingItem = state.cart.find((item: any) => String(item.product.id) === String(product.id));
          if (existingItem) {
            return {
              cart: state.cart.map((item: any) =>
                String(item.product.id) === String(product.id)
                  ? { ...item, count: item.count + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, count: quantity }] };
        }),
      increaseCount: (productId) =>
        set((state: any) => ({
          cart: state.cart.map((item: any) =>
            String(item.product.id) === String(productId)
              ? { ...item, count: item.count + 1 }
              : item
          ),
        })),
      decreaseCount: (productId) =>
        set((state: any) => ({
          cart: state.cart.map((item: any) =>
            String(item.product.id) === String(productId) && item.count > 1
              ? { ...item, count: item.count - 1 }
              : item
          ),
        })),
      removeItem: (productId) =>
        set((state: any) => ({
          cart: state.cart.filter((item: any) => String(item.product.id) !== String(productId)),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "yachu-cart",
    }
  )
);
