import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://your-api-url.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor tanpa token
api.interceptors.request.use(
    config => {
        // Jika nanti ingin menambahkan email di header:
        // const email = localStorage.getItem('email');
        // if (email) {
        //     config.headers['X-User-Email'] = email;
        // }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);

export default api;
