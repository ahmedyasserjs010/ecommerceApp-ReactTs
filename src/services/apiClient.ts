// apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1", // Base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor لإضافة التوكن تلقائيًا
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = `${token}`;
  }
  return config;
});

export default apiClient;
