// src/api/axiosInstance.ts
import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "https://api-sandbox-v1.moniass.com/", // change this to your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
