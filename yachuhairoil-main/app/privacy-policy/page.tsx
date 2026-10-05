import { policyConfig } from "@/lib/config";
import { generateWebPageSchema } from "@/lib/schema";

export const metadata = {
  title: "Privacy Policy | Yachu Hair Oil",
  description: "Read about how we handle and protect your data at Yachu Hair Oil.",
};

export default function PrivacyPolicyPage() {
  const schema = generateWebPageSchema(
    "Privacy Policy | Yachu Hair Oil",
    "Read about how we handle and protect your data at Yachu Hair Oil.",
    "https://yachu.com.np/privacy-policy",
    "WebPage"
  );

  return (
    <main className="pt-32 pb-24 bg-cream/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-display text-forest mb-4">{policyConfig.title}</h1>
        <p className="text-foreground/60 mb-12">Last updated: {policyConfig.lastUpdated}</p>

        <div className="prose prose-stone prose-lg max-w-none prose-headings:text-forest prose-headings:font-display">
          <p className="leading-relaxed text-foreground/80">{policyConfig.introduction}</p>

          {policyConfig.sections.map((section, idx) => (
            <div key={idx} className="mt-12">
              <h2 className="text-2xl md:text-3xl mb-6">{section.title}</h2>
              <p className="leading-relaxed text-foreground/80 mb-6">{section.content}</p>
              {section.list && (
                <ul className="space-y-4">
                  {section.list.map((item, i) => (
                    <li key={i} className="text-foreground/80 leading-relaxed">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
