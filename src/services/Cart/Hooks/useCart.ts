// src/features/cart/hooks/useCart.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addItemToCart,
  clearUserCart,
  deleteSpecificItemFromCart,
  getLoggedUserCart,
  updateItemInCart,
} from "../CartApi";

import { ICartResponse, ICartItem, IAddToCartPayload } from "../../types";

// 🛒 Add to Cart
export function useAddToCart() {
  const queryClient = useQueryClient();
  
  return useMutation<ICartResponse, Error, IAddToCartPayload>({
    mutationFn: addItemToCart,
    onSuccess: () => {
      // Invalidate cart query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// 📦 Display Cart
export function useDisplayCartItems() {
  return useQuery<ICartResponse, Error>({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
    staleTime: 0, // Always consider data stale to ensure fresh updates
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });
}

// ❌ Remove specific item from Cart
export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  
  return useMutation<ICartResponse, Error, string>({
    mutationFn: deleteSpecificItemFromCart,
    onSuccess: () => {
      // Invalidate cart query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// ✏️ Update quantity of item in Cart
export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  
  return useMutation<ICartResponse, Error, ICartItem>({
    mutationFn: updateItemInCart,
    
    onSuccess: () => {
      // Invalidate cart query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// 🧹 Clear all Cart
export function useClearCart() {
  const queryClient = useQueryClient();
  
  return useMutation<ICartResponse, Error>({
    mutationFn: clearUserCart,
    onSuccess: () => {
      // Invalidate cart query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}