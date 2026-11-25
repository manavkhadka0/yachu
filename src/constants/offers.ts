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

export type BulkPriceTier = {
  minQty: number;
  unitPrice: number;
};

// Hair oil packs shown in the hero and product details pack selector (1-3 bottles).
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
    price: 6600,
    originalPrice: 7500,
    perPcs: 2200,
    discountLabel: "12%",
    best: true,
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
    price: 2550,
    originalPrice: 3000,
    perPcs: 850,
    discountLabel: "15%",
    best: true,
  },
];

// Shared bulk price list for Yachu Bottle Shampoo (300 ml) & Sachet Hair Oil (90 ml)
const SHAMPOO_SACHET_OIL_BULK_TIERS: BulkPriceTier[] = [
  { minQty: 3, unitPrice: 850 },
  { minQty: 6, unitPrice: 830 },
  { minQty: 12, unitPrice: 780 },
  { minQty: 30, unitPrice: 760 },
  { minQty: 60, unitPrice: 730 },
  { minQty: 90, unitPrice: 700 },
  { minQty: 150, unitPrice: 670 },
  { minQty: 300, unitPrice: 640 },
  { minQty: 600, unitPrice: 600 },
  { minQty: 900, unitPrice: 520 },
];

// Full quantity-based unit price tiers applied as cart/order quantity increases
export const BULK_PRICE_TIERS: Record<string, BulkPriceTier[]> = {
  "yachu-hair-oil": [
    { minQty: 3, unitPrice: 2200 },
    { minQty: 6, unitPrice: 2150 },
    { minQty: 12, unitPrice: 2050 },
    { minQty: 30, unitPrice: 2025 },
    { minQty: 60, unitPrice: 2000 },
    { minQty: 90, unitPrice: 1975 },
    { minQty: 150, unitPrice: 1950 },
    { minQty: 300, unitPrice: 1900 },
    { minQty: 600, unitPrice: 1800 },
    { minQty: 900, unitPrice: 1700 },
  ],
  "yachu-shampoo-300-ml": SHAMPOO_SACHET_OIL_BULK_TIERS,
  "sachet-oil-90-ml": SHAMPOO_SACHET_OIL_BULK_TIERS,
  "sachet-shampoo": [
    { minQty: 100, unitPrice: 85 },
    { minQty: 200, unitPrice: 80 },
    { minQty: 300, unitPrice: 75 },
    { minQty: 500, unitPrice: 70 },
    { minQty: 1000, unitPrice: 65 },
  ],
};

// Products that have packs, in the order shown
export const DASHAIN_PACKS = [
  { slug: "yachu-hair-oil", name: "Yachu Hair Oil", tiers: OIL_TIERS },
  { slug: "yachu-shampoo-300-ml", name: "Yachu Shampoo", tiers: SHAMPOO_TIERS },
];

// Single-piece base prices by product slug
export const DASHAIN_UNIT_PRICE: Record<string, number> = {
  "yachu-hair-oil": 2500,
  "yachu-shampoo-300-ml": 1000,
  "sachet-oil-90-ml": 990,
  "sachet-shampoo": 100,
};

// Per-piece price for a quantity of a tiered product (undefined when
// the product has no tiers)
export const dashainUnitPrice = (slug: string, qty: number) => {
  const bulkTiers = BULK_PRICE_TIERS[slug];
  if (bulkTiers) {
    const matched = [...bulkTiers].reverse().find((t) => qty >= t.minQty);
    return matched ? matched.unitPrice : DASHAIN_UNIT_PRICE[slug];
  }

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

export const DELIVERY_CHARGE = { inside: 100, outside: 150 };

export const whatsappOrderUrl = `https://api.whatsapp.com/send?phone=${yachuWhatsApp.replace(
  "+",
  ""
)}&text=${encodeURIComponent("Hello Yachu, I want to order Yachu Hair Oil.")}`;
