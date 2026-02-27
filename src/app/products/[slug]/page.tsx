import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { productsApi } from "@/services/api/products";
import { Metadata } from "next";
import ProductDetail from "./product-details";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Product Details | Product ${slug}`,
    description: `Detailed information about our natural hair care product. High-quality ingredients and traditional craftsmanship.`,
    keywords: [
      "natural hair care",
      "organic product",
      "hair treatment",
      "beauty product",
      `product ${slug}`,
    ],
    openGraph: {
      title: `Product Details | Product ${slug}`,
      description: `Detailed information about our natural hair care product. High-quality ingredients and traditional craftsmanship.`,
      type: "website",
      images: [
        {
          url: "/og-product-detail.jpg",
          width: 1200,
          height: 630,
          alt: "Natural Hair Care Product Details",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Product Details | Product ${slug}`,
      description: `Detailed information about our natural hair care product.`,
      images: ["/og-product-detail.jpg"],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["product", slug],
      queryFn: () => productsApi.getProductBySlug(slug),
    }),
    queryClient.prefetchQuery({
      queryKey: ["products"],
      queryFn: productsApi.getProducts,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail params={params} />
    </HydrationBoundary>
  );
}