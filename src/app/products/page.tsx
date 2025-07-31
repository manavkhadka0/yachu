import { Metadata } from "next";
import Product from "./products-page";

export const metadata: Metadata = {
  title: "Our Products | Natural Hair Care Collection",
  description:
    "Discover our range of natural hair care products crafted with love and tradition. Premium quality products for healthy, beautiful hair.",
  keywords: [
    "natural hair care",
    "organic products",
    "hair treatment",
    "beauty products",
    "hair care collection",
  ],
  openGraph: {
    title: "Our Products | Natural Hair Care Collection",
    description:
      "Discover our range of natural hair care products crafted with love and tradition.",
    type: "website",
    images: [
      {
        url: "/og-products.jpg",
        width: 1200,
        height: 630,
        alt: "Natural Hair Care Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Products | Natural Hair Care Collection",
    description:
      "Discover our range of natural hair care products crafted with love and tradition.",
    images: ["/og-products.jpg"],
  },
};

export default function ProductsPage() {
  return <Product />;
}
