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
import { useState } from "react";
import { CheckoutModal } from "../popover/CheckoutModal";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, description, price, image1 } = product;
  const { cart, addToCart } = useProductCart();
  const [openCheckoutForm, setOpenCheckoutForm] = useState(false);

  const isInCart = cart.some((item) => item.product.id === id);

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
    <div className="flex flex-col overflow-hidden transition-all duration-500 border border-gray-100 rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white group relative">
      <div className="absolute top-4 right-4 z-[1]">
        <div className="px-3  py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
          In Stock
        </div>
      </div>

      <Link href={`/products/${id}`} className="relative overflow-hidden">
        <div className="flex-shrink-0 w-full h-80 overflow-hidden bg-gray-50">
          <Image
            height={300}
            width={300}
            className="object-contain w-full h-full p-8 transition-transform duration-500 group-hover:scale-110"
            src={image1}
            alt={title}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-2">
            <Link
              href={`/products/${id}`}
              className="text-lg font-semibold text-gray-800 hover:text-amber-600 transition-colors duration-200 line-clamp-1"
            >
              {title}
            </Link>
            <p className="text-2xl font-bold text-amber-600">
              Rs. {price.toLocaleString()}
            </p>
          </div>
          <p
            className="text-sm text-gray-600 line-clamp-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          {isInCart ? (
            <>
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all duration-300 hover:shadow-md"
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon className="w-4 h-4 mr-2" />
                Add More
              </Button>
              <Link href={`/products/${id}`} className="flex-1">
                <Button
                  className="w-full bg-white border border-amber-200 text-amber-900 hover:bg-amber-50 shadow-sm transition-all duration-300 hover:shadow-md"
                  variant="secondary"
                >
                  <ExternalLinkIcon className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </Link>
              <Link href={`/checkout`} className="flex-1">
              <Button
                className="col-span-2 bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all duration-300 hover:shadow-m"
                
              >
                Proceed to Checkout
              </Button>
              </Link>
            </>
          ) : (
            <>
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all duration-300 hover:shadow-md"
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Link href={`/products/${id}`} className="flex-1">
                <Button
                  className="w-full bg-white border border-amber-200 text-amber-900 hover:bg-amber-50 shadow-sm transition-all duration-300 hover:shadow-md"
                  variant="secondary"
                >
                  <ExternalLinkIcon className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <CheckoutModal
        isOpen={openCheckoutForm}
        setIsOpen={setOpenCheckoutForm}
      />
    </div>
  );
};

export default ProductCard;
