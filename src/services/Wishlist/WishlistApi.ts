// Wishlist API

import apiClient from "../apiClient";
import { IAddToCartPayload, ICartItem, ICartResponse, IWishlistResponse } from "../types";



export async function displayWishlist(): Promise<IWishlistResponse> {
    const { data } = await apiClient.get<IWishlistResponse>("/wishlist");
    return data;
}




// ✅ add item to Wishlist
export async function addItemToWishlist(item: IAddToCartPayload): Promise<IWishlistResponse> {
    const { data } = await apiClient.post<IWishlistResponse>("/wishlist", item);
    return data;
}


// delete item from Wishlist
export async function deleteItemFromWishlist(itemId: string): Promise<IWishlistResponse> {
    const { data } = await apiClient.delete<IWishlistResponse>(`/wishlist/${itemId}`);
    return data;
}
