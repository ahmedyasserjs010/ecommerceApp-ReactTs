


import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesById,fetchCategories } from "../Brands-Categories_Api";


export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories
    });
}


export function useCategoryById(categoriesId) {
    return useQuery({
        queryKey: ["categories", categoriesId],
        queryFn: () => fetchCategoriesById(categoriesId)
    });
}

