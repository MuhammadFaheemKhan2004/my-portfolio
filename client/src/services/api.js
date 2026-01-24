import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
