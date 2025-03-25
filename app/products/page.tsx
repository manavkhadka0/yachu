import { BASE_API_URL } from "@/utils/config";
import ProductCard from "@/components/product/ProductCard";
import { TProduct } from "@/types/product";

const getProducts = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/products`, {
      next: { revalidate: 10 },
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching Products", error);
    return [];
  }
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-gradient-to-b from-white to-amber-50">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium tracking-wider uppercase mb-4">
            Our Collection
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Our Products
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our range of natural hair care products crafted with love
            and tradition
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products?.length === 0 && (
          <div className="text-center py-32">
            <h3 className="text-2xl font-semibold text-gray-900">
              No products found
            </h3>
            <p className="mt-2 text-gray-500">
              Please check back later for our latest products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
