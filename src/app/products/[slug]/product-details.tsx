"use client";

import { useState, useEffect } from "react";
import useProductCart from "@/store/zustand";
import { CartItem } from "@/types/product";
import { newCart } from "@/services/lib/utils";
import { toast } from "sonner";
import { useProduct, useProducts } from "@/hooks/use-products";
import { use } from "react";

import {
  ProductDetailSkeleton,
  ProductErrorState,
  ProductBreadcrumb,
  ProductImageDisplay,
  ProductInfoSection,
  OtherProductsSection,
} from "@/components/product-details";

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const {  slug} = use(params);
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useProduct(slug);
  const { data: allProducts, isLoading: productsLoading } = useProducts();

  const { cart, addToCart, increaseCount, decreaseCount, removeItem } =
    useProductCart();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  const otherProducts = allProducts?.filter((p) => p.slug !== slug) || [];

  useEffect(() => {
    if (!product) return;
    const cartItem = cart.find((item) => item.product.id === product.id);
    setIsInCart(!!cartItem);
    if (cartItem) {
      setQuantity(cartItem.count);
    }
  }, [cart, product]);

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
    if (!product) return;

    if (isInCart) {
      increaseCount(product.id);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (!product) return;

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

  // Loading state with skeleton
  if (productLoading) {
    return <ProductDetailSkeleton />;
  }

  // Error state
  if (productError || !product) {
    return <ProductErrorState errorMessage={productError?.message} />;
  }

  return (
    <div className="bg-gradient-to-b from-white to-amber-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ProductBreadcrumb />

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          <ProductImageDisplay image={product.image1} title={product.title} />

          <ProductInfoSection
            product={product}
            quantity={quantity}
            isInCart={isInCart}
            onAddToCart={handleAddToCart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        </div>
      </div>

      <OtherProductsSection
        products={otherProducts}
        isLoading={productsLoading}
      />
    </div>
  );
}