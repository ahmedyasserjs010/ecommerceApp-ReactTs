// guestStorage.ts - خدمة التخزين المحلي للزوار

export interface GuestCartItem {
  productId: string;
  count: number;
  product: {
    id: string;
    _id: string;
    title: string;
    price: number;
    imageCover: string;
    category?: { name: string };
    brand?: { name: string };
  };
}

export interface GuestWishlistItem {
  productId: string;
  product: {
    id: string;
    _id: string;
    title: string;
    price: number;
    imageCover: string;
    category?: { name: string };
    brand?: { name: string };
  };
}

const GUEST_CART_KEY = 'guest_cart';
const GUEST_WISHLIST_KEY = 'guest_wishlist';

// ==================== CART ====================

export function getGuestCart(): GuestCartItem[] {
  try {
    const cart = localStorage.getItem(GUEST_CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

export function setGuestCart(cart: GuestCartItem[]): void {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
}

export function addToGuestCart(item: GuestCartItem): GuestCartItem[] {
  const cart = getGuestCart();
  const existingIndex = cart.findIndex(i => i.productId === item.productId);
  
  if (existingIndex !== -1) {
    cart[existingIndex].count += item.count || 1;
  } else {
    cart.push({ ...item, count: item.count || 1 });
  }
  
  setGuestCart(cart);
  return cart;
}

export function updateGuestCartItem(productId: string, count: number): GuestCartItem[] {
  const cart = getGuestCart();
  const index = cart.findIndex(i => i.productId === productId);
  
  if (index !== -1) {
    if (count <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].count = count;
    }
  }
  
  setGuestCart(cart);
  return cart;
}

export function removeFromGuestCart(productId: string): GuestCartItem[] {
  const cart = getGuestCart().filter(i => i.productId !== productId);
  setGuestCart(cart);
  return cart;
}

export function clearGuestCart(): void {
  localStorage.removeItem(GUEST_CART_KEY);
}

// ==================== WISHLIST ====================

export function getGuestWishlist(): GuestWishlistItem[] {
  try {
    const wishlist = localStorage.getItem(GUEST_WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  } catch {
    return [];
  }
}

export function setGuestWishlist(wishlist: GuestWishlistItem[]): void {
  localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
}

export function addToGuestWishlist(item: GuestWishlistItem): GuestWishlistItem[] {
  const wishlist = getGuestWishlist();
  const exists = wishlist.some(i => i.productId === item.productId);
  
  if (!exists) {
    wishlist.push(item);
    setGuestWishlist(wishlist);
  }
  
  return wishlist;
}

export function removeFromGuestWishlist(productId: string): GuestWishlistItem[] {
  const wishlist = getGuestWishlist().filter(i => i.productId !== productId);
  setGuestWishlist(wishlist);
  return wishlist;
}

export function clearGuestWishlist(): void {
  localStorage.removeItem(GUEST_WISHLIST_KEY);
}

// ==================== SYNC ====================

export function hasGuestData(): boolean {
  return getGuestCart().length > 0 || getGuestWishlist().length > 0;
}

export function clearAllGuestData(): void {
  clearGuestCart();
  clearGuestWishlist();
}
