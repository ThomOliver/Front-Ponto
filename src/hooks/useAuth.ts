import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

export function useAuth() {
  const { user, token, setAuth, clearAuth } = useAuthStore();

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      email,
      password,
    });

    const token = response.data.access_token;
    const user = { id: '', name: '', email };

    if (!token) {
      throw new Error('Nenhum token retornado pela API.');
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuth(user, token);
  };

  const logout = () => {
    delete axios.defaults.headers.common['Authorization'];
    clearAuth();
  };

  const isAuthenticated = () => !!token;

  const forgotPassword = async (email: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
      email,
    });
    return response.data;
  };

  const resetPassword = async (token: string, newPassword: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
      token,
      newPassword,
    });
    return response.data;
  };

  return { user, token, login, logout, isAuthenticated, forgotPassword, resetPassword };
}
