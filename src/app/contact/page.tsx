import { Metadata } from "next";
import Contact from "@/components/contact/Contact";

export const metadata: Metadata = {
  title: "Contact Yachu Hair Oil | Premium Hair Care Support",
  description:
    "Get in touch with Yachu Hair Oil for premium botanical hair care products. Located in Sankhamul, Kathmandu. Contact us for product inquiries, support, and hair care guidance.",
  keywords: [
    "contact yachu hair oil",
    "hair care support kathmandu",
    "yachu hair oil contact",
    "botanical hair care nepal",
    "sankhamul hair care",
    "premium hair products nepal",
    "natural hair care support",
    "yachu customer service",
  ],
  openGraph: {
    title: "Contact Yachu Hair Oil | Premium Hair Care Support",
    description:
      "Get in touch with Yachu Hair Oil for premium botanical hair care products. Located in Sankhamul, Kathmandu. Contact us for product inquiries and support.",
    type: "website",
    url: "/contact",
    siteName: "Yachu Hair Oil",
    images: [
      {
        url: "/yachu-logo.svg",
        width: 1200,
        height: 630,
        alt: "Contact Yachu Hair Oil - Premium Hair Care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Yachu Hair Oil | Premium Hair Care Support",
    description:
      "Get in touch with Yachu Hair Oil for premium botanical hair care products. Located in Sankhamul, Kathmandu.",
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
    canonical: "/contact",
  },
};

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;
