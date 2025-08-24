import toast from "react-hot-toast";
import { useDisplayCartItems, useUpdateCartItem } from "../../../services/Cart/Hooks/useCart";
import { ICartProduct } from "../../../services/types";
import SpinnersCart from "../../../shared_components/SpinnersCart/SpinnersCart";
import { useQueryClient } from "@tanstack/react-query";

export default function Cart() {
  const { data, isLoading, error } = useDisplayCartItems();
  const { mutate: updateCartItem, isPending } = useUpdateCartItem();
  const queryClient = useQueryClient();

  const products: ICartProduct[] = data?.data?.data?.products || [];

  // Handle quantity update - use CART ITEM ID (_id), not product ID
  // const handleQuantityUpdate = (cartItemId: string, newQuantity: number) => {
  //   if (newQuantity < 1) {
  //     toast.error("Quantity cannot be less than 1");
  //     return;
  //   }

  //   updateCartItem(
  //     { id: cartItemId, quantity: newQuantity }, // Use cart item _id
  //     {
  //       onSuccess: () => {
  //         // Invalidate and refetch cart data
  //         queryClient.invalidateQueries({ queryKey: ["cart"] });
  //         toast.success("Cart updated successfully");
  //       },
  //       onError: (error) => {
  //         console.error("Error updating cart:", error);
  //         toast.error("Failed to update cart");
  //       },
  //     }
  //   );
  // };

  // Handle increment - use CART ITEM _id
  // const handleIncrement = (item: ICartProduct) => {
  //   handleQuantityUpdate(item._id, item.count + 1);
  // };

  // // Handle decrement - use CART ITEM _id
  // const handleDecrement = (item: ICartProduct) => {
  //   if (item.count > 1) {
  //     handleQuantityUpdate(item._id, item.count - 1);
  //   } else {
  //     toast.error("Quantity cannot be less than 1");
  //   }
  // };

  if (isLoading) return <SpinnersCart />;
  if (error) return <p className="text-red-600">Failed to load cart</p>;

  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-xl p-4 bg-white dark:bg-gray-900 lg:w-4/5 mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Shopping Cart
      </h2>

      <table className="w-full text-sm text-gray-500 dark:text-gray-300 border-collapse">
        <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-center">Image</th>
            <th className="px-6 py-3 text-left">Product</th>
            <th className="px-6 py-3 text-center">Qty</th>
            <th className="px-6 py-3 text-center">Price</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr
              key={item._id}
              className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700
              transition duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg"
            >
              {/* Image */}
              <td className="px-6 py-4 text-center">
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-16 md:w-20 lg:w-24 object-contain rounded-md mx-auto 
                    transition-transform duration-300 hover:scale-105"
                />
              </td>

              {/* Product Name */}
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left">
                {item.product.title}
              </td>

              {/* Quantity */}
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <button
                   
                    disabled={isPending || item.count <= 1}
                    className={`h-7 w-7 flex items-center justify-center rounded-full border 
                      border-gray-300 dark:border-gray-600 
                      text-gray-600 dark:text-gray-300
                      transition duration-200
                      ${item.count <= 1 || isPending 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer'
                      }`}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-base font-semibold rounded-md border 
                    border-gray-300 dark:border-gray-600 
                    bg-gray-50 dark:bg-gray-700 dark:text-white min-w-[3rem] text-center">
                    {isPending ? "..." : item.count}
                  </span>
                  <button
                    
                    disabled={isPending}
                    className={`h-7 w-7 flex items-center justify-center rounded-full border 
                      border-gray-300 dark:border-gray-600 
                      text-gray-600 dark:text-gray-300
                      transition duration-200
                      ${isPending 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer'
                      }`}
                  >
                    +
                  </button>
                </div>
              </td>

              {/* Price */}
              <td className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                ${item.price}
              </td>

              {/* Action */}
              <td className="px-6 py-4 text-center">
                <button className="text-red-600 dark:text-red-400 font-medium hover:underline transition duration-200">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}