import { Metadata } from "next";
import PurchasePage from "@/components/purchase/ai/purchase-page";

export const metadata: Metadata = {
  title: "Purchase Yachu Hair Oil | AI Voice Assistant",
  description:
    "Purchase Yachu Hair Oil with the help of our AI voice assistant. Get personalized recommendations and assistance for your hair care needs.",
  keywords: [
    "purchase yachu hair oil",
    "ai voice assistant",
    "yachu hair oil purchase",
    "voice agent",
    "hair care purchase",
    "yachu products",
  ],
  openGraph: {
    title: "Purchase Yachu Hair Oil | AI Voice Assistant",
    description:
      "Purchase Yachu Hair Oil with the help of our AI voice assistant. Get personalized recommendations and assistance.",
    type: "website",
    url: "/purchase",
    siteName: "Yachu Hair Oil",
    images: [
      {
        url: "/yachu-logo.svg",
        width: 1200,
        height: 630,
        alt: "Purchase Yachu Hair Oil - AI Voice Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Purchase Yachu Hair Oil | AI Voice Assistant",
    description:
      "Purchase Yachu Hair Oil with the help of our AI voice assistant. Get personalized recommendations and assistance.",
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
    canonical: "/purchase",
  },
};

const Purchase = () => {
  return <PurchasePage />;
};

export default Purchase;
