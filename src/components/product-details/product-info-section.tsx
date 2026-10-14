import { ShoppingCartIcon, Plus, Minus, Gift, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import ProductCart from "@/components/product/ProductCart";
import type { TProduct } from "@/types/product";
import useProductCart from "@/store/zustand";
import { getProductPricing } from "@/services/lib/utils";
import { DASHAIN_PACKS } from "@/constants/offers";
import { cn } from "@/lib/utils";

interface ProductInfoSectionProps {
  product: TProduct;
  quantity: number;
  isInCart: boolean;
  onAddToCart: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onSelectQuantity?: (qty: number) => void;
}

export const ProductInfoSection = ({
  product,
  quantity,
  isInCart,
  onAddToCart,
  onIncrease,
  onDecrease,
  onSelectQuantity,
}: ProductInfoSectionProps) => {
  const { cart } = useProductCart();
  const hasItemsInCart = cart.length > 0;

  const pricing = getProductPricing(product, quantity);
  const pack = DASHAIN_PACKS.find((p) => p.slug === product.slug);

  return (
    <div className="mt-6 lg:mt-0 px-2 xs:px-3 sm:px-4">
      <Card className="shadow-lg sm:shadow-xl">
        <CardContent className="p-4 xs:p-5 sm:p-6 lg:p-8">
          <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {product.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <p className="text-2xl xs:text-3xl sm:text-4xl tracking-tight text-primary font-black">
              Rs. {pricing.unitPrice.toLocaleString()}
            </p>
            {pricing.hasDiscount && (
              <>
                <p className="text-base sm:text-lg text-muted-foreground line-through">
                  Rs. {pricing.originalPrice.toLocaleString()}
                </p>
                <span className="rounded-lg bg-yellow-cta px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-forest shadow-sm">
                  Dashain {pricing.discountPercent}% off
                </span>
              </>
            )}
          </div>

          {quantity > 1 && (
            <p className="mt-1 text-sm text-muted-foreground">
              Total:{" "}
              <span className="font-semibold text-foreground">
                Rs. {pricing.totalPrice.toLocaleString()}
              </span>{" "}
              ({quantity} × Rs. {pricing.unitPrice.toLocaleString()})
            </p>
          )}

          {/* Dashain Tier Options (for products that have Dashain packs) */}
          {pack && pack.tiers.length > 0 && (
            <div className="mt-6 space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Dashain Special Packs
              </label>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {pack.tiers.map((tier) => {
                  const isSelected = quantity === tier.qty;
                  return (
                    <button
                      key={tier.qty}
                      type="button"
                      onClick={() => onSelectQuantity?.(tier.qty)}
                      className={cn(
                        "relative flex flex-col justify-between rounded-xl border-2 p-3 text-left transition-all cursor-pointer",
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border bg-card hover:border-primary/40"
                      )}
                    >
                      {tier.best && (
                        <span className="absolute -top-2.5 right-2 rounded-full bg-forest px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cream shadow-sm">
                          Best Value
                        </span>
                      )}
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-foreground text-sm">
                            {tier.label}
                          </span>
                          {isSelected && (
                            <Check className="h-4 w-4 text-primary shrink-0" />
                          )}
                        </div>
                        <div className="mt-1 flex items-baseline gap-1.5">
                          <span className="text-base font-extrabold text-foreground">
                            Rs. {tier.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground line-through">
                            Rs. {tier.originalPrice.toLocaleString()}
                          </span>
                        </div>
                        <span className="inline-block mt-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          {tier.discountLabel}
                        </span>
                      </div>
                      {tier.perk && (
                        <div className="mt-2 flex items-center gap-1 border-t border-border/60 pt-1.5 text-[11px] text-muted-foreground">
                          <Gift className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                          <span className="truncate">{tier.perk}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-4 xs:mt-5 sm:mt-6">
            <div className="space-y-3 xs:space-y-4 sm:space-y-6 text-sm xs:text-base text-muted-foreground leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>

          <div className="mt-6 xs:mt-7 sm:mt-8 lg:mt-10 space-y-3 xs:space-y-4">
            <div
              className={
                hasItemsInCart
                  ? "flex flex-col xs:grid xs:grid-cols-2 gap-3 xs:gap-4"
                  : "w-full"
              }
            >
              <div className={!hasItemsInCart ? "w-full" : ""}>
                {!isInCart ? (
                  <Button
                    onClick={onAddToCart}
                    className="w-full h-10 xs:h-11 sm:h-12 text-sm xs:text-base font-medium cursor-pointer"
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
                      className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 flex-shrink-0 cursor-pointer"
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
                      className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 flex-shrink-0 cursor-pointer"
                    >
                      <Plus className="h-3 w-3 xs:h-4 xs:w-4" />
                    </Button>
                  </div>
                )}
              </div>
              {hasItemsInCart && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="secondary"
                      className="w-full h-10 xs:h-11 sm:h-12 text-sm xs:text-base font-medium cursor-pointer"
                    >
                      <ShoppingCartIcon className="w-4 h-4 xs:w-5 xs:h-5 mr-2" />
                      Checkout
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[280px] xs:w-[300px] sm:w-[400px] lg:w-[540px] p-3 xs:p-4 sm:p-6">
                    <ProductCart />
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};