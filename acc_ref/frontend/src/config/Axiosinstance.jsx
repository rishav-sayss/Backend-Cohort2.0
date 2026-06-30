import axios from "axios";

export let axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest.retry &&
      originalRequest.url !== "/auth/api/me"
    ) {
      originalRequest.retry = true;

      try {
        await axiosInstance.get("/auth/api/get-accessToken");

        return axiosInstance(originalRequest);
      } catch (error) {
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
