import { Products } from "@/components/home/Products";
import { productsApi } from "@/services";
import { generateItemListSchema } from "@/lib/schema";

export const metadata = {
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

export default async function ProductsPage() {
  const products = await productsApi.getProducts();
  const productListSchema = generateItemListSchema(products, "Yachu Products Collection", "https://yachu.com.np/products", "Product");

  return (
    <main className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />
      <Products products={products} />
    </main>
  );
}
