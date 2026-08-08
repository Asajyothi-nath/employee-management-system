import axios from "axios";

const axiosInstance = axios.create({

  baseURL:"http://localhost:8000/api"
});


// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

    if(token){

      config.headers.Authorization =`Bearer ${token}`;
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

    if(error.response.status === 403 && !originalRequest._retry){

      originalRequest._retry = true;

      try {

        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(

            "http://localhost:8000/api/auth/refresh-token",

            {
              refreshToken
            }
          );

        const newAccessToken = response.data.accessToken;

        localStorage.setItem("token",newAccessToken);

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