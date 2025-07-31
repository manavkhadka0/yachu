import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductDetailSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Breadcrumb Skeleton */}
      <nav className="mb-8">
        <Skeleton className="h-6 w-32" />
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* Product Image Skeleton */}
        <div className="lg:max-w-lg lg:self-start sticky top-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="aspect-square relative">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details Skeleton */}
        <div className="mt-10 lg:mt-0">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-10 w-32 mb-6" />
              
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div className="mt-10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-12" />
                  <Skeleton className="h-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    {/* Other Products Skeleton */}
    <div className="bg-card py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Skeleton className="h-64 mb-4 rounded" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-8 w-24 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
);
