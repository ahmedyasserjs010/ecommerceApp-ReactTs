import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "../ProductsApi";


export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}

export function useProductById(productId) {
  return useQuery({
    queryKey: ['productsId', productId],
    queryFn: () => fetchProductById(productId),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}
