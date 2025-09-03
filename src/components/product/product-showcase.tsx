import ProductCard from "./product-card";
import { TProduct } from "@/types/product";
import { AlertTriangle, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductShowcaseProps {
  products?: TProduct[];
  isLoading?: boolean;
  error?: Error | null;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  className?: string;
}

const ProductShowcase = ({
  products,
  isLoading = false,
  error = null,
  title = "Our Products",
  subtitle = "Discover our range of natural hair care products crafted with love and tradition",
  showHeader = true,
  className = "",
}: ProductShowcaseProps) => {
  if (isLoading) {
    return (
      <section id="products" className={`py-10 sm:py-12 md:py-16 ${className}`}>
        {showHeader && (
          <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 mb-6 xs:mb-8">
            <div className="text-center">
              <h3 className="text-balance tracking-tight text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                {title}
              </h3>
            </div>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="w-full aspect-[4/3] animate-pulse bg-muted" />
                  <div className="p-4 sm:p-5 lg:p-6 space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <Skeleton className="h-9 w-full" />
                      <Skeleton className="h-9 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state with shadcn Alert
  if (error) {
    return (
      <section id="products" className={`py-10 sm:py-12 md:py-16 ${className}`}>
        {showHeader && (
          <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 mb-6 xs:mb-8">
            <div className="text-center">
              <h3 className="text-balance tracking-tight text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                {title}
              </h3>
            </div>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 xs:py-16 sm:py-20">
            <Alert variant="destructive" className="max-w-md mx-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-center">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    Error loading products
                  </h3>
                  <p className="text-sm">
                    {error.message ||
                      "Something went wrong. Please try again later."}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    );
  }

  // Empty state with shadcn Card
  if (!products || products.length === 0) {
    return (
      <section id="products" className={`py-10 sm:py-12 md:py-16 ${className}`}>
        {showHeader && (
          <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 mb-6 xs:mb-8">
            <div className="text-center">
              <h3 className="text-balance tracking-tight text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                {title}
              </h3>
            </div>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 xs:py-16 sm:py-20">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <Package className="mx-auto h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-sm xs:text-base text-muted-foreground">
                  Please check back later for our latest products.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Success state with products
  return (
    <section id="products" className={`py-10 sm:py-12 md:py-16 ${className}`}>
      {showHeader && (
        <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 mb-6 xs:mb-8">
          <div className="text-center">
            <h3 className="text-balance tracking-tight text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-2 xs:mt-3 sm:mt-4 text-pretty text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="transition-transform duration-200 ease-out will-change-transform hover:-translate-y-1"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
