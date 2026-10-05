import { HowToUse } from "@/components/home/HowToUse";
import { FAQ } from "@/components/home/FAQ";
import { faqs } from "@/lib/faqData";
import { generateWebPageSchema, generateFAQSchema } from "@/lib/schema";

export const metadata = {
  title: "How to Use Yachu Hair Oil | Application Guide",
  description:
    "Learn the best practices on how to use Yachu Hair Oil for healthy hair growth, root nourishment, and maintenance. Step-by-step application guide.",
  keywords: [
    "how to use yachu hair oil",
    "hair oil application steps",
    "yachu hair oil guide",
    "hair growth oil usage",
    "botanical hair care instructions",
    "best way to apply hair oil",
    "yachu hair care tips",
  ],
  openGraph: {
    title: "How to Use Yachu Hair Oil | Application Guide",
    description:
      "Learn the best practices on how to use Yachu Hair Oil for healthy hair growth, root nourishment, and maintenance.",
    type: "website",
    url: "/how-to-use",
    siteName: "Yachu Hair Oil",
    images: [
      {
        url: "/yachu-logo.svg",
        width: 1200,
        height: 630,
        alt: "How to Use Yachu Hair Oil Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Use Yachu Hair Oil | Application Guide",
    description:
      "Learn the best practices on how to use Yachu Hair Oil for healthy hair growth, root nourishment, and maintenance.",
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
    canonical: "/how-to-use",
  },
};

export default function HowToUsePage() {
  const guideSchema = generateWebPageSchema(
    "How to Use Yachu Hair Oil | Application Guide",
    "Learn the best practices on how to use Yachu Hair Oil for healthy hair growth, root nourishment, and maintenance. Step-by-step application guide.",
    "https://yachu.com.np/how-to-use",
    "Article"
  );
  const faqSchema = generateFAQSchema(faqs);
  const schemas = [guideSchema, faqSchema];

  return (
    <main className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <div className="bg-cream/30 py-24 border-b border-border md:text-center px-6">
        <h1 className="text-5xl md:text-7xl font-display text-forest mb-8">
          Rituals
        </h1>
        <p className="text-moss text-lg max-w-2xl mx-auto leading-relaxed">
          Discover the time-honored techniques to transform your hair care into
          a soulful ritual.
        </p>
      </div>
      <HowToUse />
      <FAQ />
    </main>
  );
}
