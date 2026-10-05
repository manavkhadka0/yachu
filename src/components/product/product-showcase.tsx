import ProductCard from "./product-card";
import { TProduct } from "@/types/product";
import { AlertTriangle, Package } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import SectionHeading from "@/components/home/SectionHeading";

interface ProductShowcaseProps {
  products?: TProduct[];
  isLoading?: boolean;
  error?: Error | null;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  className?: string;
}

const allowedSlugsOrder = [
  "yachu-hair-oil",
  "yachu-shampoo-300-ml",
  "sachet-oil-90-ml",
  "sachet-shampoo",
];

const gridClass = "grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-8";

const ProductShowcase = ({
  products,
  isLoading = false,
  error = null,
  eyebrow = "The full collection",
  title = "Find your bottle",
  subtitle = "Discover our range of natural hair care products crafted with love and tradition",
  showHeader = true,
  className = "",
}: ProductShowcaseProps) => {
  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <div className={gridClass}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-border"
          >
            <div className="aspect-square w-full animate-pulse bg-muted" />
            <div className="space-y-3 p-5">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  } else if (error) {
    content = (
      <Alert variant="destructive" className="mx-auto max-w-md">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <p className="text-base font-semibold">Error loading products</p>
          <p className="text-sm">
            {error.message || "Something went wrong. Please try again later."}
          </p>
        </AlertDescription>
      </Alert>
    );
  } else if (!products || products.length === 0) {
    content = (
      <div className="mx-auto max-w-md rounded-2xl border border-border p-8 text-center">
        <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <p className="mb-2 text-xl font-semibold text-foreground">
          No products found
        </p>
        <p className="text-sm text-muted-foreground">
          Please check back later for our latest products.
        </p>
      </div>
    );
  } else {
    const filteredProducts = allowedSlugsOrder
      .map((slug) => products.find((p) => p.slug === slug))
      .filter((p): p is NonNullable<typeof p> => p !== undefined);

    const displayProducts =
      filteredProducts.length > 0 ? filteredProducts : products;

    content = (
      <div className={gridClass}>
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <section id="products" className={`relative py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        {showHeader && (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={subtitle}
          />
        )}
        {content}
      </div>
    </section>
  );
};

export default ProductShowcase;
