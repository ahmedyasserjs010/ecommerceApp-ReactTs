// apiClient.ts
import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://ecommerce.routemisr.com/api/v1", // Base URL
    headers: {
    "Content-Type": "application/json",
    },
});

export default apiClient;
