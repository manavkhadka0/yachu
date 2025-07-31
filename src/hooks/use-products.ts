import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/services/api/products";
import { TProduct } from "@/types/product";

export const useProducts = () => {
  return useQuery<TProduct[], Error>({
    queryKey: ["products"],
    queryFn: productsApi.getProducts,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useProduct = (id: string) => {
  return useQuery<TProduct, Error>({
    queryKey: ["product", id],
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};