import { fetcher } from "@/lib/api";
import type { TProduct, Prod } from "@/types";

export const productsApi = {
  getProducts: (): Promise<Prod> => fetcher<Prod>("/products/"),

  getProductBySlug: (slug: string): Promise<TProduct> =>
    fetcher<TProduct>(`/products/${slug}/`),
};
