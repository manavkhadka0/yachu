"use client";

import { calculateTotalPrice } from "@/services/lib/utils";
import useProductCart from "@/store/zustand";
import { Button } from "../ui/button";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { CheckoutModal } from "../popover/CheckoutModal";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import Link from "next/link";

interface ProductCartProps {
  onCloseSheet?: () => void;
}

// Bulk pricing configuration for oil products
const BULK_PRICING = {
  3: { pricePerUnit: 2200, label: "3 pcs oil - Rs.2200" },
  6: { pricePerUnit: 2150, label: "6 pcs oil - Rs.2150" },
  12: { pricePerUnit: 2050, label: "12 pcs oil - Rs.2050" }
};

// Define oil product slugs that qualify for bulk pricing
const OIL_PRODUCT_SLUGS = ["hairfall-case", "dandruff-case", "baldness-case"];

const ProductCart = ({ onCloseSheet }: ProductCartProps) => {
  const { cart, increaseCount, decreaseCount, removeItem } = useProductCart();
  const [openCheckoutForm, setOpenCheckoutForm] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState<
    "inside" | "outside"
  >("inside");

  // Calculate total oil quantity for bulk pricing
  const totalOilQuantity = cart.reduce((total, { product, count }) => {
    if (OIL_PRODUCT_SLUGS.includes(product.slug)) {
      return total + count;
    }
    return total;
  }, 0);

  // Determine which bulk pricing tier applies
  const getBulkPricingTier = (totalQuantity: number) => {
    if (totalQuantity >= 12) return BULK_PRICING[12];
    if (totalQuantity >= 6) return BULK_PRICING[6];
    if (totalQuantity >= 3) return BULK_PRICING[3];
    return null;
  };

  const bulkPricingTier = getBulkPricingTier(totalOilQuantity);

  // Calculate total price with bulk pricing logic
  const calculateCartTotal = () => {
    let total = 0;
    
    cart.forEach(({ product, count }) => {
      if (OIL_PRODUCT_SLUGS.includes(product.slug) && bulkPricingTier) {
        // Apply bulk pricing for oil products
        total += count * bulkPricingTier.pricePerUnit;
      } else {
        // Regular pricing for non-oil products or when bulk pricing doesn't apply
        total += count * product.price;
      }
    });
    
    return total;
  };

  const totalPrice = calculateCartTotal();
  const shippingCharge = deliveryLocation === "inside" ? 100 : 150;
  const finalTotal = totalPrice + shippingCharge;

  // Calculate savings from bulk pricing
  const calculateSavings = () => {
    if (!bulkPricingTier || totalOilQuantity === 0) return 0;
    
    const regularTotal = cart.reduce((total, { product, count }) => {
      if (OIL_PRODUCT_SLUGS.includes(product.slug)) {
        return total + (count * product.price);
      }
      return total;
    }, 0);
    
    const bulkTotal = cart.reduce((total, { product, count }) => {
      if (OIL_PRODUCT_SLUGS.includes(product.slug)) {
        return total + (count * bulkPricingTier.pricePerUnit);
      }
      return total;
    }, 0);
    
    return regularTotal - bulkTotal;
  };

  const savings = calculateSavings();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warning("Cart is empty!", {
        description: "Please add items to cart first.",
      });
      return;
    }
    setOpenCheckoutForm(true);
  };

  return (
    <div className="flex flex-col h-full max-h-screen bg-background">
      {/* Header with Badge - Optimized for mobile */}
      <div className="flex items-center justify-between p-3 sm:p-4 py-4 sm:py-8 bg-card border-b border-border flex-shrink-0 mt-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
          <h2 className="text-sm sm:text-lg font-semibold text-foreground">
            Shopping Cart
          </h2>
        </div>
        <Badge
          variant="secondary"
          className="text-secondary-foreground font-medium text-xs sm:text-sm px-2 py-1"
        >
          {cart.length} item{cart.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 sm:gap-4 py-8 sm:py-12 px-3 sm:px-4">
          <div className="rounded-full bg-muted p-4 sm:p-6 ">
            <ShoppingBag className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground" />
          </div>
          <div className="text-center space-y-1 sm:space-y-2">
            <h3 className="text-base sm:text-lg font-medium text-foreground">
              Your cart is empty
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Add some items to get started
            </p>
          </div>
          <Button variant="outline" onClick={onCloseSheet} className="mt-2 sm:mt-4 text-sm">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Scrollable Items Area - Optimized for mobile */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-2 sm:p-4 space-y-3 sm:space-y-4">
                <AnimatePresence>
                  {cart.map(({ product, count }) => {
                    const isOilProduct = OIL_PRODUCT_SLUGS.includes(product.slug);
                    const effectivePrice = isOilProduct && bulkPricingTier 
                      ? bulkPricingTier.pricePerUnit 
                      : product.price;

                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="relative bg-card border-border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-card hover:bg-destructive hover:text-destructive-foreground border border-border z-10"
                            onClick={() => removeItem(product.id)}
                          >
                            <X className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>

                          <CardContent className="flex gap-2 sm:gap-4 p-2 sm:p-4">
                            {/* Product Image - Responsive sizing */}
                            <div className="flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-lg border border-border">
                              <img
                                src={product.image1}
                                alt={product.title}
                                width="80"
                                height="80"
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            {/* Product Details - Better mobile layout */}
                            <div className="flex flex-1 flex-col justify-between min-w-0">
                              <div>
                                <h3 className="font-medium text-foreground text-xs sm:text-base mb-1 leading-tight">
                                  <span className="block sm:inline">{product.title}</span>
                                  {isOilProduct && bulkPricingTier && (
                                    <Badge variant="outline" className="mt-1 sm:mt-0 sm:ml-2 text-xs px-1 py-0">
                                      Bulk
                                    </Badge>
                                  )}
                                </h3>
                                <div className="space-y-1">
                                  {isOilProduct && bulkPricingTier && effectivePrice !== product.price ? (
                                    <div className="flex items-center gap-1 sm:gap-2">
                                      <p className="text-muted-foreground text-xs sm:text-sm line-through">
                                        Rs. {product.price}
                                      </p>
                                      <p className="text-primary text-xs sm:text-sm font-medium">
                                        Rs. {effectivePrice}
                                      </p>
                                    </div>
                                  ) : (
                                    <p className="text-muted-foreground text-xs sm:text-sm">
                                      Rs. {product.price}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Quantity Controls - Compact mobile version */}
                              <div className="flex items-center gap-2 sm:gap-3 mt-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex-shrink-0"
                                  onClick={() => decreaseCount(product.id)}
                                >
                                  <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                </Button>
                                <span className="w-6 sm:w-8 text-center font-medium text-foreground flex-shrink-0 text-xs sm:text-sm">
                                  {count}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex-shrink-0"
                                  onClick={() => increaseCount(product.id)}
                                >
                                  <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </div>

          {/* Bulk Pricing Information - Mobile responsive grid */}
          <div className="grid grid-cols-3 xs:grid-cols-3 gap-1 sm:gap-2 bg-card border-t border-border  p-2 text-gray-700">
            <div className="text-center xs:text-left">3 pcs oil Rs.2200</div>
            <div className="text-center xs:text-left">6 pcs oil Rs.2150</div>
            <div className="text-center xs:text-left">12 pcs oil Rs.2050</div>
          </div>

          {/* Active Bulk Pricing Notification - Mobile optimized */}
          {totalOilQuantity > 0 && bulkPricingTier && (
            <div className="border-t border-border p-2 sm:p-4 bg-green-50">
              {savings > 0 && (
                <p className="text-xs text-center sm:text-left text-gray-600">
                  You&apos;re saving <span className="font-bold text-green-600">Rs. {savings}</span> with bulk pricing!
                </p>
              )}
            </div>
          )}

          {/* Summary Section - Mobile optimized spacing */}
          <div className="flex-shrink-0 border-t border-border">
            <Card className="rounded-none bg-card border-0">
              <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                <div className="space-y-2 sm:space-y-3">
                  
                  {/* Subtotal Row */}
                  <div className="flex justify-between text-xs sm:text-sm">
                    <Label className="text-muted-foreground font-normal">
                      Subtotal
                    </Label>
                    <span className="font-medium text-foreground">
                      Rs. {totalPrice}
                    </span>
                  </div>

                  {/* Delivery Location Row - Mobile responsive */}
                  <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2 xs:gap-0">
                    <Label className="text-muted-foreground font-normal text-xs sm:text-sm">
                      Delivery Location
                    </Label>
                    <Select
                      value={deliveryLocation}
                      onValueChange={(value: "inside" | "outside") =>
                        setDeliveryLocation(value)
                      }
                    >
                      <SelectTrigger className="w-full xs:w-[120px] sm:w-[140px] h-8 sm:h-9 text-xs sm:text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inside" className="text-xs sm:text-sm">
                          Inside Valley
                        </SelectItem>
                        <SelectItem value="outside" className="text-xs sm:text-sm">
                          Outside Valley
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Shipping Row */}
                  <div className="flex justify-between text-xs sm:text-sm">
                    <Label className="text-muted-foreground font-normal">
                      Shipping
                    </Label>
                    <Badge
                      variant="secondary"
                      className="text-secondary-foreground text-xs px-2 py-0.5"
                    >
                      Rs. {shippingCharge}
                    </Badge>
                  </div>

                  <Separator className="my-2 sm:my-3" />

                  {/* Total Row - Mobile responsive */}
                  <div className="flex justify-between items-center">
                    <Label className="font-medium text-foreground text-sm sm:text-base">Total</Label>
                    <Badge variant="default" className="text-sm sm:text-base px-2 sm:px-3 py-1 font-bold">
                      Rs. {finalTotal}
                    </Badge>
                  </div>
                </div>

                {/* Checkout Button - Mobile optimized */}
                <Button
                  className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
                  onClick={handleCheckout}
                >
                  <span className="hidden xs:inline">Proceed to </span>Checkout
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      <CheckoutModal
        isOpen={openCheckoutForm}
        setIsOpen={setOpenCheckoutForm}
      />
    </div>
  );
};

export default ProductCart;