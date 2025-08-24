import apiClient from '../apiClient';

export function fetchCategories() {
    return apiClient.get("/categories");
}

export function fetchCategoriesById(categoriesId) {
    return apiClient.get(`/categories/${categoriesId}`);
}

export function fetchBrands() {
    return apiClient.get('/brands');
}

export function fetchBrandById(brandId) {
    return apiClient.get(`/brands/${brandId}`);
}
