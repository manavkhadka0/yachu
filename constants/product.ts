import { TProduct } from "@/types/product";

export const PRODUCTS: TProduct[] = [
  {
    title: "Yachu Hair Oil - For Dandruff",
    subtitle: "Regrowth For Dandruff Case",
    rating: 4.5,
    reviews: 120,
    price: 99.99,
    tag: "Bestseller",
    imageSrc: "/product/dandruff.png",
  },
  {
    title: "Yachu Hair Oil - For Hairfall",
    subtitle: "Regrowth For Hair Fall Case",
    rating: 4.5,
    reviews: 120,
    price: 99.99,
    tag: "Bestseller",
    imageSrc: "/product/hairfall.png",
  },
  {
    title: "Yachu Skil Oil - For baldness",
    subtitle: "Regrowth For Baldness Case",
    rating: 4.2,
    reviews: 80,
    price: 149.99,
    imageSrc: "/product/baldness.png",
  },
];

export const HERO_BEFORE_AFTER = [
  { before: "/before.jpeg", after: "/after.jpg" },
  { before: "/before.jpeg", after: "/after.jpg" },
];
