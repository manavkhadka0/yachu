import { ShoppingCartIcon, Plus, Minus, Gift } from "lucide-react";
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
  cartCount?: number;
  isInCart: boolean;
  onAddToCart: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onSelectQuantity?: (qty: number) => void;
}

export const ProductInfoSection = ({
  product,
  quantity,
  cartCount = 0,
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
      <Card className="border border-border bg-card shadow-none rounded-2xl">
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
                <span className="rounded-lg bg-yellow-cta px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-forest">
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

          {/* Dashain Special Packs (for products that have pack tiers) */}
          {pack && pack.tiers.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select Pack Offer
                </span>
                <span className="text-xs text-primary font-semibold">
                  Dashain Dhamaka Deals
                </span>
              </div>

              <div className="space-y-2.5">
                {pack.tiers.map((tier) => {
                  const isSelected = quantity === tier.qty;
                  return (
                    <button
                      key={tier.qty}
                      type="button"
                      onClick={() => onSelectQuantity?.(tier.qty)}
                      className={cn(
                        "relative w-full text-left rounded-xl border-2 p-3.5 transition-all cursor-pointer",
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-border bg-background hover:border-primary/40 hover:bg-muted/30"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Radio circle indicator */}
                          <div
                            className={cn(
                              "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground/40 bg-transparent"
                            )}
                          >
                            {isSelected && (
                              <div className="h-2 w-2 rounded-full bg-white" />
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-base text-foreground">
                              {tier.label}
                            </span>
                            {tier.best && (
                              <span className="rounded-full bg-forest px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cream">
                                Best Value
                              </span>
                            )}
                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                              Save {tier.discountLabel}
                            </span>
                          </div>
                        </div>

                        {/* Price summary */}
                        <div className="text-right shrink-0">
                          <div className="flex items-baseline justify-end gap-1.5">
                            <span className="text-lg font-extrabold text-foreground">
                              Rs. {tier.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground line-through">
                              Rs. {tier.originalPrice.toLocaleString()}
                            </span>
                          </div>
                          {tier.qty > 1 && (
                            <span className="text-[11px] text-muted-foreground block">
                              Rs. {tier.perPcs.toLocaleString()} / bottle
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Perk / Gift clearly displayed without truncation */}
                      {tier.perk && (
                        <div className="mt-2.5 ml-7 flex items-center gap-1.5 rounded-lg bg-amber-50/90 dark:bg-amber-950/30 px-3 py-1.5 text-xs text-amber-900 dark:text-amber-200 border border-amber-200/60 dark:border-amber-900/60">
                          <Gift className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                          <span className="font-medium">
                            <strong className="font-bold">Includes:</strong>{" "}
                            {tier.perk}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-5 sm:mt-6">
            <div className="space-y-3 xs:space-y-4 text-sm xs:text-base text-muted-foreground leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>

          <div className="mt-6 xs:mt-7 sm:mt-8 lg:mt-10 space-y-3">
            {cartCount > 0 && (
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200/60 dark:border-emerald-900/60 w-fit">
                <span className="font-bold">✓ In your cart:</span> {cartCount} {cartCount === 1 ? "bottle" : "bottles"}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Quantity selector */}
              <div className="flex items-center justify-between sm:justify-center gap-2 p-1 border border-border rounded-xl bg-muted/40 shrink-0 h-11 sm:h-12 px-2">
                <span className="text-xs text-muted-foreground sm:hidden font-medium pl-2">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={onDecrease}
                    variant="ghost"
                    size="icon"
                    disabled={quantity <= 1}
                    className="h-8 w-8 rounded-lg flex-shrink-0 cursor-pointer disabled:opacity-30"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-8 text-center font-bold text-base text-foreground tabular-nums">
                    {quantity}
                  </span>
                  <Button
                    type="button"
                    onClick={onIncrease}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg flex-shrink-0 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart button */}
              <Button
                type="button"
                onClick={onAddToCart}
                className="flex-1 h-11 sm:h-12 text-sm xs:text-base font-semibold cursor-pointer shadow-none"
              >
                <ShoppingCartIcon className="w-4 h-4 mr-2" />
                Add {quantity} to Cart
              </Button>

              {/* Checkout / View Cart button */}
              {hasItemsInCart && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      className="h-11 sm:h-12 px-5 text-sm xs:text-base font-semibold cursor-pointer shadow-none whitespace-nowrap"
                    >
                      <ShoppingCartIcon className="w-4 h-4 mr-2" />
                      Checkout
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[280px] xs:w-[300px] sm:w-[400px] lg:w-[540px] p-3 xs:p-4 sm:p-6 shadow-none">
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