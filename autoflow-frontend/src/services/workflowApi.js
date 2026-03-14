import api from './api';

export const workflowApi = {
    // Generate a workflow from a text description
    generate: async (description, fileContext = null) => {
        const response = await api.post('/generate-workflow', { userPrompt: description, fileContext });
        return response.data;
    },

    // Upload a file for context
    uploadFile: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    // Explain a workflow JSON
    explain: async (workflow) => {
        const response = await api.post('/explain-workflow', { workflow });
        return response.data;
    },

    // Simulate a message to test the engine
    simulate: async (message) => {
        const response = await api.post('/simulate-message', { message });
        return response.data;
    },
};
