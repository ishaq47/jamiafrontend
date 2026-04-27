
import axios from 'axios';

// export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const API_URL = 'https://jamiabackend-ersd.onrender.com';

const API = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 15000,
});

API.interceptors.request.use(
  (config) => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const user = JSON.parse(stored);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (err) {
      console.error('Token error:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname;
      if (path !== '/login' && path !== '/register') {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;