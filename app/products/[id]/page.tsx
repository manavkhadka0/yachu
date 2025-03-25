import { BASE_API_URL } from "@/utils/config";
import ProductDetailClient from "./ProductDetailClient";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

async function getProduct(id: string) {
  try {
    const res = await fetch(`${BASE_API_URL}/products/${id}`, {
      next: { revalidate: 10 },
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching Product", error);
    return null;
  }
}

const getProducts = async () => {
  try {
    const res = await fetch(BASE_API_URL + "/products", {
      next: { revalidate: 10 },
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching Products", error);
  }
};

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  const otherProducts = await getProducts();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Product not found
          </h1>
          <Link
            href="/products"
            className="mt-4 inline-flex items-center text-amber-600 hover:text-amber-500"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProductDetailClient product={product} otherProducts={otherProducts} />
  );
}
