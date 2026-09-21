// src/store/admin.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/api/api';
import router from '@/router';

interface Admin {
  id: number;
  email: string;
  name: string;
}

export const useAdminStore = defineStore('admin', () => {
  const token = ref<string | null>(localStorage.getItem('admin_token'));
  const admin = ref<Admin | null>(null);

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('admin_token', newToken);
  };

  const setAdmin = (adminData: Admin) => {
    admin.value = adminData;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/admin/auth/login', { email, password });
      const { token: newToken, admin: adminData } = response.data;
      setToken(newToken);
      setAdmin(adminData);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    token.value = null;
    admin.value = null;
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const fetchAdmin = async (): Promise<boolean> => {
    if (!token.value) return false;

    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
      const response = await api.get('/admin/auth/me');
      setAdmin(response.data.admin);
      return true;
    } catch {
      logout();
      return false;
    }
  };

  const isAuthenticated = () => !!token.value;

  return {
    token,
    admin,
    login,
    logout,
    fetchAdmin,
    isAuthenticated,
  };
});
