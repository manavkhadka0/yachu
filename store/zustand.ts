import { CartItem } from "@/types/product";
import { create } from "zustand";

interface ProductCartStore {
  cart: CartItem[];
  addToCart: (items: CartItem[]) => void;
  increaseCount: (productId: string) => void;
  decreaseCount: (productId: string) => void;
  removeItem: (productId: string) => void;
}

const useProductCart = create<ProductCartStore>((set) => ({
  cart: [],
  addToCart: (items: CartItem[]) => set({ cart: items }),
  increaseCount: (productId: string) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId
          ? { ...item, count: item.count + 1 }
          : item
      ),
    })),
  decreaseCount: (productId: string) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      ),
    })),
  removeItem: (productId: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),
}));

export default useProductCart;
