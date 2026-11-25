import { CartItem } from "@/types/product";
import { create } from "zustand";

import { getItemUnitPrice } from "@/services/lib/utils";

interface ProductCartStore {
  cart: CartItem[];
  addToCart: (items: CartItem[]) => void;
  increaseCount: (productId: string) => void;
  decreaseCount: (productId: string) => void;
  setCount: (productId: string, count: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const updateItemQuantity = (item: CartItem, nextCount: number): CartItem => {
  const safeCount = Math.max(1, Math.floor(nextCount));
  const unitPrice = getItemUnitPrice(item.product, safeCount);
  return {
    ...item,
    count: safeCount,
    product: { ...item.product, price: unitPrice },
  };
};

const useProductCart = create<ProductCartStore>((set) => ({
  cart: [],
  addToCart: (items: CartItem[]) => set({ cart: items }),
  increaseCount: (productId: string) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        String(item.product.id) === String(productId)
          ? updateItemQuantity(item, item.count + 1)
          : item
      ),
    })),
  decreaseCount: (productId: string) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        String(item.product.id) === String(productId) && item.count > 1
          ? updateItemQuantity(item, item.count - 1)
          : item
      ),
    })),
  setCount: (productId: string, count: number) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        String(item.product.id) === String(productId)
          ? updateItemQuantity(item, count)
          : item
      ),
    })),
  removeItem: (productId: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => String(item.product.id) !== String(productId)),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useProductCart;
