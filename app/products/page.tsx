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
    <div className="bg-gradient-to-b from-white to-amber-50 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:py-20 lg:max-w-7xl lg:px-8">
        <div className="text-center mb-6 sm:mb-10 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl xl:text-6xl">
            Our Products
          </h1>
          <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-1 sm:px-2">
            Discover our range of natural hair care products crafted with love
            and tradition
          </p>
        </div>

        {/* Products grid with improved responsiveness */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products?.map((product: TProduct) => (
            <div
              key={product.id}
              className="transform transition duration-300 hover:scale-105"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty state with better responsiveness */}
        {products?.length === 0 && (
          <div className="text-center py-16 sm:py-24 lg:py-32 px-4">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-900">
              No products found
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-md mx-auto">
              Please check back later for our latest products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
