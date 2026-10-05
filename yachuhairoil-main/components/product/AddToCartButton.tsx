"use client";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";
import { toast } from "sonner";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCartStore();

  const handleAdd = () => {
    addToCart(product);
    toast.success("Added to cart", {
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="flex-1 py-4 rounded-xl bg-yellow-cta hover:brightness-95 text-[oklch(0.2_0.04_55)] font-bold tracking-widest text-sm uppercase transition-all flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" /> Add to Cart
    </button>
  );
}
