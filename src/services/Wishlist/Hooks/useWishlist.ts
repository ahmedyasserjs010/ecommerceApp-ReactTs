// Wishlist Hooks - TypeScript version
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addItemToWishlist, deleteItemFromWishlist, displayWishlist } from "../WishlistApi";
import { IWishlistResponse } from "../../types";

// ✅ Define types for wishlist item and response
export interface WishlistItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistItem[];
}

// ✅ Type for mutation input
interface AddToWishlistInput {
  productId: string;
}

// Hook for adding item to wishlist
export function useAddToWishlist() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, AddToWishlistInput, { previousWishlist?: WishlistResponse }>({ // { previousWishlist?: IWishlistResponse } => ( context ) => هنا كلمة context معناها "كائن بيتنقل بين callbacks بتاعة الـ mutation".
    mutationFn: addItemToWishlist,

    /* ⁡⁣⁢⁣onMutate⁡
    بتشتغل مباشرةً قبل ما يشتغل 
    mutationFn.
    بنستخدمها علشان نعمل حاجة اسمها 
    ⁡⁣⁢⁣Optimistic Update⁡
    */
    onMutate: (data) => {
      // Get current wishlist data
      const previousWishlist = queryClient.getQueryData<WishlistResponse>(["DisplayWishlist"]);

      /**
      
      إنشاء عنصر جديد (في حالة optimistic update)
      wishlist بنبني عنصر جديد للـ
      productId بالـ 
      mutation اللي جاي من الـ 
       */
      const updatedWishlistItem: WishlistItem = {
        id: data.productId,
        productId: data.productId,
        quantity: 1,
      };

      // Update the cache optimistically تحديث الكاش Optimistically
      queryClient.setQueryData<WishlistResponse>(["DisplayWishlist"], (old) => {
        // لو old = undefined
        // (يعني مفيش wishlist متخزنة)، 
        // بنبني واحدة جديدة فيها المنتج ده.
        if (!old) {
          // If no existing wishlist, create a new one with proper structure
          return {
            status: "success",
            count: 1,
            data: [updatedWishlistItem],
          };
        }

        // Check if item already exists in wishlist
        const existingItemIndex = old.data.findIndex(
          (item) => item.id === data.productId || item.productId === data.productId
        );

        let newData: WishlistItem[];
        if (existingItemIndex !== -1) {
          // Update existing item
          newData = [...old.data];
          // newData[existingItemIndex] = {
          //   ...newData[existingItemIndex],
          //   quantity: (newData[existingItemIndex].quantity || 0) + 1,
          // };
        } else {
          // Add new item
          newData = [...old.data, updatedWishlistItem];
        }

        return {
          ...old,
          count: newData.length,
          data: newData,
        };
      });

      return { previousWishlist };
    },

    onError: (_error, _variables, context) => {
      // Revert to previous state on error
      if (context?.previousWishlist) {
        queryClient.setQueryData(["DisplayWishlist"], context.previousWishlist);
      }
    },

    onSuccess: () => {
      // Invalidate wishlist query to refetch updated data
      queryClient.invalidateQueries({
        queryKey: ["DisplayWishlist"],
      });
    },
  });
}

// Hook for displaying wishlist
export function useDisplayWishlist() {
  return useQuery<IWishlistResponse>({
    queryKey: ["DisplayWishlist"],
    queryFn: displayWishlist,
  });
}



//ANCHOR -   Delete item From Wishlist
export function useDeleteFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, string, { previousWishlist?: IWishlistResponse }>({ 
    mutationFn: deleteItemFromWishlist,

    onMutate: (itemId) => {
      // Get current wishlist data
      const previousWishlist = queryClient.getQueryData<IWishlistResponse>(["DisplayWishlist"]);

      // Optimistically update the wishlist
      queryClient.setQueryData<IWishlistResponse>(["DisplayWishlist"], (old) => {
        if (!old) return;

        return {
          ...old,
          count: old.count - 1,
          data: old.data.filter((item) => item.id !== itemId),
        };
      });

      return { previousWishlist };
    },

    onError: (_error, _variables, context) => {
      // Revert to previous state on error
      if (context?.previousWishlist) {
        queryClient.setQueryData(["DisplayWishlist"], context.previousWishlist);
      }
    },

    onSuccess: () => {
      // Invalidate wishlist query to refetch updated data
      queryClient.invalidateQueries({
        queryKey: ["DisplayWishlist"],
      });
    },
  });
}