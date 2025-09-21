import toast from "react-hot-toast";
import { useDisplayCartItems, useUpdateCartItem, useRemoveFromCart, useClearCart } from "../../../services/Cart/Hooks/useCart";
import { ICartProduct } from "../../../services/types";
import SpinnersCart from "../../../shared_components/SpinnersCart/SpinnersCart";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import emptyCart from "../../../assets/images/emptyCart1.png"
import { Link } from "react-router-dom";

export default function Cart() {
  const { data, isLoading, error } = useDisplayCartItems();
  const { mutate: updateCartItem, isPending: isUpdating } = useUpdateCartItem();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();
  const { mutate: clearCart, isPending: isClearing } = useClearCart();

  const products: ICartProduct[] = data?.data?.products || [];
  const totalCartPrice = data?.data?.totalCartPrice || 0;

  // Calculate totals
  const subtotal = products.reduce((total, item) => total + (item.price * item.count), 0);
  const shipping = subtotal > 0 ? 0 : 0; // Free shipping
  const total = subtotal + shipping;

  // Handle quantity update - using productId as in original Cart 1
  const handleQuantityUpdate = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }

    console.log("Cart Component - updating item:", { productId, newQuantity });

    updateCartItem(
      { productId, count: newQuantity },
      {
        onSuccess: (data) => {
          console.log("Update success:", data);
          toast.success("Cart updated successfully");
        },
        onError: (error: any) => {
          console.error("Error updating cart:", error);
          toast.error("Failed to update cart");
        },
      }
    );
  };

  // Handle increment - use product ID from item.product.id
  const handleIncrement = (item: ICartProduct) => {
    handleQuantityUpdate(item.product.id, item.count + 1);
  };

  // Handle decrement - use product ID from item.product.id
  const handleDecrement = (item: ICartProduct) => {
    if (item.count > 1) {
      handleQuantityUpdate(item.product.id, item.count - 1);
    } else {
      toast.error("Quantity cannot be less than 1");
    }
  };

  // Handle remove item - use cart item ID (item._id)
  const handleRemoveItem = (productId: string, productTitle: string) => {
    console.log("Cart Component - removing item:", productId);

    removeFromCart(productId, {
      onSuccess: (data) => {
        console.log("Remove success:", data);
        toast.success(`${productTitle} removed from cart`);
      },
      onError: (error: any) => {
        console.error("Error removing item:", error);
        toast.error("Failed to remove item");
      },
    });
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (products.length === 0) {
      toast.error("Cart is already empty");
      return;
    }

    if (window.confirm("Are you sure you want to clear all items from your cart?")) {
      clearCart(undefined, {
        onSuccess: (data) => {
          console.log("Clear cart success:", data);
          toast.success("Cart cleared successfully");
        },
        onError: (error: any) => {
          console.error("Error clearing cart:", error);
          toast.error("Failed to clear cart");
        },
      });
    }
  };

  if (isLoading) return <SpinnersCart />;
  if (error) return <p className="text-red-600 text-center">Failed to load cart</p>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="text-green-600 text-2xl">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
          </div>

          {products.length > 0 && (
            <button
              onClick={handleClearCart}
              disabled={isClearing}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isClearing ? "Clearing..." : "Clear Cart"}
            </button>
          )}
        </div>

        {products.length > 0 ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">

            {/* Products List */}
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {products.map((item) => {
                  console.log("Rendering cart item:", {
                    cartItemId: item._id,
                    productId: item.product.id,
                    productTitle: item.product.title,
                    count: item.count
                  });

                  return (
                    <div
                      key={item._id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                    >
                      <div className="flex items-center gap-6">

                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="w-30 h-30 object-cover rounded-lg border border-gray-200 dark:border-gray-600 transition-transform duration-300 hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-image.jpg';
                            }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {item.product.title}
                          </h3>
                          {item.product.brand && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                              Brand: {item.product.brand.name}
                            </p>
                          )}
                          {item.product.category && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              Category: {item.product.category.name}
                            </p>
                          )}
                          <p className="text-green-600 dark:text-green-400 font-bold text-lg">
                            ${item.price.toFixed(2)}
                          </p>
                          {/* <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            Product ID: {item.product.id} | Cart Item ID: {item._id}
                          </p> */}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleDecrement(item)}
                            disabled={isUpdating || isRemoving || item.count <= 1}
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-medium transition-all duration-200 ${item.count <= 1 || isUpdating || isRemoving
                                ? 'border-gray-200 text-gray-300 cursor-not-allowed dark:border-gray-600 dark:text-gray-600'
                                : 'border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-500 dark:border-gray-500 dark:text-gray-300'
                              }`}
                          >
                            −
                          </button>

                          <span className="min-w-[3rem] text-center text-lg font-semibold text-gray-900 dark:text-white px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                            {item.count}
                          </span>

                          <button
                            onClick={() => handleIncrement(item)}
                            disabled={isUpdating || isRemoving}
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-medium transition-all duration-200 ${isUpdating || isRemoving
                                ? 'border-gray-200 text-gray-300 cursor-not-allowed dark:border-gray-600 dark:text-gray-600'
                                : 'border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-500 dark:border-gray-500 dark:text-gray-300'
                              }`}
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.product.id, item.product.title)}
                          disabled={isRemoving || isUpdating}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Order Summary
                </h2>

                <div className="space-y-4">

                  {/* Items Count */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Total Items:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {products.reduce((total, item) => total + item.count, 0)}
                    </span>
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Shipping:</span>
                    <span className="font-semibold text-green-600">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-600" />

                  {/* Total */}
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">Total:</span>
                    <span className="text-green-600 dark:text-green-400">
                      ${totalCartPrice.toFixed(2)}
                    </span>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-8">
                  <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-colors duration-200">
                    Continue Shopping
                  </button>

                  <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors duration-200"
                    disabled={isUpdating || isRemoving}
                  >
                    {isUpdating || isRemoving ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </div>

              </div>
            </div>

          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-100">
              Your cart is empty , <span className="text-gray-600 dark:text-gray-400 mb-8 text-xl">You haven't added anything to your cart yet.</span>
            </h3>
             <Link 
      to="/products" 
      className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
     Go to add Products
    </Link>
            <div className="max-w-md mx-auto mt-4">
              <img src={emptyCart} alt="" className=" rounded-full " />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}