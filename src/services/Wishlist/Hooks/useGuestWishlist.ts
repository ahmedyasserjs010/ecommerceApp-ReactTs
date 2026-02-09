// useGuestWishlist.ts - Hook للتعامل مع قائمة أمنيات الزوار

import { useState, useEffect, useCallback } from 'react';
import {
  GuestWishlistItem,
  getGuestWishlist,
  addToGuestWishlist,
  removeFromGuestWishlist,
  clearGuestWishlist,
} from '../../GuestStorage/guestStorage';

export function useGuestWishlist() {
  const [guestWishlist, setGuestWishlistState] = useState<GuestWishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    setGuestWishlistState(getGuestWishlist());
  }, []);

  const addItem = useCallback((item: GuestWishlistItem) => {
    const updatedWishlist = addToGuestWishlist(item);
    setGuestWishlistState(updatedWishlist);
    return updatedWishlist;
  }, []);

  const removeItem = useCallback((productId: string) => {
    const updatedWishlist = removeFromGuestWishlist(productId);
    setGuestWishlistState(updatedWishlist);
    return updatedWishlist;
  }, []);

  const clearWishlist = useCallback(() => {
    clearGuestWishlist();
    setGuestWishlistState([]);
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return guestWishlist.some(item => item.productId === productId);
  }, [guestWishlist]);

  return {
    guestWishlist,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    count: guestWishlist.length,
    isEmpty: guestWishlist.length === 0,
  };
}
