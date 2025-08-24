// import apiClient from "../apiClient";


import axios from "axios";
import apiClient from '../apiClient';

export function fetchProducts() {
    return apiClient.get('/products');
}

export function fetchProductById(productId) {
    return apiClient.get(`/products/${productId}`);
}
