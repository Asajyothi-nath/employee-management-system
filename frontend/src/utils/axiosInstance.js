import axios from "axios";

// 1. Dynamically select between your live Render API path and your local development path
const BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  async(error) => {
    const originalRequest = error.config;
    if(error.response && error.response.status === 403 && !originalRequest._retry){
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // 2. Updated to use the dynamic BASE_URL variable so token refresh works in production
        const response = await axios.post(
            `${BASE_URL}/auth/refresh-token`,
            {
              refreshToken
            }
          );
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("token", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch(refreshError){
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
