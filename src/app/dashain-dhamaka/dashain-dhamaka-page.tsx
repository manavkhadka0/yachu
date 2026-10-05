"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  ChevronRight,
  Gift,
  PackageCheck,
  Phone,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react";
import posthog from "posthog-js";
import BeforeAfter from "@/components/home/BeforeAfter";
import PackPicker from "@/components/home/PackPicker";
import SectionHeading from "@/components/home/SectionHeading";
import TikaJamara from "@/components/shared/TikaJamara";
import FAQ from "@/components/contact/FAQ";
import CheckoutForm from "@/components/product/CheckoutForm";
import { useProducts } from "@/hooks/use-products";
import useProductCart from "@/store/zustand";
import { DASHAIN_PACKS } from "@/constants/offers";
import {
  chibekoAddress,
  chibekoRegistrationNo,
  chibekoVatNo,
  yachuPhone,
} from "@/constants/constant";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    Icon: ShoppingBag,
    title: "Order",
    body: "Pick your pack and fill in three details. Pay in cash on delivery.",
  },
  {
    Icon: PackageCheck,
    title: "Receive",
    body: "Your Yachu arrives with a Scratch & Win card for every bottle.",
  },
  {
    Icon: Gift,
    title: "Scratch & win",
    body: "Scratch the card to see your prize. Bumper prize: an Electric Scooter.",
  },
];

const TRUST = [
  { Icon: Banknote, label: "Cash on Delivery" },
  { Icon: Truck, label: "Delivery all over Nepal" },
  { Icon: Users, label: "50K+ customers" },
];

const telHref = `tel:${yachuPhone.replace(/\s/g, "")}`;

export default function DashainDhamakaPage() {
  const { data: products, isLoading } = useProducts();
  const { cart, addToCart } = useProductCart();
  const [productIndex, setProductIndex] = useState(0);
  const [orderInView, setOrderInView] = useState(false);
  const orderRef = useRef<HTMLElement>(null);
  const seeded = useRef(false);

  const pack = DASHAIN_PACKS[productIndex];
  const product = products?.find((p) => p.slug === pack.slug);

  // The order form works off the cart, so the picker reads its selection back
  // from the cart (the form's own quantity buttons stay in sync that way)
  const cartItem = cart.find((item) => item.product.slug === pack.slug);
  const tierIndex = Math.max(
    0,
    pack.tiers.findLastIndex((t) => (cartItem?.count ?? 1) >= t.qty)
  );
  const tier = pack.tiers[tierIndex];

  const choose = (nextProductIndex: number, nextTierIndex: number) => {
    const nextPack = DASHAIN_PACKS[nextProductIndex];
    const nextProduct = products?.find((p) => p.slug === nextPack.slug);
    if (!nextProduct) return;
    const nextTier = nextPack.tiers[nextTierIndex];
    setProductIndex(nextProductIndex);
    // This page sells one thing at a time: the cart is exactly the chosen pack
    addToCart([
      {
        product: { ...nextProduct, price: nextTier.perPcs },
        count: nextTier.qty,
      },
    ]);
  };

  // Start with one bottle of hair oil ready to order
  useEffect(() => {
    if (seeded.current || !products?.length) return;
    seeded.current = true;
    choose(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    const el = orderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOrderInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goToOrder = (source: string) => {
    posthog.capture("dashain_landing_cta_clicked", { source });
    orderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Slim top bar: no menu, so nothing pulls people away from ordering */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2">
          <Link href="/" aria-label="Yachu Hair Oil home">
            <img
              src="/yachuoil.webp"
              alt="Yachu Hair Oil"
              width={56}
              height={56}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <a
            href={telHref}
            className="flex h-11 items-center gap-2 rounded-full border-2 border-forest/20 px-4 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
          >
            <Phone className="h-4 w-4" />
            {yachuPhone}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest to-[oklch(0.22_0.06_150)]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-12 pt-8 md:grid-cols-2 md:gap-12 md:pb-20 md:pt-16">
          <div>
            <p className="flex items-end gap-2 font-script text-3xl text-gold">
              <TikaJamara className="h-12 w-10 shrink-0" />
              Dashain Dhamaka
            </p>
            <h1 className="mt-2 text-balance text-4xl leading-[1.08] text-cream sm:text-5xl md:text-6xl">
              Buy Yachu Hair Oil. Win an Electric Scooter.
            </h1>
            <p className="mt-4 max-w-md text-base text-cream/80 md:text-lg">
              Every bottle comes with a Scratch &amp; Win card. Up to 16% off
              this Dashain.
            </p>

            <button
              type="button"
              onClick={() => goToOrder("hero")}
              className="group mt-6 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-yellow-cta px-8 text-lg font-bold tracking-wide text-[oklch(0.2_0.04_55)] shadow-xl transition-all hover:brightness-95 md:w-auto"
            >
              Order Now · Rs. {pack.tiers[0].price.toLocaleString()}
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-cream/85">
              {TRUST.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-gold" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => goToOrder("hero_image")}
            aria-label="Order now and get a Scratch & Win card"
            className="block cursor-pointer overflow-hidden rounded-3xl border-2 border-gold/30 shadow-2xl"
          >
            <Image
              src="/dashain.png"
              alt="Yachu Dashain Dhamaka: Scratch and Win, bumper prize scooter"
              width={1050}
              height={600}
              priority
              sizes="(max-width: 768px) 100vw, 560px"
              className="h-auto w-full"
            />
          </button>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Easy as 1, 2, 3"
            title="How it works"
            className="mb-8 md:mb-12"
          />
          <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
            {STEPS.map(({ Icon, title, body }, index) => (
              <li
                key={title}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 md:flex-col md:p-7"
              >
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-forest/10 text-forest">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </span>
                <div>
                  <h3 className="text-xl text-forest md:text-2xl">{title}</h3>
                  <p className="mt-1 leading-relaxed text-foreground/70">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Order: pick a pack, fill the form, done */}
      <section
        id="order"
        ref={orderRef}
        className="scroll-mt-16 bg-cream py-14 md:py-20"
      >
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Takes less than a minute"
            title="Place your order"
            className="mb-8 md:mb-12"
          />

          <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="min-w-0">
              <h3 className="mb-3 text-xl text-forest">1. Choose your pack</h3>
              <div
                role="tablist"
                aria-label="Product"
                className="grid grid-cols-2 gap-1 rounded-full bg-forest/10 p-1"
              >
                {DASHAIN_PACKS.map((item, index) => {
                  const active = index === productIndex;
                  const image = products?.find(
                    (p) => p.slug === item.slug
                  )?.image1;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => choose(index, 0)}
                      className={cn(
                        "flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all",
                        active
                          ? "bg-forest text-cream shadow"
                          : "text-forest hover:bg-forest/10"
                      )}
                    >
                      {image && (
                        <span className="relative h-7 w-7 overflow-hidden rounded-full bg-white">
                          <Image
                            src={image}
                            alt=""
                            fill
                            sizes="28px"
                            className="object-contain"
                          />
                        </span>
                      )}
                      {item.name}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3">
                <PackPicker
                  tiers={pack.tiers}
                  selected={tierIndex}
                  onSelect={(index) => choose(productIndex, index)}
                  label={`${pack.name} pack`}
                />
              </div>

              <p className="mt-3 text-xs text-foreground/60">
                Offer valid until Kartik 30. Conditions apply.
              </p>
            </div>

            <div className="min-w-0">
              <h3 className="mb-3 text-xl text-forest">2. Your details</h3>
              <div className="rounded-3xl border border-border bg-background px-5 pt-5 shadow-[0_25px_60px_-35px_oklch(0.32_0.07_150/0.45)] sm:px-7 sm:pt-7">
                {isLoading || (!product && !cart.length && !seeded.current) ? (
                  <div className="space-y-3 pb-6">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-14 animate-pulse rounded-xl bg-muted"
                      />
                    ))}
                  </div>
                ) : (
                  <CheckoutForm />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <BeforeAfter onOrder={goToOrder} />

      {/* Questions */}
      <section className="bg-card pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHeading
            eyebrow="Good questions"
            title="Before you order"
            className="mb-8 md:mb-12"
          />
          <FAQ limit={3} />
        </div>
      </section>

      {/* Who you are buying from */}
      <footer className="mt-auto bg-forest pb-28 pt-8 text-cream/75 md:pb-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            <span className="font-semibold text-cream">
              Chibe Traders Pvt. Ltd.
            </span>{" "}
            · {chibekoAddress}
          </p>
          <p>
            VAT No: {chibekoVatNo} · Reg No: {chibekoRegistrationNo} ·{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy
            </Link>
          </p>
        </div>
      </footer>

      {/* Mobile sticky button, hidden while the order form is on screen */}
      <div
        aria-hidden={orderInView}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 md:hidden",
          orderInView ? "translate-y-full" : "translate-y-0"
        )}
      >
        <button
          type="button"
          tabIndex={orderInView ? -1 : 0}
          onClick={() => goToOrder("sticky_bar")}
          className="flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-yellow-cta text-base font-bold text-[oklch(0.2_0.04_55)]"
        >
          Order Now · Rs. {tier.price.toLocaleString()}
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
