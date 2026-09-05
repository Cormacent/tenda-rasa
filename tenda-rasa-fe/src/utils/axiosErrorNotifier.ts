// Nyalakan sekali di main.ts. Semua store masih pakai `axios` default langsung
// (bukan instance terpisah), jadi interceptor di sini otomatis berlaku untuk
// semua request REST di aplikasi tanpa perlu edit tiap store satu-satu.
import axios from 'axios';
import { ElMessage } from 'element-plus';

axios.interceptors.response.use(
  response => response,
  error => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan, coba lagi.';
    ElMessage.error(message);
    return Promise.reject(error);
  }
);
