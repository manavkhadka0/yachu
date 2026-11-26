"use client";

import { CartItem, TProduct } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { newCart } from "@/services/lib/utils";
import useProductCart from "@/store/zustand";
import { useState } from "react";
import { CheckoutModal } from "../popover/CheckoutModal";
import { DASHAIN_UNIT_PRICE } from "@/constants/offers";
import posthog from "posthog-js";
import { toast } from "sonner";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, slug, title, price, image1 } = product;
  const [openCheckoutForm, setOpenCheckoutForm] = useState(false);

  // Dashain price, when this product has one
  const offerPrice = DASHAIN_UNIT_PRICE[slug];
  const hasOffer = offerPrice !== undefined && offerPrice < price;
  const finalPrice = hasOffer ? offerPrice : price;
  const discountPct = hasOffer
    ? Math.round(((price - offerPrice) / price) * 100)
    : 0;

  const handleAddToCart = () => {
    const { cart, addToCart } = useProductCart.getState();
    const isInCart = cart.some((item) => String(item.product.id) === String(id));
    const cartItem: CartItem = {
      product: { ...product, price: finalPrice },
      count: 1,
    };
    const updatedCart = newCart(cartItem, [...cart]);
    addToCart(updatedCart);

    const quantity = updatedCart.find(
      (item) => String(item.product.id) === String(id)
    )!.count;
    toast.success(`${title} added to cart`, {
      id: `cart-${id}`,
      description: `${quantity} ${quantity === 1 ? "item" : "items"} in your cart`,
    });

    posthog.capture("add_to_cart", {
      product_id: id,
      product_title: title,
      product_slug: slug,
      product_price: finalPrice,
      quantity: 1,
      is_already_in_cart: isInCart,
    });
  };

  const handleOrderNow = () => {
    const { cart } = useProductCart.getState();
    if (!cart.some((item) => String(item.product.id) === String(id))) {
      handleAddToCart();
    }
    setOpenCheckoutForm(true);
  };

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all hover:shadow-2xl">
      {hasOffer && (
        <span className="absolute left-3 top-3 z-10 rounded-lg bg-yellow-cta px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-forest shadow-md">
          {discountPct}% off
        </span>
      )}

      <Link
        href={`/products/${slug}`}
        className="relative block aspect-square overflow-hidden bg-cream"
      >
        <Image
          height={500}
          width={500}
          sizes="(max-width: 1024px) 50vw, 320px"
          className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105 sm:p-6"
          src={image1}
          alt={title}
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-5 lg:p-3 xl:p-4">
        <h3 className="line-clamp-2 break-words font-display text-lg leading-tight text-forest sm:text-2xl">
          <Link href={`/products/${slug}`}>{title}</Link>
        </h3>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 sm:mt-3">
          <span className="text-base font-bold text-foreground sm:text-xl">
            Rs. {finalPrice.toLocaleString()}
          </span>
          {hasOffer && (
            <span className="text-xs text-foreground/50 sm:text-sm line-through">
              Rs. {price.toLocaleString()}
            </span>
          )}
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2 pt-4 lg:grid-cols-2 sm:pt-5">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex min-h-11 min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-yellow-cta px-2 py-3 text-[10px] sm:px-3 sm:py-4 sm:text-[11px] lg:px-2 lg:text-[10px] xl:text-[11px] font-bold uppercase tracking-wide text-[oklch(0.2_0.04_55)] transition-all hover:brightness-95"
          >
            <ShoppingCart className="h-4 w-4 shrink-0 lg:h-3.5 lg:w-3.5" />
            <span>Add to Cart</span>
          </button>
          <button
            type="button"
            onClick={handleOrderNow}
            className="flex min-h-11 min-w-0 cursor-pointer items-center justify-center rounded-xl border border-border px-2 py-3 text-[10px] sm:px-3 sm:py-4 sm:text-[11px] lg:px-2 lg:text-[10px] xl:text-[11px] font-bold uppercase tracking-wide text-forest transition-all hover:bg-muted"
          >
            Order Now
          </button>
        </div>
      </div>

      <CheckoutModal
        isOpen={openCheckoutForm}
        setIsOpen={setOpenCheckoutForm}
      />
    </article>
  );
};

export default ProductCard;
