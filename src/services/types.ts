/// types.ts

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface Signup_Login_Response {
    message: string; // e.g. "success"
    user: {
    name: string;
    email: string;
    role: string; // "user" or "admin"
    };
    token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface IBrand {
  _id: string;
  name: string;
  image: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ISubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

//ANCHOR - Product


export interface IProduct {
  _id: string;
  title: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: ICategory;
  brand: IBrand;
  subcategory: ISubCategory[];
  ratingsAverage: number;
  id: string; // This is the actual product ID used for API calls
}

// This represents each item in the cart products array
export interface ICartProduct {
  count: number; // Quantity of this product in cart
  _id: string;   // This is the cart item ID (not product ID!)
  product: IProduct; // Full product details
  price: number; // Price for this cart item
}

export interface ICartData {
  _id: string;
  cartOwner: string;
  products: ICartProduct[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: ICartData;
}

// For updating cart item quantity - use CART ITEM ID!
export interface ICartItem {
  id: string;        // This should be the CART ITEM ID (item._id), NOT product ID
  quantity?: number; // New quantity to set
}

// For adding new items to cart - use product ID
export interface IAddToCartPayload {
  productId: string; // This should be the actual product ID (item.product.id)
  count?: number;    // Initial quantity when adding
}