import ProductShowcase from "@/components/product/product-showcase";
import { TProduct } from "@/types/product";

interface OtherProductsSectionProps {
  products: TProduct[];
  isLoading: boolean;
}

export const OtherProductsSection = ({ 
  products, 
  isLoading 
}: OtherProductsSectionProps) => {
  // Don't show the section if there are no products and not loading
  if (!isLoading && (!products || products.length === 0)) {
    return null;
  }

  return (
    <div className="bg-card py-16">
      <ProductShowcase
        products={products}
        isLoading={isLoading}
        error={null}
        title="Other Products"
        subtitle="Explore more of our natural hair care collection"
        showHeader={true}
        className="!pb-0"
      />
    </div>
  );
};