const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api.routes');

const app = express();

// Middleware
// Allow the Vite dev server and any local origin to call the backend
app.use(cors({
    origin: [
        'http://localhost:5173',   // Vite dev server
        'http://localhost:5174',   // Vite alternate port
        'http://localhost:3000',   // Same-origin (backend itself)
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api', apiRoutes);

// Root Endpoint (Check if server is alive)
app.get('/', (req, res) => {
    res.send('🤖 AutoFlow AI Backend is Running! Visit /api for routes.');
});

module.exports = app;