import { Contact } from "@/components/home/Contact";
import { FAQ } from "@/components/home/FAQ";
import { faqs } from "@/lib/faqData";
import { generateWebPageSchema, generateFAQSchema } from "@/lib/schema";

export const metadata = {
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

export default function ContactPage() {
  const contactSchema = generateWebPageSchema(
    "Contact Yachu Hair Oil | Premium Hair Care Support",
    "Get in touch with Yachu Hair Oil for premium botanical hair care products.",
    "https://yachu.com.np/contact",
    "ContactPage"
  );
  const faqSchema = generateFAQSchema(faqs);
  const schemas = [contactSchema, faqSchema];

  return (
    <main className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <div className="bg-cream/30 py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:text-center">
          <h1 className="text-5xl md:text-7xl font-display text-forest mb-8">
            Get in touch
          </h1>
          <p className="text-moss text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about our products or your hair care routine? Our
            experts are here to guide you.
          </p>
        </div>
      </div>

      <Contact />
      <FAQ />
    </main>
  );
}
