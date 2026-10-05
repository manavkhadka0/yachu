import { Hero } from "@/components/home/Hero";
import { HowToUse } from "@/components/home/HowToUse";
import { Story } from "@/components/home/Story";
import { Ingredients } from "@/components/home/Ingredients";
import { IngredientsList } from "@/components/home/ingredientslist";
import { Commercial } from "@/components/home/Commercial";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Testimonials } from "@/components/home/Testimonials";
import { Products } from "@/components/home/Products";
import { Blogs } from "@/components/home/Blogs";
import { FAQ } from "@/components/home/FAQ";
import { faqs } from "@/lib/faqData";
import { Contact } from "@/components/home/Contact";
import Benefits from "@/components/home/Benifits";
import { productsApi, blogApi, siteSettingsApi } from "@/services";
import { generateOrganizationSchema, generateFAQSchema, generateItemListSchema } from "@/lib/schema";

export default async function Home() {
  const [products, blogsData, siteConfig] = await Promise.all([
    productsApi.getProducts(),
    blogApi.getBlogs({ page_size: 3 }),
    siteSettingsApi.getSiteConfig(),
  ]);

  const blogs = blogsData?.results || [];

  const orgSchema = generateOrganizationSchema(siteConfig);
  const faqSchema = generateFAQSchema(faqs);
  const productListSchema = generateItemListSchema(products, "Yachu Products", "https://yachu.com.np", "Product");
  const blogListSchema = generateItemListSchema(blogs, "Yachu Blog", "https://yachu.com.np", "BlogPosting");

  const schemas = [orgSchema, faqSchema, productListSchema, blogListSchema];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <Hero />
      <HowToUse />
      <Story config={siteConfig} />
      <BeforeAfter />
      <Testimonials />
      <Products products={products} />
      <Ingredients />
      <IngredientsList />
      <Benefits />
      <Commercial />
      <Blogs blogs={blogs} />
      <FAQ />
      <Contact />
    </main>
  );
}
