import { CartItem } from "@/types/product";
import { create } from "zustand";

import { getItemUnitPrice } from "@/services/lib/utils";

interface ProductCartStore {
  cart: CartItem[];
  addToCart: (items: CartItem[]) => void;
  increaseCount: (productId: string) => void;
  decreaseCount: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const useProductCart = create<ProductCartStore>((set) => ({
  cart: [],
  addToCart: (items: CartItem[]) => set({ cart: items }),
  increaseCount: (productId: string) =>
    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.product.id === productId) {
          const nextCount = item.count + 1;
          const unitPrice = getItemUnitPrice(item.product, nextCount);
          return {
            ...item,
            count: nextCount,
            product: { ...item.product, price: unitPrice },
          };
        }
        return item;
      }),
    })),
  decreaseCount: (productId: string) =>
    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.product.id === productId && item.count > 1) {
          const nextCount = item.count - 1;
          const unitPrice = getItemUnitPrice(item.product, nextCount);
          return {
            ...item,
            count: nextCount,
            product: { ...item.product, price: unitPrice },
          };
        }
        return item;
      }),
    })),
  removeItem: (productId: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useProductCart;
