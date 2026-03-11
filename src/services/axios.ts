import axios from 'axios';
import Router from 'next/router';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { clearAuth } = useAuthStore.getState();
      clearAuth();
      Router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
