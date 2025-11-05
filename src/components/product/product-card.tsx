"use client";

import { CartItem, TProduct } from "@/types/product";
import { ShoppingCart, ExternalLink, ShoppingBag, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { newCart } from "@/services/lib/utils";
import { toast } from "sonner";
import useProductCart from "@/store/zustand";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, slug, title, description, price, image1 } = product;
  const { cart, addToCart  } = useProductCart();

  const cartItem = cart.find((item) => item.product.id === id);
  const isInCart = !!cartItem;
  const quantity = cartItem?.count || 0;

  const handleAddToCart = () => {
    if (!product) return;
    const cartItem: CartItem = {
      product: product,
      count: 1,
    };
    const updatedCart = newCart(cartItem, cart);
    addToCart(updatedCart);
    toast.success("Product added to cart!");
  };

  const handleIncrement = () => {
    if (cartItem) {
      const updatedCart = cart.map((item) =>
        item.product.id === id
          ? { ...item, count: item.count + 1 }
          : item
      );
      addToCart(updatedCart);
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      if (cartItem.count > 1) {
        const updatedCart = cart.map((item) =>
          item.product.id === id
            ? { ...item, count: item.count - 1 }
            : item
        );
        addToCart(updatedCart);
      } else {
        const updatedCart = cart.filter((item) => item.product.id !== id);
        addToCart(updatedCart);
        toast.info("Product removed from cart");
      }
    }
  };

  const handleViewCart = () => {
    // Trigger the cart button click to open the sheet
    const cartButton = document.querySelector('[data-cart-trigger]');
    if (cartButton instanceof HTMLElement) {
      cartButton.click();
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-500 hover:shadow-lg group relative">
      <div className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 z-[1]">
        <Badge variant="default" className="bg-primary text-primary-foreground">
          In Stock
        </Badge>
      </div>

      <Link href={`/products/${slug}`} className="relative overflow-hidden">
        <div className="flex-shrink-0 w-full h-48 xs:h-56 sm:h-64 lg:h-80 overflow-hidden bg-muted">
          <Image
            height={300}
            width={300}
            className="object-contain w-full h-full p-4 xs:p-6 sm:p-8 transition-transform duration-500 group-hover:scale-110"
            src={image1}
            alt={title}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <CardHeader className="">
        <div className="flex flex-col gap-1 xs:gap-2">
          <CardTitle className="text-sm xs:text-base sm:text-lg line-clamp-2 leading-tight">
            <Link
              href={`/products/${slug}`}
              className="hover:text-primary transition-colors duration-200"
            >
              {title}
            </Link>
          </CardTitle>
          <p className="text-lg xs:text-xl sm:text-2xl font-bold text-primary">
            Rs. {price.toLocaleString()}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        {/* <CardDescription
          className="text-xs xs:text-sm line-clamp-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        /> */}
      </CardContent>

      <CardFooter>
        <div className="w-full space-y-2 xs:space-y-3">
          {isInCart ? (
            <div className="space-y-2 xs:space-y-3">
              <div className="grid grid-cols-2 gap-2 xs:gap-3">
                {/* Quantity Control */}
                <div className="flex items-center justify-between bg-muted rounded-md p-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 xs:h-7 xs:w-7 hover:bg-background"
                    onClick={handleDecrement}
                  >
                    <Minus className="h-3 w-3 xs:h-4 xs:w-4" />
                  </Button>
                  <span className="text-sm xs:text-base font-semibold px-2">
                    {quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 xs:h-7 xs:w-7 hover:bg-background"
                    onClick={handleIncrement}
                  >
                    <Plus className="h-3 w-3 xs:h-4 xs:w-4" />
                  </Button>
                </div>

                {/* View Details Button */}
                <Link href={`/products/${slug}`} className="flex-1">
                  <Button
                    className="w-full shadow-sm transition-all duration-300 hover:shadow-md text-xs xs:text-sm h-8 xs:h-9 sm:h-10"
                    variant="outline"
                  >
                    <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                    <span className="hidden xs:inline">View Details</span>
                    <span className="xs:hidden">View</span>
                  </Button>
                </Link>
              </div>

              {/* View Cart Button */}
              <Button
                className="w-full shadow-sm transition-all duration-300 hover:shadow-md text-xs xs:text-sm h-8 xs:h-9 sm:h-10"
                variant="default"
                onClick={handleViewCart}
              >
                <ShoppingBag className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                <span className="hidden xs:inline">View Cart</span>
                <span className="xs:hidden">View Cart</span>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 xs:gap-3">
              <Button
                className="shadow-sm transition-all duration-300 hover:shadow-md text-xs xs:text-sm h-8 xs:h-9 sm:h-10"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                <span className="hidden xs:inline">Add to Cart</span>
                <span className="xs:hidden">Add</span>
              </Button>
              <Link href={`/products/${slug}`} className="flex-1">
                <Button
                  className="w-full shadow-sm transition-all duration-300 hover:shadow-md text-xs xs:text-sm h-8 xs:h-9 sm:h-10"
                  variant="outline"
                >
                  <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                  <span className="hidden xs:inline">View Details</span>
                  <span className="xs:hidden">View</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;