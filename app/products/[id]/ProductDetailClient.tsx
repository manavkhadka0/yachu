"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon, ArrowLeftIcon, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import useProductCart from "@/store/zustand";
import { useState, useEffect } from "react";
import { CartItem, TProduct } from "@/types/product";
import { newCart } from "@/lib/utils";
import { toast } from "sonner";
import { BASE_API_URL, BASE_URL } from "@/utils/config";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProductCart from "@/components/product/ProductCart";
import ProductCard from "@/components/product/ProductCard";

interface ProductDetailClientProps {
  product: any; // Replace 'any' with your product type
  otherProducts: any[]; // Other products to display
}

export default function ProductDetailClient({
  product,
  otherProducts,
}: ProductDetailClientProps) {
  const { cart, addToCart, increaseCount, decreaseCount, removeItem } =
    useProductCart();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    setIsInCart(!!cartItem);
    if (cartItem) {
      setQuantity(cartItem.count);
    }
  }, [cart, product.id]);

  const handleAddToCart = () => {
    if (!product) return;
    const cartItem: CartItem = {
      product: product,
      count: quantity,
    };
    const updatedCart = newCart(cartItem, [...cart]);
    addToCart(updatedCart);
    setIsInCart(true);
    toast.success("Product added to cart!");
  };

  const handleIncrease = () => {
    if (isInCart) {
      increaseCount(product.id);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (isInCart) {
      if (quantity > 1) {
        decreaseCount(product.id);
      } else {
        removeItem(product.id);
        setIsInCart(false);
        setQuantity(1);
      }
    } else if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-amber-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                href="/products"
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Products
              </Link>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* Product Image */}
          <div className="lg:max-w-lg lg:self-start sticky top-8">
            <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-xl">
              <div className="aspect-h-4 aspect-w-3 relative">
                <Image
                  src={`${product.image1}`}
                  alt={product.title}
                  width={800}
                  height={800}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-10 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.title}
              </h1>

              <div className="mt-3">
                <p className="text-4xl tracking-tight text-amber-600 font-black">
                  Rs. {product.price}
                </p>
              </div>

              <div className="mt-6">
                <div className="space-y-6 text-base text-gray-700">
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </div>

              <div className="mt-8 space-y-8">
                {product.volume && (
                  <div className="flex items-center">
                    <h2 className="text-sm font-medium text-gray-900">
                      Volume:
                    </h2>
                    <p className="ml-2 text-sm text-gray-500">
                      {product.volume}
                    </p>
                  </div>
                )}

                {product.benefits && (
                  <div>
                    <h2 className="text-sm font-medium text-gray-900 mb-4">
                      Key Benefits:
                    </h2>
                    <div className="prose prose-sm text-gray-500">
                      <div
                        dangerouslySetInnerHTML={{ __html: product.benefits }}
                      />
                    </div>
                  </div>
                )}

                {product.ingredients && (
                  <div>
                    <h2 className="text-sm font-medium text-gray-900 mb-4">
                      Ingredients:
                    </h2>
                    <div className="prose prose-sm text-gray-500">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.ingredients,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {!isInCart ? (
                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <ShoppingCartIcon className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleDecrease}
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {quantity}
                      </span>
                      <Button
                        onClick={handleIncrease}
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button className="w-full bg-amber-100 text-amber-900 hover:bg-amber-200">
                        <ShoppingCartIcon className="w-5 h-5 mr-2" />
                        Checkout
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[300px] sm:w-[540px]">
                      <ProductCart />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* How to Use Section */}
              {product.how_to_use && (
                <div className="mt-10 pt-10 border-t border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    How to Use
                  </h2>
                  <div className="prose prose-sm text-gray-500">
                    <div
                      dangerouslySetInnerHTML={{ __html: product.how_to_use }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium tracking-wider uppercase mb-4">
            Our Collection
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Our Products
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our range of natural hair care products crafted with love
            and tradition
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {otherProducts?.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
