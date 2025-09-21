// useCart.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addItemToCart,
    clearUserCart,
    deleteItemFromCart,
    getLoggedUserCart,
    updateItemCount,
} from "../CartApi";
import { ICartResponse, IAddToCartPayload } from "../../types";
import toast from "react-hot-toast";

// 🛒 Add to Cart
export function useAddToCart() {
    const queryClient = useQueryClient();
    
    return useMutation<ICartResponse, Error, IAddToCartPayload>({
        mutationFn: addItemToCart,
        onSuccess: (data) => {
            console.log("Add to cart success:", data);
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            // toast.success("Item added to cart successfully!");
        },
        onError: (error: any) => {
            console.error("Add to cart error:", error);
            // toast.error("Failed to add item to cart");
        },
    });
}

// 📦 Display Cart Items
export function useDisplayCartItems() {
    return useQuery<ICartResponse, Error>({
        queryKey: ["cart"],
        queryFn: getLoggedUserCart,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes (replaces cacheTime)
        refetchOnWindowFocus: false,
        retry: 2,
    });
}

// ❌ Remove specific item from Cart
export function useRemoveFromCart() {
    const queryClient = useQueryClient();
    
    return useMutation<ICartResponse, Error, string>({
        mutationFn: (itemId: string) => {
            console.log("Hook - Removing cart item:", itemId);
            return deleteItemFromCart(itemId);
        },
        onSuccess: (data, variables) => {
            console.log("Hook - Remove item success:", {
                removedData: data,
                removedItemId: variables
            });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error: any, variables) => {
            console.error("Hook - Remove from cart error:", {
                error: error,
                itemId: variables
            });
            toast.error("Failed to remove item from cart");
        },
    });
}

// ✏️ Update item count in Cart
export function useUpdateCartItem() {
    const queryClient = useQueryClient();
    
    return useMutation<ICartResponse, Error, { productId: string; count: number }>({
        mutationFn: ({ productId, count }) => {
            console.log("Hook - Updating cart item:", { productId, count });
            return updateItemCount(productId, count);
        },
        onSuccess: (data, variables) => {
            console.log("Hook - Update cart success:", {
                updatedData: data,
                variables
            });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error: any, variables) => {
            console.error("Hook - Update cart item error:", {
                error: error,
                variables
            });
            toast.error("Failed to update cart item");
        },
    });
}

// 🧹 Clear all Cart
export function useClearCart() {
    const queryClient = useQueryClient();
    
    return useMutation<ICartResponse, Error, void>({
        mutationFn: clearUserCart,
        onSuccess: (data) => {
            console.log("Clear cart success:", data);
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error: any) => {
            console.error("Clear cart error:", error);
            toast.error("Failed to clear cart");
        },
    });
}

// 📊 Get cart summary (derived data)
export function useCartSummary() {
    const { data } = useDisplayCartItems();
    
    const products = data?.data?.products || [];
    const totalItems = products.reduce((sum, item) => sum + item.count, 0);
    const totalPrice = data?.data?.totalCartPrice || 0;
    
    return {
        products,
        totalItems,
        totalPrice,
        isEmpty: products.length === 0,
    };
}