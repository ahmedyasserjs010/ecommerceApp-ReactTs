import apiClient from "../apiClient";
import { IAddToCartPayload, ICartItem, ICartResponse } from "../types";


export async function getLoggedUserCart(): Promise<ICartResponse> {
    return await apiClient.get("/cart");
}

// ✅ add item to cart
export async function addItemToCart(item: IAddToCartPayload): Promise<ICartResponse> {
    const { data } = await apiClient.post<ICartResponse>("/cart", item);
    return data;
}

export async function deleteSpecificItemFromCart(itemId: string): Promise<ICartResponse> {
    return await apiClient.delete(`/cart/${itemId}`);
}

export async function updateItemInCart(item: ICartItem): Promise<ICartResponse> {
    return await apiClient.put(`/cart/${item.id}`, item);
}

export async function clearUserCart(): Promise<ICartResponse> {
    return await apiClient.delete("/cart");
}
