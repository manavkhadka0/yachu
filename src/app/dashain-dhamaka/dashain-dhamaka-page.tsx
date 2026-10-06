"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  ChevronRight,
  Gift,
  MessageCircle,
  PackageCheck,
  Phone,
  Play,
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
import { CheckoutModal } from "@/components/popover/CheckoutModal";
import { useProducts } from "@/hooks/use-products";
import useProductCart from "@/store/zustand";
import { DASHAIN_PACKS } from "@/constants/offers";
import {
  chibekoAddress,
  chibekoRegistrationNo,
  chibekoVatNo,
  yachuPhone,
  yachuWhatsApp,
} from "@/constants/constant";
import { cn } from "@/lib/utils";

/** Sisan Baniya coverage — https://www.youtube.com/watch?v=jfmrT8zuMIw */
const SISAN_VIDEO_ID = "jfmrT8zuMIw";

const dashainWhatsAppUrl = `https://api.whatsapp.com/send?phone=${yachuWhatsApp.replace(
  "+",
  ""
)}&text=${encodeURIComponent(
  "I want to know more about yachu dashain offer"
)}`;

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

function SisanCoverage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="covered-by" className="bg-background py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-3.5 sm:px-5">
        <SectionHeading
          title="Covered by Sisan Baniya"
          size="sm"
          className="mb-5 md:mb-6"
        />

        <div
          ref={containerRef}
          className="relative mx-auto aspect-video max-w-3xl overflow-hidden rounded-2xl border border-border bg-[oklch(0.18_0.04_150)] shadow-lg sm:rounded-3xl"
        >
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${SISAN_VIDEO_ID}?autoplay=1`}
              title="Yachu Hair Oil covered by Sisan Baniya"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              aria-label="Play Sisan Baniya coverage of Yachu"
              onClick={() => {
                posthog.capture("dashain_sisan_video_played");
                setPlaying(true);
              }}
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              {inView && (
                <img
                  src={`https://img.youtube.com/vi/${SISAN_VIDEO_ID}/maxresdefault.jpg`}
                  alt="Sisan Baniya covering Yachu Hair Oil on YouTube"
                  onError={(e) => {
                    // Some videos lack maxres; fall back to sd then hq
                    const img = e.currentTarget;
                    if (img.src.includes("maxresdefault")) {
                      img.src = `https://img.youtube.com/vi/${SISAN_VIDEO_ID}/sddefault.jpg`;
                    } else if (img.src.includes("sddefault")) {
                      img.src = `https://img.youtube.com/vi/${SISAN_VIDEO_ID}/hqdefault.jpg`;
                    }
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream shadow-xl transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
                  <Play className="ml-0.5 h-6 w-6 fill-forest text-forest sm:h-7 sm:w-7" />
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default function DashainDhamakaPage() {
  const { data: products, isLoading } = useProducts();
  const { cart, addToCart } = useProductCart();
  const [productIndex, setProductIndex] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
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
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const openCheckout = (source: string) => {
    posthog.capture("dashain_landing_cta_clicked", { source });
    // Ensure the selected pack is in the cart before opening the sheet
    if (product && pack) {
      choose(productIndex, tierIndex);
    }
    setCheckoutOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Slim top bar: no menu, so nothing pulls people away from ordering */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2">
          <Link href="/" aria-label="Yachu Hair Oil home" className="shrink-0">
            <img
              src="/yachuoil.webp"
              alt="Yachu Hair Oil"
              width={56}
              height={56}
              className="h-10 w-auto object-contain sm:h-12"
            />
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={dashainWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp about the Dashain offer"
              onClick={() =>
                posthog.capture("dashain_landing_cta_clicked", {
                  source: "header_whatsapp",
                })
              }
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#128C7E]/25 bg-[#E8F8F0] px-3 text-xs font-semibold text-[#075E54] transition-colors hover:bg-[#D1F0E1] sm:h-10 sm:px-3.5 sm:text-sm"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-[#25D366] text-[#25D366] sm:h-4 sm:w-4" />
              WhatsApp
            </a>
            <a
              href={telHref}
              aria-label={`Call ${yachuPhone}`}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-forest/20 bg-forest/5 px-3 text-xs font-semibold text-forest transition-colors hover:bg-forest/10 sm:h-10 sm:px-3.5 sm:text-sm"
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Call
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest to-[oklch(0.22_0.06_150)]">
        <div className="mx-auto grid max-w-6xl items-center gap-5 px-3.5 pb-10 pt-6 sm:gap-8 sm:px-5 sm:pb-14 sm:pt-8 md:grid-cols-2 md:gap-12 md:pb-20 md:pt-16">
          <div className="text-center md:text-left">
            <p className="flex items-end justify-center gap-1.5 font-script text-2xl text-gold sm:gap-2 sm:text-3xl md:justify-start">
              <TikaJamara className="h-9 w-8 shrink-0 sm:h-12 sm:w-10" />
              Dashain Dhamaka
            </p>
            <h1 className="mt-1.5 text-balance text-[2.15rem] leading-[1.08] text-cream sm:mt-2 sm:text-5xl md:text-6xl lg:text-7xl">
              Buy Yachu Hair Oil. Win an Electric Scooter.
            </h1>
            <p className="mx-auto mt-2.5 max-w-md text-[13px] leading-relaxed text-cream/80 sm:mt-3 sm:text-sm md:mx-0 md:text-base">
              Every bottle comes with a Scratch &amp; Win card. Up to 16% off
              this Dashain.
            </p>

            <button
              type="button"
              onClick={() => openCheckout("hero")}
              className="group mx-auto mt-5 flex h-12 w-full max-w-sm cursor-pointer items-center justify-center gap-2 rounded-full bg-yellow-cta px-6 text-base font-bold tracking-wide text-[oklch(0.2_0.04_55)] shadow-xl transition-all hover:brightness-95 sm:mt-6 sm:h-14 sm:text-lg md:mx-0 md:w-auto md:max-w-none md:px-8"
            >
              Order Now · Rs. {pack.tiers[0].price.toLocaleString()}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
            </button>

            <ul className="mt-4 flex flex-wrap justify-center gap-x-3.5 gap-y-1.5 text-xs font-medium text-cream/90 sm:mt-5 sm:gap-x-5 sm:gap-y-2 sm:text-sm md:justify-start">
              {TRUST.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-gold sm:h-4 sm:w-4" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => openCheckout("hero_image")}
            aria-label="Order now and get a Scratch & Win card"
            className="block cursor-pointer overflow-hidden rounded-2xl border-2 border-gold/30 shadow-2xl sm:rounded-3xl"
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

      {/* Media trust — Sisan Baniya coverage (once only) */}
      <SisanCoverage />

      {/* Proof — one row, fills available width */}
      <BeforeAfter variant="compact" onOrder={openCheckout} />

      {/* Order: pick a pack → checkout modal (form beside on desktop) */}
      <section
        id="order"
        ref={orderRef}
        className="scroll-mt-14 bg-cream py-10 sm:py-16 md:py-20"
      >
        <div className="mx-auto max-w-6xl px-3.5 sm:px-5">
          <SectionHeading
            title="Place your order"
            size="sm"
            className="mb-6 md:mb-10"
          />

          <div className="mx-auto grid max-w-lg grid-cols-1 items-start gap-6 lg:max-w-none lg:grid-cols-2 lg:gap-10">
            {/* Selection card — one clear job */}
            <div className="min-w-0 rounded-3xl border border-border/70 bg-background p-3.5 shadow-[0_20px_50px_-40px_oklch(0.32_0.07_150/0.5)] sm:p-5">
              <div
                role="tablist"
                aria-label="Product"
                className="grid grid-cols-2 gap-1 rounded-full bg-muted/80 p-1"
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
                        "flex h-12 min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-full px-2 text-sm font-semibold transition-all sm:h-14 sm:gap-2 sm:px-3 sm:text-base",
                        active
                          ? "bg-forest text-cream shadow-sm"
                          : "text-foreground/70 hover:text-forest"
                      )}
                    >
                      {image && (
                        <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full bg-white sm:h-6 sm:w-6">
                          <Image
                            src={image}
                            alt=""
                            fill
                            sizes="24px"
                            className="object-contain"
                          />
                        </span>
                      )}
                      {/* Phones get the short name so both tabs fit side by side */}
                      <span className="min-w-0 truncate">
                        <span className="sm:hidden">
                          {item.name.replace(/^Yachu\s+/, "")}
                        </span>
                        <span className="hidden sm:inline">{item.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3.5">
                <PackPicker
                  tiers={pack.tiers}
                  selected={tierIndex}
                  onSelect={(index) => choose(productIndex, index)}
                  label={`${pack.name} pack`}
                />
              </div>

              <button
                type="button"
                onClick={() => openCheckout("order_section")}
                disabled={isLoading || !product}
                className="group mt-4 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-yellow-cta text-[15px] font-bold text-[oklch(0.2_0.04_55)] shadow-md transition-all hover:brightness-95 disabled:opacity-60 sm:h-13 sm:text-base"
              >
                Order · Rs. {tier.price.toLocaleString()}
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Desktop: details form, quiet companion to the picker */}
            <div className="hidden min-w-0 lg:block">
              <div className="overflow-hidden rounded-3xl border border-border/70 bg-background p-5 shadow-[0_20px_50px_-40px_oklch(0.32_0.07_150/0.5)]">
                {isLoading || (!product && !cart.length && !seeded.current) ? (
                  <div className="space-y-3 pb-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-14 animate-pulse rounded-xl bg-muted"
                      />
                    ))}
                  </div>
                ) : (
                  <CheckoutForm flushSubmit isDashainDhamaka />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="bg-card py-10 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-3.5 sm:px-5">
          <SectionHeading
            title="Before you order"
            size="sm"
            className="mb-6 md:mb-10"
          />
          <FAQ limit={3} />
        </div>
      </section>

      {/* How it works — last */}
      <section className="border-t border-border py-10 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-3.5 sm:px-5">
          <SectionHeading
            title="How it works"
            size="sm"
            className="mb-6 md:mb-10"
          />
          <ol className="grid gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
            {STEPS.map(({ Icon, title, body }, index) => (
              <li
                key={title}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3.5 sm:gap-4 sm:p-5 md:flex-col md:p-7"
              >
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 text-forest sm:h-14 sm:w-14 sm:rounded-2xl">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white sm:-right-2 sm:-top-2 sm:h-6 sm:w-6 sm:text-xs">
                    {index + 1}
                  </span>
                </span>
                <div>
                  <h3 className="text-base font-medium text-forest sm:text-xl md:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-foreground/75 sm:mt-1">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who you are buying from */}
      <footer className="mt-auto bg-forest pb-28 pt-7 text-cream/80 sm:pt-8 md:pb-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-1.5 px-3.5 text-xs sm:gap-2 sm:px-5 sm:text-sm md:flex-row md:items-center md:justify-between">
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

      {/* Mobile sticky button — opens checkout modal */}
      <div
        aria-hidden={orderInView}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 md:hidden",
          orderInView ? "translate-y-full" : "translate-y-0"
        )}
      >
        <button
          type="button"
          tabIndex={orderInView ? -1 : 0}
          onClick={() => openCheckout("sticky_bar")}
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-yellow-cta text-sm font-bold text-[oklch(0.2_0.04_55)] sm:h-13 sm:text-base"
        >
          Order Now · Rs. {tier.price.toLocaleString()}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        setIsOpen={setCheckoutOpen}
        isDashainDhamaka
      />
    </div>
  );
}
