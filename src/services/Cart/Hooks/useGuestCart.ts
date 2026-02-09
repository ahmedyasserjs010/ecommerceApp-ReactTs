// useGuestCart.ts - Hook للتعامل مع سلة الزوار

import { useState, useEffect, useCallback } from 'react';
import {
  GuestCartItem,
  getGuestCart,
  addToGuestCart,
  updateGuestCartItem,
  removeFromGuestCart,
  clearGuestCart,
} from '../../GuestStorage/guestStorage';

export function useGuestCart() {
  const [guestCart, setGuestCartState] = useState<GuestCartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    setGuestCartState(getGuestCart());
  }, []);

  const addItem = useCallback((item: GuestCartItem) => {
    const updatedCart = addToGuestCart(item);
    setGuestCartState(updatedCart);
    return updatedCart;
  }, []);

  const updateItem = useCallback((productId: string, count: number) => {
    const updatedCart = updateGuestCartItem(productId, count);
    setGuestCartState(updatedCart);
    return updatedCart;
  }, []);

  const removeItem = useCallback((productId: string) => {
    const updatedCart = removeFromGuestCart(productId);
    setGuestCartState(updatedCart);
    return updatedCart;
  }, []);

  const clearCart = useCallback(() => {
    clearGuestCart();
    setGuestCartState([]);
  }, []);

  const totalItems = guestCart.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = guestCart.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  return {
    guestCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    isEmpty: guestCart.length === 0,
  };
}
