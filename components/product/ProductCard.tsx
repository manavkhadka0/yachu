"use client";

import { CartItem, TProduct } from "@/types/product";
import { ShoppingCartIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { newCart } from "@/lib/utils";
import { toast } from "sonner";
import useProductCart from "@/store/zustand";
import { BASE_API_URL } from "@/utils/config";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, description, price, image1 } = product;
  const { cart, addToCart } = useProductCart();

  const handleAddToCart = () => {
    if (!product) return;
    const cartItem: CartItem = {
      product: product,
      count: 1,
    };
    const updatedCart = newCart(cartItem, cart);
    addToCart(updatedCart);
    toast.success("Product added to cart. Checkout now!");
  };

  return (
    <div className="flex flex-col overflow-hidden transition-all duration-300 border border-gray-200 rounded-xl hover:shadow-xl bg-white group">
      <Link href={`/products/${id}`} className="relative overflow-hidden">
        <div className="flex-shrink-0 w-full h-80 overflow-hidden">
          <Image
            height={300}
            width={300}
            className="object-contain w-full h-full p-8 transition-transform duration-300 group-hover:scale-105"
            src={image1}
            alt={title}
          />
        </div>
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
            <Link
              href={`/products/${id}`}
              className="text-xl font-bold text-gray-900 hover:text-amber-600 transition-colors duration-200"
            >
              {title}
            </Link>
            <p className="text-2xl font-black text-amber-600">Rs. {price}</p>
          </div>
          <p
            className="text-sm text-gray-600 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <Button
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Link href={`/products/${id}`} className="flex-1">
            <Button
              className="w-full bg-amber-50 text-amber-900 hover:bg-amber-100"
              variant="secondary"
            >
              <ExternalLinkIcon className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
