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
      <div
        className={`container mx-auto pb-4 xs:pb-6 md:pb-28 px-2 xs:px-4 ${className}`}
        id="products"
      >
        {showHeader && (
          <div className="flex flex-col justify-center items-center mb-6 xs:mb-8">
            <div className="mx-auto text-center">
              <h3 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold px-2">
                {title}
              </h3>
            </div>
          </div>
        )}

        <section className=" py-8 xs:py-10 sm:py-12 lg:py-0">
          <div className="px-2 xs:px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 lg:gap-8 xl:gap-12 mt-6 xs:mt-8 sm:mt-12">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Skeleton className="w-full h-48 xs:h-56 sm:h-64 lg:h-80" />
                    <div className="p-3 xs:p-4 sm:p-5 lg:p-6 space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error state with shadcn Alert
  if (error) {
    return (
      <div
        className={`container pb-4 xs:pb-6 md:pb-28 px-2 xs:px-4 ${className}`}
        id="products"
      >
        {showHeader && (
          <div className="flex flex-col justify-center items-center mb-6 xs:mb-8">
            <div className="mx-auto text-center">
              <h3 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold px-2">
                {title}
              </h3>
            </div>
          </div>
        )}

        <section className="bg-muted mx-auto py-8 xs:py-10 sm:py-12 lg:py-0">
          <div className="px-2 xs:px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center py-12 xs:py-16 sm:py-24 lg:py-32 px-2 xs:px-4">
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
      </div>
    );
  }

  // Empty state with shadcn Card
  if (!products || products.length === 0) {
    return (
      <div
        className={`container pb-4 xs:pb-6 md:pb-28 px-2 xs:px-4 ${className}`}
        id="products"
      >
        {showHeader && (
          <div className="flex flex-col justify-center items-center mb-6 xs:mb-8">
            <div className="mx-auto text-center">
              <h3 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold px-2">
                {title}
              </h3>
            </div>
          </div>
        )}

        <section className="bg-muted py-8 xs:py-10 sm:py-12 lg:py-0">
          <div className="px-2 xs:px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center py-12 xs:py-16 sm:py-24 lg:py-32 px-2 xs:px-4">
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
      </div>
    );
  }

  // Success state with products
  return (
    <div
      className={`container mx-auto pb-4 xs:pb-6 md:pb-28 px-2 xs:px-4 ${className}`}
      id="products"
    >
      {showHeader && (
        <div className="flex flex-col justify-center items-center mb-6 xs:mb-8">
          <div className="mx-auto text-center">
            <h3 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold px-2">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-2 xs:mt-3 sm:mt-4 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-xs xs:max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-2 xs:px-4 text-center leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      <section className="bg-background py-6 xs:py-8 sm:py-12 lg:py-0">
        <div className="px-2 xs:px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 lg:gap-8 xl:gap-12 mt-6 xs:mt-8 sm:mt-12">
            {products.map((product) => (
              <div
                key={product.id}
                className="transform transition duration-300 hover:scale-105"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductShowcase;
