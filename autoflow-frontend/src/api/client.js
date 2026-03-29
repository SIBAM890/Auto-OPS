import axios from 'axios';

// ── Canonical Axios client for the Express backend ───────────────────────────
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Workflow API ──────────────────────────────────────────────────────────────
// These mirror the routes in autoflow-backend/src/routes/api.routes.js
export const workflowAPI = {
  generate: (userPrompt, fileContext = null) =>
    api.post('/generate-workflow', { userPrompt, fileContext }),
  explain: (workflow) =>
    api.post('/explain-workflow', { workflow }),
  simulate: (message) =>
    api.post('/simulate-message', { message }),
};

// ── File Upload API ───────────────────────────────────────────────────────────
export const inventoryAPI = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// ── WhatsApp API ──────────────────────────────────────────────────────────────
export const whatsappAPI = {
  status: () => api.get('/whatsapp/status'),
  deploy: () => api.post('/whatsapp/deploy'),
  logout: () => api.post('/whatsapp/logout'),
};

