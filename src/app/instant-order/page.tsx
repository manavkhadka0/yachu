import { Metadata } from "next";
import InstantOrderForm from "@/components/instant-order/instant-order-form";

export const metadata: Metadata = {
  title: "Order Yachu Hair Oil | Instant Order Form",
  description:
    "Order Yachu Hair Oil instantly. Fill in your details and we'll call you shortly to confirm your order. Fast and easy ordering process.",
  keywords: [
    "order yachu hair oil",
    "yachu hair oil order",
    "instant order",
    "yachu products",
    "hair oil purchase",
    "yachu hair oil buy",
    "order hair oil online",
  ],
  openGraph: {
    title: "Order Yachu Hair Oil | Instant Order Form",
    description:
      "Order Yachu Hair Oil instantly. Fill in your details and we'll call you shortly to confirm your order.",
    type: "website",
    url: "/instant-order",
    siteName: "Yachu Hair Oil",
    images: [
      {
        url: "/yachu-logo.svg",
        width: 1200,
        height: 630,
        alt: "Order Yachu Hair Oil - Instant Order Form",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Order Yachu Hair Oil | Instant Order Form",
    description:
      "Order Yachu Hair Oil instantly. Fill in your details and we'll call you shortly to confirm your order.",
    images: ["/yachu-logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/instant-order",
  },
};

const InstantOrderPage = () => {
  return <InstantOrderForm />;
};

export default InstantOrderPage;
