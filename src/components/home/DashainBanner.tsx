"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import useProductCart from "@/store/zustand";
import { useProducts } from "@/hooks/use-products";
import { newCart } from "@/services/lib/utils";
import { toast } from "sonner";
import { useEffect, useState, type CSSProperties } from "react";
import { CheckoutModal } from "@/components/popover/CheckoutModal";

// Vijaya Dashami (Nepal time). Edit if the date changes.
const DASHAMI = new Date("2026-10-21T00:00:00+05:45");

// Only Hair Oil and Shampoo have Dashain bundle pricing
type BannerOffer = {
  id: string;
  slug: string;
  title: string;
  qty: number;
  originalPrice: number;
  offerPrice: number;
  perPcs: number;
  discountLabel: string;
  perk?: string;
  badge?: string;
};

const BANNER_OFFERS: BannerOffer[] = [
  {
    id: "oil-1",
    slug: "yachu-hair-oil",
    title: "Yachu Hair Oil (1 pc)",
    qty: 1,
    originalPrice: 2500,
    offerPrice: 2250,
    perPcs: 2250,
    discountLabel: "10% off",
    perk: "+1 lucky draw entry",
  },
  {
    id: "oil-3",
    slug: "yachu-hair-oil",
    title: "Yachu Hair Oil (3 pcs)",
    qty: 3,
    originalPrice: 7500,
    offerPrice: 6270,
    perPcs: 2090,
    discountLabel: "16% off",
    perk: "+ Free facewash",
    badge: "Best value",
  },
  {
    id: "shampoo-1",
    slug: "yachu-shampoo-300-ml",
    title: "Yachu Shampoo (1 pc)",
    qty: 1,
    originalPrice: 999,
    offerPrice: 899,
    perPcs: 899,
    discountLabel: "10% off",
    perk: "+1 lucky draw entry",
  },
  {
    id: "shampoo-3",
    slug: "yachu-shampoo-300-ml",
    title: "Yachu Shampoo (3 pcs)",
    qty: 3,
    originalPrice: 2997,
    offerPrice: 2422,
    perPcs: 807,
    discountLabel: "19% off",
    perk: "+3 lucky draw entries",
    badge: "Best value",
  },
];

function useCountdown(target: Date) {
  // null on first render so server and client markup match
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, target.getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (left === null || left === 0) return null;
  const p = (n: number) => String(n).padStart(2, "0");
  return {
    days: Math.floor(left / 864e5),
    hours: p(Math.floor(left / 36e5) % 24),
    mins: p(Math.floor(left / 6e4) % 60),
    secs: p(Math.floor(left / 1e3) % 60),
  };
}

/* Decorative: marigold garland, repeats across any width without stretching */
function Garland() {
  return (
    <svg className="block h-7 w-full" aria-hidden="true" focusable="false">
      <defs>
        <pattern
          id="dashain-garland"
          width="60"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="15"
            y1="0"
            x2="15"
            y2="9"
            stroke="#a65e1a"
            strokeWidth="1.2"
          />
          <circle cx="15" cy="15" r="7" fill="#f28c12" />
          <circle cx="15" cy="15" r="3.4" fill="#fff3c4" opacity=".8" />
          <line
            x1="45"
            y1="0"
            x2="45"
            y2="13"
            stroke="#a65e1a"
            strokeWidth="1.2"
          />
          <circle cx="45" cy="19" r="7" fill="#f5b72e" />
          <circle cx="45" cy="19" r="3.4" fill="#fff3c4" opacity=".8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dashain-garland)" />
    </svg>
  );
}

/* Decorative: small gold kite (top right) */
function GoldKite() {
  return (
    <svg
      viewBox="0 0 100 130"
      className="h-full w-full drop-shadow-md"
      aria-hidden="true"
    >
      <path d="M50 4L96 52 50 98 4 52z" fill="#f5b72e" />
      <path
        d="M50 4v94M4 52h92"
        stroke="rgba(255,255,255,.6)"
        strokeWidth="2"
      />
      <circle cx="50" cy="52" r="12" fill="#2b1a12" />
      <circle cx="50" cy="52" r="7" fill="#f28c12" />
      <path
        d="M50 98c-6 10 6 16 0 30"
        stroke="#2b1a12"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

const rot = (deg: number, delay = 0) =>
  ({ "--r": `${deg}deg`, animationDelay: `${delay}s` }) as CSSProperties;

export default function DashainBanner() {
  const { data: allProducts } = useProducts();
  const { cart, addToCart } = useProductCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const countdown = useCountdown(DASHAMI);

  const handleOrder = (offer: BannerOffer) => {
    const product = allProducts?.find((p) => p.slug === offer.slug);
    if (!product) return;

    const discountedProduct = { ...product, price: offer.perPcs };
    let updatedCart = [...cart];
    for (let i = 0; i < offer.qty; i++) {
      updatedCart = newCart(
        { product: discountedProduct, count: 1 },
        updatedCart,
      );
    }
    addToCart(updatedCart);
    toast.success(`${offer.title} added at Dashain price!`, {
      description: `Rs. ${offer.offerPrice.toLocaleString()} (${offer.discountLabel})`,
    });
    setCheckoutOpen(true);
  };

  return (
    <>
      <style>{`
        @keyframes dashain-float {
          0%, 100% { transform: translateY(0) rotate(var(--r)); }
          50% { transform: translateY(-9px) rotate(calc(var(--r) + 5deg)); }
        }
        @keyframes dashain-twinkle {
          0%, 100% { transform: scale(1) rotate(0); }
          50% { transform: scale(1.25) rotate(18deg); }
        }
        .dashain-float { animation: dashain-float 6s ease-in-out infinite; }
        .dashain-twinkle { animation: dashain-twinkle 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .dashain-float, .dashain-twinkle { animation: none; transform: rotate(var(--r, 0deg)); }
        }
      `}</style>

      <section
        aria-label="Dashain festive offers"
        className="relative w-full overflow-hidden border-b border-border"
        style={{
          background:
            "radial-gradient(circle at 12% 0%, #ffe2a8 0, transparent 40%), radial-gradient(circle at 92% 100%, #ffd2a1 0, transparent 40%), #fff6e5",
        }}
      >
        {/* ── Garland ── */}
        <div className="relative z-10">
          <Garland />
        </div>

        {/* ── Kites (left): large, blue one sits to the right of the red one ── */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden select-none md:block"
          style={{ width: "clamp(140px, 17vw, 260px)" }}
          aria-hidden="true"
        >
          <div
            className="absolute"
            style={{
              top: "22px",
              left: 0,
              width: "clamp(100px, 11.5vw, 175px)",
              height: "clamp(100px, 11.5vw, 175px)",
              transform: "translateX(-8%)",
            }}
          >
            <div
              className="dashain-float relative h-full w-full"
              style={rot(-10)}
            >
              <Image
                src="/kite/Red Diamond Kite with Golden Eye.png"
                alt=""
                fill
                sizes="175px"
                className="object-contain drop-shadow-md"
                priority
              />
            </div>
          </div>
          <div
            className="absolute"
            style={{
              bottom: "-2%",
              left: "clamp(50px, 7vw, 115px)",
              width: "clamp(85px, 9.5vw, 145px)",
              height: "clamp(85px, 9.5vw, 145px)",
            }}
          >
            <div
              className="dashain-float relative h-full w-full"
              style={rot(8, -2)}
            >
              <Image
                src="/kite/Colorful Geometric Kite with Tail.png"
                alt=""
                fill
                sizes="145px"
                className="object-contain drop-shadow-md"
                priority
              />
            </div>
          </div>
        </div>

        {/* ── Small gold kite (top right) ── */}
        <div
          className="pointer-events-none absolute z-0 hidden select-none md:block"
          style={{
            top: "38px",
            right: "clamp(24px, 6vw, 100px)",
            width: "clamp(44px, 4.5vw, 66px)",
            height: "clamp(57px, 5.8vw, 86px)",
          }}
          aria-hidden="true"
        >
          <div className="dashain-float h-full w-full" style={rot(16, -4)}>
            <GoldKite />
          </div>
        </div>

        {/* ── Swing (right) ── */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 z-0 hidden select-none md:block"
          style={{
            width: "clamp(160px, 17vw, 250px)",
            height: "clamp(160px, 17vw, 250px)",
            transform: "translate(8%, 14%)",
          }}
          aria-hidden="true"
        >
          <Image
            src="/kite/swing.png"
            alt=""
            fill
            sizes="250px"
            className="object-contain opacity-60"
          />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 pb-5 pt-3 text-center md:px-[14vw]">
          <div>
            <h2 className="flex items-center justify-center gap-2 text-lg font-black tracking-tight text-foreground sm:text-xl md:text-2xl">
              <span
                className="dashain-twinkle inline-block text-primary"
                aria-hidden="true"
              >
                ✦
              </span>
              Dashain Dhamaka
              <span
                className="dashain-twinkle inline-block text-primary"
                aria-hidden="true"
              >
                ✦
              </span>
            </h2>
            {countdown && (
              <p className="mt-1 text-xs font-semibold tabular-nums text-accent-foreground sm:text-sm">
                Vijaya Dashami in {countdown.days}d {countdown.hours}h{" "}
                {countdown.mins}m {countdown.secs}s
              </p>
            )}
          </div>

          {/* ── Offer cards ── */}
          <div className="mt-2 flex w-full max-w-5xl flex-wrap justify-center gap-3">
            {BANNER_OFFERS.map((offer) => {
              const product = allProducts?.find((p) => p.slug === offer.slug);
              const imageSrc = product?.image1;
              const savings = offer.originalPrice - offer.offerPrice;

              return (
                <button
                  key={offer.id}
                  type="button"
                  onClick={() => handleOrder(offer)}
                  aria-label={`Add ${offer.title} to cart at Dashain price`}
                  className={`group relative flex w-[calc(50%-6px)] flex-col items-center gap-1.5 rounded-xl border bg-white px-3 pb-3 pt-4 text-center shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:w-[calc(25%-9px)] ${
                    offer.badge ? "border-primary/60" : "border-border"
                  }`}
                >
                  {offer.badge && (
                    <span className="absolute -top-2.5 left-3 z-10 whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 text-[11px] font-bold leading-none text-background">
                      {offer.badge}
                    </span>
                  )}
                  <span className="absolute -top-2.5 right-3 z-10 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold leading-none text-primary-foreground">
                    {offer.discountLabel}
                  </span>

                  {/* Image */}
                  <div className="relative h-20 w-full">
                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={offer.title}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 1024px) 50vw, 240px"
                      />
                    )}
                    {offer.qty > 1 && (
                      <span className="absolute bottom-0 left-0 rounded bg-foreground/85 px-1.5 py-0.5 text-[10px] font-bold leading-none text-background">
                        ×{offer.qty}
                      </span>
                    )}
                  </div>

                  {/* Title + price */}
                  <p className="text-sm font-bold leading-tight text-foreground">
                    {offer.title}
                  </p>
                  <div className="flex items-baseline justify-center gap-2 whitespace-nowrap">
                    <span className="text-lg font-black text-foreground">
                      Rs. {offer.offerPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      Rs. {offer.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Savings + perk */}
                  <p className="text-xs font-semibold text-green-700">
                    Save Rs. {savings.toLocaleString()}
                  </p>
                  {offer.perk && (
                    <p className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {offer.perk}
                    </p>
                  )}

                  {/* CTA */}
                  <span className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-2 text-sm font-bold text-primary-foreground transition-colors group-hover:bg-primary/90">
                    <ShoppingCart className="h-4 w-4" />
                    Order now
                  </span>
                </button>
              );
            })}
          </div>

          <a
            href="#dashain-offers"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("dashain-offers")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs font-bold text-primary underline-offset-4 hover:underline sm:text-sm"
          >
            View all bundle offers
          </a>
        </div>
      </section>

      <CheckoutModal isOpen={checkoutOpen} setIsOpen={setCheckoutOpen} />
    </>
  );
}
