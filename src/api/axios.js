import axios from 'axios';
export const API_URL = 'https://jamiabackend-ersd.onrender.com';
// export const API_URL = 'http://localhost:5000';

const API = axios.create({
  baseURL: `${API_URL}/api`,
});


API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default API;
