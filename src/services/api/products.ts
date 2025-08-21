import { BASE_API_URL } from "@/utils/config";
import { TProduct } from "@/types/product";

export const productsApi = {
  async getProducts(): Promise<TProduct[]> {
    try {
      const res = await fetch(`${BASE_API_URL}/products/`, {
        next: { revalidate: 10 },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  async getProductBySlug(slug: string): Promise<TProduct> {
    try {
      const res = await fetch(`${BASE_API_URL}/products/${slug}`, {
        next: { revalidate: 10 },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error(`Error fetching product ${slug}:`, error);
      throw error;
    }
  }
};