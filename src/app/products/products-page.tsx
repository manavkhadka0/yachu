"use client";

import ProductShowcase from "@/components/product/product-showcase";
import { useProducts } from "@/hooks/use-products";
import { Badge } from "@/components/ui/badge";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();

  const allowedSlugsOrder = [
    "yachu-hair-oil",
    "yachu-shampoo-300-ml",
    "sachet-oil-90-ml",
    "sachet-shampoo",
  ];

  const filteredProducts = products
    ? allowedSlugsOrder
        .map((slug) => products.find((p) => p.slug === slug))
        .filter((p): p is NonNullable<typeof p> => p !== undefined)
    : undefined;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:py-20 lg:max-w-7xl lg:px-8">
        <div className="text-center mb-6 sm:mb-10 lg:mb-16">
          <Badge
            variant="secondary"
            className="inline-block px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2  text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 sm:mb-3 md:mb-4 "
          >
            Our Collection
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground  lg:text-5xl xl:text-6xl">
            Our Products
          </h1>
        </div>
        <ProductShowcase
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          showHeader={false}
          className="!pb-0"
          subtitle="Discover our range of natural hair care products crafted with love and tradition"
        />
      </div>
    </div>
  );
}
