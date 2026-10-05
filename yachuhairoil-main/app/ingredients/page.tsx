import { Ingredients } from "@/components/home/Ingredients";
import Benefits from "@/components/home/Benifits";
import { IngredientsList } from "@/components/home/ingredientslist";
import { generateWebPageSchema } from "@/lib/schema";

export const metadata = {
  title: "Product Information | Yachu Hair Oil",
  description:
    "Detailed information about our ingredients and the benefits of our botanical blends.",
};

export default function InfoPage() {
  const schema = generateWebPageSchema(
    "Product Information & Ingredients | Yachu Hair Oil",
    "Detailed information about our ingredients and the benefits of our botanical blends.",
    "https://yachu.com.np/ingredients",
    "ItemPage"
  );

  return (
    <main className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-cream/30 py-24 border-b border-border md:text-center px-6">
        <h1 className="text-5xl md:text-7xl font-display text-forest mb-8">
          Pure Science
        </h1>
        <p className="text-moss text-lg max-w-2xl mx-auto leading-relaxed">
          Understanding the power of nature and the benefits of every botanical
          ingredient we use.
        </p>
      </div>
      <Ingredients />
      <IngredientsList />
      <Benefits />
    </main>
  );
}
