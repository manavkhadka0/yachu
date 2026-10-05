import { siteSettingsApi } from "@/services";
import { Story } from "@/components/home/Story";
import { Testimonials } from "@/components/home/Testimonials";
import { generateWebPageSchema } from "@/lib/schema";

export async function generateMetadata() {
  try {
    const siteConfig = await siteSettingsApi.getSiteConfig();

    return {
      title: `About Us - ${siteConfig?.meta_title || ""}`,
      description: `Learn about our story, founder, and mission. ${siteConfig?.meta_description || ""}`,
      keywords: [
        "about us",
        "founder story",
        "company history",
        "yachu hair oil",
        "natural hair care",
      ],
      openGraph: {
        title: `About Us - ${siteConfig?.meta_title || ""}`,
        description: `Learn about our story, founder, and mission. ${siteConfig?.meta_description || ""}`,
        type: "website",
        images: [
          {
            url: siteConfig?.hero_section_image || "",
            width: 1200,
            height: 630,
            alt: "About Yachu Hair Oil",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `About Us - ${siteConfig?.meta_title || ""}`,
        description: `Learn about our story, founder, and mission. ${siteConfig?.meta_description || ""}`,
        images: siteConfig?.hero_section_image
          ? [siteConfig.hero_section_image]
          : [],
      },
      alternates: {
        canonical: "/about",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "About Us - Natural Hair Care",
      description:
        "Learn about our story, founder, and mission behind our natural hair care products.",
    };
  }
}

export default async function AboutPage() {
  const siteConfig = await siteSettingsApi.getSiteConfig();
  const schema = generateWebPageSchema(
    `About Us - ${siteConfig?.meta_title || ""}`,
    `Learn about our story, founder, and mission. ${siteConfig?.meta_description || ""}`,
    "https://yachu.com.np/about",
    "AboutPage"
  );

  return (
    <main className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-cream/30 py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:text-center">
          <p className="font-script text-3xl text-gold mb-4">Our Heritage</p>
          <h1 className="text-5xl md:text-7xl font-display text-forest mb-8 max-w-4xl mx-auto leading-tight">
            Crafting botanical excellence for healthy hair.
          </h1>
          <p className="text-moss text-lg max-w-2xl mx-auto leading-relaxed">
            Yachu Hair Oil was born from a deep respect for traditional
            knowledge and a desire to bring pure, effective botanical care to
            everyone.
          </p>
        </div>
      </div>

      <Story config={siteConfig} />

      <div className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display text-forest mb-6">
                Our Mission
              </h2>
              <p className="text-foreground/70 text-lg leading-relaxed mb-6">
                To empower people to embrace their natural beauty through
                sustainable, traditional, and effective hair care solutions. We
                believe that what you put on your body should be as pure as what
                you put in it.
              </p>
              <p className="text-foreground/70 text-lg leading-relaxed">
                Every bottle of Yachu is a testament to our commitment to
                quality, using only the finest ingredients sourced responsibly.
              </p>
            </div>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/yachu_women.webp"
                alt="Yachu Hair Oil Community"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <Testimonials />
    </main>
  );
}
