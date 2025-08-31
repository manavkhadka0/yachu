"use client";

import { CartItem, TProduct } from "@/types/product";
import { ShoppingCartIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { newCart } from "@/services/lib/utils";
import { toast } from "sonner";
import useProductCart from "@/store/zustand";
import { useState } from "react";
import { CheckoutModal } from "../popover/CheckoutModal";
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
  const { id,slug, title, description, price, image1 } = product;
  const { cart, addToCart } = useProductCart();
  const [openCheckoutForm, setOpenCheckoutForm] = useState(false);

  const isInCart = cart.some((item) => item.product.id === id);

  const handleAddToCart = () => {
    if (!product) return;
    const cartItem: CartItem = {
      product: product,
      count: 1,
    };
    const updatedCart = newCart(cartItem, cart);
    addToCart(updatedCart);
    toast.success("Product added to cart. Checkout now!");
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
                <Button
                  className="shadow-sm transition-all duration-300 hover:shadow-md text-xs xs:text-sm h-8 xs:h-9 sm:h-10"
                  onClick={handleAddToCart}
                >
                  <ShoppingCartIcon className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                  <span className="hidden xs:inline">Add More</span>
                  <span className="xs:hidden">Add</span>
                </Button>
                <Link href={`/products/${slug}`} className="flex-1">
                  <Button
                    className="w-full shadow-sm transition-all duration-300 hover:shadow-md hov text-xs xs:text-sm h-8 xs:h-9 sm:h-10"
                    variant="outline"
                  >
                    <ExternalLinkIcon className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                    <span className="hidden xs:inline">View Details</span>
                    <span className="xs:hidden">View</span>
                  </Button>
                </Link>
              </div>
              <Button
                className="w-full shadow-sm transition-all duration-300 hover:shadow-md text-xs xs:text-sm h-8 xs:h-9 sm:h-10"
                onClick={() => setOpenCheckoutForm(true)}
              >
                <span className="hidden xs:inline">Proceed to Checkout</span>
                <span className="xs:hidden">Checkout</span>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 xs:gap-3">
              <Button
                className="shadow-sm transition-all duration-300 hover:shadow-md text-xs xs:text-sm h-8 xs:h-9 sm:h-10"
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                <span className="hidden xs:inline">Add to Cart</span>
                <span className="xs:hidden">Add</span>
              </Button>
              <Link href={`/products/${slug}`} className="flex-1">
                <Button
                  className="w-full shadow-sm transition-all duration-300 hover:shadow-md text-xs xs:text-sm h-8 xs:h-9 sm:h-10"
                  variant="outline"
                >
                  <ExternalLinkIcon className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                  <span className="hidden xs:inline">View Details</span>
                  <span className="xs:hidden">View</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardFooter>

      <CheckoutModal
        isOpen={openCheckoutForm}
        setIsOpen={setOpenCheckoutForm}
      />
    </Card>
  );
};

export default ProductCard;
