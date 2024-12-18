import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:8000", // Set your API base URL https://blog-apprj-af984b28cb9f.herokuapp.com/ baseURL: "http://localhost:8000"
});

api.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });
  
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        try {
          const { data } = await api.post("/post/api/token/refresh/", { refresh: refreshToken });
          localStorage.setItem("accessToken", data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return axios(originalRequest);
        } catch (err) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // Redirect to login
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

export default api;
