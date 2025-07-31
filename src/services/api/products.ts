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

  async getProductById(id: string): Promise<TProduct> {
    try {
      const res = await fetch(`${BASE_API_URL}/products/${id}`, {
        next: { revalidate: 10 },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }
};