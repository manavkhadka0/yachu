import { productsApi } from "@/services";
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { getImageUrl } from "@/lib/image";
import { Star, ShieldCheck, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "@/components/product/ProductActions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await productsApi.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | Yachu Hair Oil`,
    description: (product.description || "")
      .replace(/<[^>]*>/g, "")
      .substring(0, 160),
  };
}

export async function generateStaticParams() {
  const products = await productsApi.getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await productsApi.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const price =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price || 0;
  const mrp = price + 200;
  const discount = Math.round((200 / mrp) * 100);

  const productSchema = generateProductSchema(product, `https://yachu.com.np/products/${product.slug}`);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "https://yachu.com.np/" },
    { name: "Products", item: "https://yachu.com.np/products" },
    { name: product.title, item: `https://yachu.com.np/products/${product.slug}` }
  ]);
  const schemas = [productSchema, breadcrumbSchema];

  return (
    <main className="pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-moss hover:text-forest transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> Back to collection
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-cream border border-border">
              <img
                src={getImageUrl(product.image1)}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {(product as any).image2 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden bg-cream border border-border">
                  <img
                    src={getImageUrl((product as any).image2)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                {(product as any).image3 && (
                  <div className="aspect-square rounded-2xl overflow-hidden bg-cream border border-border">
                    <img
                      src={getImageUrl((product as any).image3)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-bark text-xs font-semibold uppercase tracking-wider mb-4">
                In Stock
              </span>
              <h1 className="text-4xl md:text-5xl font-display text-forest mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 text-sm mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "fill-gold text-gold" : "text-border"}`}
                    />
                  ))}
                </div>
                <span className="text-foreground/60">4.8 (2,500+ reviews)</span>
                <span className="text-foreground/20">|</span>
                <div className="flex items-center gap-1.5 text-[oklch(0.55_0.15_240)]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-medium">Quality Guaranteed</span>
                </div>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-3xl font-bold text-forest">
                  Rs. {price}
                </span>
                <span className="text-xl text-foreground/40 line-through">
                  Rs. {mrp}
                </span>
                <span className="px-2 py-1 rounded-md bg-[oklch(0.92_0.06_145)] text-forest text-xs font-bold uppercase tracking-wider">
                  {discount}% OFF
                </span>
              </div>

              <div
                className="prose prose-stone max-w-none text-foreground/75 leading-relaxed mb-10"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              <div className="mt-8">
                <ProductActions product={product} />
              </div>
            </div>

            <div className="border-t border-border pt-8 mt-auto">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-forest text-sm uppercase tracking-wider mb-2">
                    Delivery
                  </h4>
                  <p className="text-sm text-foreground/60">
                    Fast delivery across Nepal. Cash on delivery available.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-forest text-sm uppercase tracking-wider mb-2">
                    Support
                  </h4>
                  <p className="text-sm text-foreground/60">
                    Contact us 24/7 for any hair care queries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
