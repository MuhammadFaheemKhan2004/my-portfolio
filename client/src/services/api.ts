import axios from 'axios';

const RAW_API_BASE = (import.meta.env.VITE_API_URL || '').trim();
const DEFAULT_API_BASE = 'http://localhost:5000/api';
const FALLBACK_PRODUCTION_API_BASE = 'https://portfolio-ypt2.onrender.com/api';

const API_BASE =
    !RAW_API_BASE || RAW_API_BASE.includes('your-backend-service.onrender.com')
        ? (import.meta.env.PROD ? FALLBACK_PRODUCTION_API_BASE : DEFAULT_API_BASE)
        : RAW_API_BASE;

export const apiClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ProjectService = {
    getAll: () => apiClient.get('/projects'),
    getById: (id: string) => apiClient.get(`/projects/${id}`),
};

export const ContactService = {
    sendMessage: (data: {
        name: string;
        email: string;
        subject: string;
        message: string;
    }) => apiClient.post('/contact', data),
};

export const PortfolioService = {
    getAbout: () => apiClient.get('/about'),
    getSkills: () => apiClient.get('/skills'),
    getExperience: () => apiClient.get('/experience'),
};
