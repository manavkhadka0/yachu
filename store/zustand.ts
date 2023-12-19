import { TProduct } from "@/types/product";
import { create } from "zustand";

interface ProductCartStore {
  cart: TProduct[];
  addToCart: (items: TProduct) => void;
}

const useProductCart = create<ProductCartStore>((set) => ({
  cart: [],
  addToCart: (item: TProduct) =>
    set((state) => ({ cart: [...state.cart, item] })),
}));

export default useProductCart;
