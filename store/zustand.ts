import { CartItem } from "@/types/product";
import { create } from "zustand";

interface ProductCartStore {
  cart: CartItem[];
  addToCart: (items: CartItem[]) => void;
}

const useProductCart = create<ProductCartStore>((set) => ({
  cart: [],
  addToCart: (items: CartItem[]) => set({ cart: items }),
}));

export default useProductCart;
