import { yachuWhatsApp } from "./constant";

export type OfferTier = {
  qty: number;
  label: string;
  price: number;
  originalPrice: number;
  perPcs: number;
  discountLabel: string;
  perk?: string;
  best?: boolean;
};

// Hair oil packs shown in the hero.
export const OIL_TIERS: OfferTier[] = [
  {
    qty: 1,
    label: "1 bottle",
    price: 2500,
    originalPrice: 2500,
    perPcs: 2500,
    discountLabel: "",
  },
  {
    qty: 2,
    label: "2 bottles",
    price: 5000,
    originalPrice: 5000,
    perPcs: 2500,
    discountLabel: "",
  },
  {
    qty: 3,
    label: "3 bottles",
    price: 7500,
    originalPrice: 7500,
    perPcs: 2500,
    discountLabel: "",
  },
];

export const SHAMPOO_TIERS: OfferTier[] = [
  {
    qty: 1,
    label: "1 bottle",
    price: 1000,
    originalPrice: 1000,
    perPcs: 1000,
    discountLabel: "",
  },
  {
    qty: 2,
    label: "2 bottles",
    price: 2000,
    originalPrice: 2000,
    perPcs: 1000,
    discountLabel: "",
  },
  {
    qty: 3,
    label: "3 bottles",
    price: 3000,
    originalPrice: 3000,
    perPcs: 1000,
    discountLabel: "",
  },
];

// Products that have packs, in the order shown
export const DASHAIN_PACKS = [
  { slug: "yachu-hair-oil", name: "Yachu Hair Oil", tiers: OIL_TIERS },
  { slug: "yachu-shampoo-300-ml", name: "Yachu Shampoo", tiers: SHAMPOO_TIERS },
];

// Per-piece price for a quantity of a pack product (undefined when
// the product has no pack)
export const dashainUnitPrice = (slug: string, qty: number) => {
  const pack = DASHAIN_PACKS.find((item) => item.slug === slug);
  if (!pack) return undefined;
  const tier = [...pack.tiers].reverse().find((t) => qty >= t.qty);
  return (tier ?? pack.tiers[0]).perPcs;
};

// Single-bottle price used by the sticky order bar
export const HERO_OFFER = {
  slug: "yachu-hair-oil",
  name: "Yachu Hair Oil",
  price: OIL_TIERS[0].price,
  originalPrice: OIL_TIERS[0].originalPrice,
  discountLabel: OIL_TIERS[0].discountLabel,
};

// Per-piece price by product slug, shown on product cards
export const DASHAIN_UNIT_PRICE: Record<string, number> = {
  "yachu-hair-oil": 2500,
  "yachu-shampoo-300-ml": 1000,
};

export const DELIVERY_CHARGE = { inside: 100, outside: 150 };

export const whatsappOrderUrl = `https://api.whatsapp.com/send?phone=${yachuWhatsApp.replace(
  "+",
  ""
)}&text=${encodeURIComponent("Hello Yachu, I want to order Yachu Hair Oil.")}`;
