// CartApi.ts

import apiClient from "../apiClient";
import { IAddToCartPayload, ICartItem, ICartResponse } from "../types";

// ✅ Get logged user cart
export async function getLoggedUserCart(): Promise<ICartResponse> {
    const { data } = await apiClient.get<ICartResponse>("/cart");
    return data;
}

// ✅ Add item to cart
export async function addItemToCart(item: IAddToCartPayload): Promise<ICartResponse> {
    const payload = {
        productId: item.productId,
        count: item.count?.toString() || "1" // Convert to string, default to "1"
    };
    const { data } = await apiClient.post<ICartResponse>("/cart", payload);
    return data;
}

// ❌ Delete specific item from cart
export async function deleteItemFromCart(productId: string): Promise<ICartResponse> {
    const { data } = await apiClient.delete<ICartResponse>(`/cart/${productId}`);
    return data;
}

// ✏️ Update item quantity in cart
export async function updateItemCount(productId: string, count: number): Promise<ICartResponse> {
    const { data } = await apiClient.put<ICartResponse>(`/cart/${productId}`, { 
        count: count.toString()
    });
    return data;
}

// ✅ Clear entire cart
export async function clearUserCart(): Promise<ICartResponse> {
    const { data } = await apiClient.delete<ICartResponse>("/cart");
    return data;
}