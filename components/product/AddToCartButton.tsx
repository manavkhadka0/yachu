"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url?: string;
};

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to add the item to the cart
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // You can implement your cart logic here
      console.log("Added to cart:", { ...product, quantity });

      // Show success message
      alert("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
            className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <div className="text-lg font-medium">
          Total: Rs. {(product.price * quantity).toFixed(2)}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-600 px-8 py-3 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:bg-amber-300"
      >
        {isLoading ? (
          <span className="flex items-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Adding to Cart...</span>
          </span>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
}
