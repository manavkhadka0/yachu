import { yachuWhatsApp } from "./constant";

export type OfferTier = {
  qty: number;
  label: string;
  price: number;
  originalPrice: number;
  perPcs: number;
  discountLabel: string;
  perk: string;
  best?: boolean;
};

// Dashain hair oil packs shown in the hero.
export const OIL_TIERS: OfferTier[] = [
  {
    qty: 1,
    label: "1 bottle",
    price: 2250,
    originalPrice: 2500,
    perPcs: 2250,
    discountLabel: "10% off",
    perk: "1 lucky draw scratch card",
  },
  {
    qty: 2,
    label: "2 bottles",
    price: 4500,
    originalPrice: 5000,
    perPcs: 2250,
    discountLabel: "10% off",
    perk: "2 lucky draw scratch cards",
  },
  {
    qty: 3,
    label: "3 bottles",
    price: 6270,
    originalPrice: 7500,
    perPcs: 2090,
    discountLabel: "16% off",
    perk: "Free Yachu Facewash + 3 lucky draw scratch cards",
    best: true,
  },
];

export const SHAMPOO_TIERS: OfferTier[] = [
  {
    qty: 1,
    label: "1 bottle",
    price: 899,
    originalPrice: 999,
    perPcs: 899,
    discountLabel: "10% off",
    perk: "1 lucky draw scratch card",
  },
  {
    qty: 2,
    label: "2 bottles",
    price: 1798,
    originalPrice: 1998,
    perPcs: 899,
    discountLabel: "10% off",
    perk: "2 lucky draw scratch cards",
  },
  {
    qty: 3,
    label: "3 bottles",
    price: 2422,
    originalPrice: 2997,
    perPcs: 807,
    discountLabel: "19% off",
    perk: "3 lucky draw scratch cards",
    best: true,
  },
];

// Products that have Dashain packs, in the order the offer section shows them
export const DASHAIN_PACKS = [
  { slug: "yachu-hair-oil", name: "Hair Oil", tiers: OIL_TIERS },
  { slug: "yachu-shampoo-300-ml", name: "Shampoo", tiers: SHAMPOO_TIERS },
];

// Dashain per-piece price for a quantity of a pack product (undefined when
// the product has no Dashain pack)
export const dashainUnitPrice = (slug: string, qty: number) => {
  const pack = DASHAIN_PACKS.find((item) => item.slug === slug);
  if (!pack) return undefined;
  const tier = [...pack.tiers].reverse().find((t) => qty >= t.qty);
  return (tier ?? pack.tiers[0]).perPcs;
};

// Single-bottle Dashain price used by the sticky order bar
export const HERO_OFFER = {
  slug: "yachu-hair-oil",
  name: "Yachu Hair Oil",
  price: OIL_TIERS[0].price,
  originalPrice: OIL_TIERS[0].originalPrice,
  discountLabel: OIL_TIERS[0].discountLabel,
};

// Per-piece Dashain price by product slug, shown on product cards
export const DASHAIN_UNIT_PRICE: Record<string, number> = {
  "yachu-hair-oil": 2250,
  "yachu-shampoo-300-ml": 899,
};

export const DELIVERY_CHARGE = { inside: 100, outside: 150 };

export const whatsappOrderUrl = `https://api.whatsapp.com/send?phone=${yachuWhatsApp.replace(
  "+",
  ""
)}&text=${encodeURIComponent("Hello Yachu, I want to order Yachu Hair Oil.")}`;
