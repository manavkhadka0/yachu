"use client";
import { useState } from "react";
import { Star, ShieldCheck, ShoppingCart, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/image";
import { useCartStore } from "@/hooks/useCartStore";
import { toast } from "sonner";
import { BundleModal } from "@/components/product/BundleModal";
import { CheckoutModal } from "@/components/popover/CheckoutModal";
import { useCartAnimation } from "@/hooks/useCartAnimation";

export function Products({ products }) {
  const displayProducts = products?.length > 0 ? products : [];
  const { addToCart } = useCartStore();
  const [isBundleOpen, setIsBundleOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<Record<string, boolean>>({});
  const { triggerFlyToCart } = useCartAnimation();

  const [openCheckoutForm, setOpenCheckoutForm] = useState(false);
  const [bundleType, setBundleType] = useState<"ritual" | "threeOils">("ritual");

  const handleBuyNow = (product: any, e: React.MouseEvent<HTMLButtonElement>) => {
    // Replace cart with just this item and open checkout directly
    addToCart([{ product, count: 1 }]);
    setOpenCheckoutForm(true);
  };

  return (
    <section id="products" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="md:text-center mb-14">
          <p className="font-script text-2xl text-gold mb-2">
            The full collection
          </p>
          <h2 className="text-4xl md:text-6xl text-forest">Find your bottle</h2>
          <p className="mt-4 text-foreground/65 mx-auto">
            Three oils for three needs, plus a herbal shampoo crafted to keep
            the ritual whole.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((p) => {
            const price = parseFloat(p.price) || 0;
            const mrp = price + 200;
            const discount = Math.round((200 / mrp) * 100);

            return (
              <article
                key={p.id}
                className="group relative rounded-2xl overflow-hidden border border-border bg-background hover:shadow-2xl transition-all flex flex-col"
              >
                {/* Offer Badge */}
                {p.title.toLowerCase().includes("oil") && (
                  <span className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-lg bg-yellow-cta text-forest text-[10px] font-bold tracking-widest uppercase shadow-md flex items-center gap-1.5">
                    <Star className="w-3 h-3 fill-forest" /> Buy 3, Get 10% OFF
                  </span>
                )}

                {/* Image */}
                <div className="relative aspect-square bg-cream overflow-hidden">
                  <img
                    src={getImageUrl(p.image1)}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    width={1024}
                    height={1024}
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-3xl text-forest leading-tight min-h-[3.5rem] line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-moss text-sm font-medium  line-clamp-1">
                    {p.description
                      ? p.description.replace(/<[^>]*>/g, "").substring(0, 60) +
                        "..."
                      : "Natural Hair Care Solution"}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3 text-sm">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span className="font-medium text-foreground">4.8</span>
                    <span className="text-foreground/40">|</span>
                    <ShieldCheck className="w-4 h-4 text-[oklch(0.55_0.15_240)]" />
                    <span className="text-foreground/65">
                      {(2500).toLocaleString()} Reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-4">
                    <span className="font-bold text-foreground text-xl">
                      Rs. {price}
                    </span>
                  </div>

                  {/* 3-Pack Offer */}
                  {p.title.toLowerCase().includes("oil") && (
                    <div className="mt-4 p-3 rounded-xl bg-forest/5 border border-forest/10 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-forest uppercase tracking-wider">Bundle Offer</p>
                        <p className="text-[10px] text-foreground/60 mt-0.5">Buy 3 & Save 10%</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart([{ product: p, count: 3 }]);
                          setOpenCheckoutForm(true);
                        }}
                        className="px-3 py-1.5 bg-forest text-cream text-[10px] font-bold rounded-lg uppercase tracking-wider hover:bg-forest/90 transition-colors cursor-pointer"
                      >
                        Add 3 Pack
                      </button>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={(e) => handleBuyNow(p, e)}
                      className="py-3.5 rounded-xl bg-yellow-cta hover:brightness-95 text-[oklch(0.2_0.04_55)] font-bold tracking-widest text-xs uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" /> Order Now
                    </button>
                    <a
                      href={`/products/${p.slug}`}
                      className="py-3.5 rounded-xl border border-border hover:bg-muted text-forest font-bold tracking-widest text-xs uppercase transition-all flex items-center justify-center"
                    >
                      Details
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bundles */}
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {/* Bundle 1 */}
          <div className="p-8 md:p-10 rounded-3xl border-2 border-gold/40 bg-gradient-to-r from-cream via-card to-[oklch(0.95_0.05_75)] flex flex-col justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-bark text-xs font-semibold uppercase tracking-wider">
                Save 10%
              </span>
              <h3 className="font-display text-3xl md:text-4xl text-forest mt-3">
                The Complete Ritual
              </h3>
              <p className="text-foreground/70 mt-1">
                Oil of your choice + the shampoo. The full Yachu experience.
              </p>
            </div>
            <button
              onClick={() => { setBundleType("ritual"); setIsBundleOpen(true); }}
              className="px-8 py-4 rounded-full bg-forest text-cream font-medium hover:bg-forest/90 transition-colors whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer w-full"
            >
              Shop the bundle <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bundle 2 */}
          <div className="p-8 md:p-10 rounded-3xl border-2 border-gold/40 bg-gradient-to-r from-cream via-card to-[oklch(0.95_0.05_75)] flex flex-col justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-bark text-xs font-semibold uppercase tracking-wider">
                Flat 10% OFF
              </span>
              <h3 className="font-display text-3xl md:text-4xl text-forest mt-3">
                Buy 3 Hair Oils
              </h3>
              <p className="text-foreground/70 mt-1">
                Stock up on your favorite hair oil and save.
              </p>
            </div>
            <button
              onClick={() => { setBundleType("threeOils"); setIsBundleOpen(true); }}
              className="px-8 py-4 rounded-full bg-forest text-cream font-medium hover:bg-forest/90 transition-colors whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer w-full"
            >
              Shop the bundle <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <BundleModal
        isOpen={isBundleOpen}
        onClose={() => setIsBundleOpen(false)}
        products={displayProducts}
        bundleType={bundleType}
        onCheckout={() => setOpenCheckoutForm(true)}
      />

      <CheckoutModal
        isOpen={openCheckoutForm}
        setIsOpen={setOpenCheckoutForm}
        onCloseSheet={() => setOpenCheckoutForm(false)}
      />
    </section>
  );
}
