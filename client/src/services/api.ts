import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
