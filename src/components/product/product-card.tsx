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

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, slug, title, price, image1 } = product;
  const { cart, addToCart } = useProductCart();
  const [openCheckoutForm, setOpenCheckoutForm] = useState(false);

  const isInCart = cart.some((item) => item.product.id === id);

  // Dashain price, when this product has one
  const offerPrice = DASHAIN_UNIT_PRICE[slug];
  const hasOffer = offerPrice !== undefined && offerPrice < price;
  const finalPrice = hasOffer ? offerPrice : price;
  const discountPct = hasOffer
    ? Math.round(((price - offerPrice) / price) * 100)
    : 0;

  const handleOrderNow = () => {
    if (!isInCart) {
      const cartItem: CartItem = {
        product: { ...product, price: finalPrice },
        count: 1,
      };
      addToCart(newCart(cartItem, [...cart]));

      // Track add to cart event with PostHog
      posthog.capture("add_to_cart", {
        product_id: id,
        product_title: title,
        product_slug: slug,
        product_price: finalPrice,
        quantity: 1,
        is_already_in_cart: isInCart,
      });
    }
    setOpenCheckoutForm(true);
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all hover:shadow-2xl">
      {hasOffer && (
        <span className="absolute left-3 top-3 z-10 rounded-lg bg-yellow-cta px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-forest shadow-md">
          Dashain {discountPct}% off
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

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 font-display text-xl leading-tight text-forest sm:text-2xl">
          <Link href={`/products/${slug}`}>{title}</Link>
        </h3>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
          <span className="text-xl font-bold text-foreground">
            Rs. {finalPrice.toLocaleString()}
          </span>
          {hasOffer && (
            <span className="text-sm text-foreground/50 line-through">
              Rs. {price.toLocaleString()}
            </span>
          )}
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2 pt-4 sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            onClick={handleOrderNow}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-yellow-cta py-3.5 text-xs font-bold uppercase tracking-widest text-[oklch(0.2_0.04_55)] transition-all hover:brightness-95"
          >
            <ShoppingCart className="h-4 w-4" /> Order Now
          </button>
          <Link
            href={`/products/${slug}`}
            className="flex items-center justify-center rounded-xl border border-border py-3.5 text-xs font-bold uppercase tracking-widest text-forest transition-all hover:bg-muted"
          >
            Details
          </Link>
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
