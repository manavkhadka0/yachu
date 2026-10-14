"use client";

import { useState, useEffect } from "react";
import useProductCart from "@/store/zustand";
import { CartItem } from "@/types/product";
import { newCart, getItemUnitPrice } from "@/services/lib/utils";
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
import posthog from "posthog-js";
import { useRef } from "react";

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

  const otherProducts = allProducts?.filter((p) => p.slug !== slug) || [];

  // Track product view with a ref to prevent duplicate captures
  const hasTrackedView = useRef(false);
  useEffect(() => {
    if (product && !hasTrackedView.current) {
      const unitPrice = getItemUnitPrice(product, 1);
      posthog.capture("product_viewed", {
        product_id: product.id,
        product_title: product.title,
        product_slug: product.slug,
        product_price: unitPrice,
      });
      hasTrackedView.current = true;
    }
  }, [product]);

  const cartItem = cart.find(
    (item) => String(item.product.id) === String(product?.id)
  );
  const cartCount = cartItem?.count ?? 0;
  const isInCart = cartCount > 0;

  const handleAddToCart = () => {
    if (!product) return;
    const unitPrice = getItemUnitPrice(product, quantity);
    const newCartItem: CartItem = {
      product: { ...product, price: unitPrice },
      count: quantity,
    };
    const updatedCart = newCart(newCartItem, [...cart]);
    addToCart(updatedCart);
    const totalNow =
      updatedCart.find(
        (item) => String(item.product.id) === String(product.id)
      )?.count ?? quantity;
    toast.success(
      `Added ${quantity} ${quantity === 1 ? "bottle" : "bottles"} to cart!`,
      {
        description: `Total ${totalNow} in cart.`,
      }
    );
  };

  const handleSelectQuantity = (qty: number) => {
    setQuantity(qty);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
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
            cartCount={cartCount}
            isInCart={isInCart}
            onAddToCart={handleAddToCart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onSelectQuantity={handleSelectQuantity}
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