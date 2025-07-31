import { Metadata } from "next";
import ProductDetail from "./product-details";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Product Details | Product ${id}`,
    description: `Detailed information about our natural hair care product. High-quality ingredients and traditional craftsmanship.`,
    keywords: ["natural hair care", "organic product", "hair treatment", "beauty product", `product ${id}`],
    openGraph: {
      title: `Product Details | Product ${id}`,
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
      title: `Product Details | Product ${id}`,
      description: `Detailed information about our natural hair care product.`,
      images: ["/og-product-detail.jpg"], 
    },
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return <ProductDetail params={params} />;
}