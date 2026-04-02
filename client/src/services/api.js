import axios from 'axios';

const RAW_API_BASE = (import.meta.env.VITE_API_URL || '').trim();
const DEFAULT_API_BASE = 'http://localhost:5000/api';
const FALLBACK_PRODUCTION_API_BASE = 'https://portfolio-ypt2.onrender.com/api';

const API_BASE =
    !RAW_API_BASE || RAW_API_BASE.includes('your-backend-service.onrender.com')
        ? (import.meta.env.PROD ? FALLBACK_PRODUCTION_API_BASE : DEFAULT_API_BASE)
        : RAW_API_BASE;

const apiClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ProjectService = {
    getAll: () => apiClient.get('/projects'),
    getById: (id) => apiClient.get(`/projects/${id}`),
    create: (data) => apiClient.post('/projects', data),
    update: (id, data) => apiClient.put(`/projects/${id}`, data),
    delete: (id) => apiClient.delete(`/projects/${id}`),
};

export const ContactService = {
    sendMessage: (data) => apiClient.post('/contact', data),
    getAll: () => apiClient.get('/contact'),
    markAsRead: (id) => apiClient.put(`/contact/${id}`, { read: true }),
    delete: (id) => apiClient.delete(`/contact/${id}`),
};

export const PortfolioService = {
    getStats: () => apiClient.get('/stats'),
    getProfile: () => apiClient.get('/profile'),
};

export default apiClient;
