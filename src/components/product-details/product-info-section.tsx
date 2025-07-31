import { ShoppingCartIcon, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import ProductCart from "@/components/product/ProductCart";
import type { TProduct } from "@/types/product";

interface ProductInfoSectionProps {
  product: TProduct;
  quantity: number;
  isInCart: boolean;
  onAddToCart: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const ProductInfoSection = ({
  product,
  quantity,
  isInCart,
  onAddToCart,
  onIncrease,
  onDecrease,
}: ProductInfoSectionProps) => (
  <div className="mt-6 lg:mt-0 px-2 xs:px-3 sm:px-4">
    <Card className="shadow-lg sm:shadow-xl">
      <CardContent className="p-4 xs:p-5 sm:p-6 lg:p-8">
        <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
          {product.title}
        </h1>

        <div className="mt-2 xs:mt-3">
          <p className="text-2xl xs:text-3xl sm:text-4xl tracking-tight text-primary font-black">
            Rs. {product.price.toLocaleString()}
          </p>
        </div>

        <div className="mt-4 xs:mt-5 sm:mt-6">
          <div className="space-y-3 xs:space-y-4 sm:space-y-6 text-sm xs:text-base text-muted-foreground leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>

        <div className="mt-6 xs:mt-7 sm:mt-8 lg:mt-10 space-y-3 xs:space-y-4">
          <div className="flex flex-col xs:grid xs:grid-cols-2 gap-3 xs:gap-4">
            {!isInCart ? (
              <Button
                onClick={onAddToCart}
                className="w-full h-10 xs:h-11 sm:h-12 text-sm xs:text-base font-medium"
              >
                <ShoppingCartIcon className="w-4 h-4 xs:w-5 xs:h-5 mr-2" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-2 xs:gap-3 p-2 xs:p-3 border border-border rounded-lg bg-muted">
                <Button
                  onClick={onDecrease}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 flex-shrink-0"
                >
                  <Minus className="h-3 w-3 xs:h-4 xs:w-4" />
                </Button>
                <span className="w-8 xs:w-10 sm:w-12 text-center font-medium text-sm xs:text-base text-foreground">
                  {quantity}
                </span>
                <Button
                  onClick={onIncrease}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 flex-shrink-0"
                >
                  <Plus className="h-3 w-3 xs:h-4 xs:w-4" />
                </Button>
              </div>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="secondary"
                  className="w-full h-10 xs:h-11 sm:h-12 text-sm xs:text-base font-medium"
                >
                  <ShoppingCartIcon className="w-4 h-4 xs:w-5 xs:h-5 mr-2" />
                  Checkout
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[280px] xs:w-[300px] sm:w-[400px] lg:w-[540px] p-3 xs:p-4 sm:p-6">
                <ProductCart />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);