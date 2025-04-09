// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;

// Response interceptor to auto-refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
     
      if (isRefreshing) {
        return Promise.reject(error); // Prevent multiple refresh attempts
      }
     
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.get('http://localhost:3000/auth/refresh', {
          withCredentials: true
        });

        const newToken = res.data.accessToken;
        localStorage.setItem('token', newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        isRefreshing = false;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Session expired. Please log in again.");
        localStorage.clear()

        if (window.location.pathname !== "/") {
          window.location.href = "/"; // Redirect to login page
        }

      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
