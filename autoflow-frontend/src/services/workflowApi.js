import axios from 'axios';

// ── Single API instance pointing at the Express backend ──────────────────────
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' },
});

// Generic response interceptor for logging
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const workflowApi = {
    // ── AI Workflow Generation ────────────────────────────────────────────────
    // POST /api/generate-workflow  →  workflow.controller.js → ai.service.js
    generate: async (description, fileContext = null) => {
        const response = await api.post('/generate-workflow', {
            userPrompt: description,
            fileContext,
        });
        return response.data;
    },

    // ── File Upload ───────────────────────────────────────────────────────────
    // POST /api/upload  →  upload.controller.js
    uploadFile: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    // ── Workflow Explanation ──────────────────────────────────────────────────
    // POST /api/explain-workflow  →  workflow.controller.js → ai.service.js
    explain: async (workflow) => {
        const response = await api.post('/explain-workflow', { workflow });
        return response.data;
    },

    // ── Message Simulation ────────────────────────────────────────────────────
    // POST /api/simulate-message  →  inline handler in api.routes.js
    simulate: async (message) => {
        const response = await api.post('/simulate-message', { message });
        return response.data;
    },

    // ── WhatsApp Bridge ───────────────────────────────────────────────────────
    // All WhatsApp routes live under /api/whatsapp/ on the same backend

    // GET  /api/whatsapp/status  →  whatsapp.controller.js
    getStatus: async () => {
        const response = await api.get('/whatsapp/status');
        return response.data;
    },

    // POST /api/whatsapp/deploy  →  whatsapp.controller.js
    deploy: async () => {
        const response = await api.post('/whatsapp/deploy');
        return response.data;
    },

    // POST /api/whatsapp/logout  →  whatsapp.controller.js
    logout: async () => {
        const response = await api.post('/whatsapp/logout');
        return response.data;
    },
};
