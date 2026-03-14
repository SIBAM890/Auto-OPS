const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api.routes');

const app = express();

// Middleware
app.use(cors()); // Allow frontend to call backend
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api', apiRoutes);

// Root Endpoint (Check if server is alive)
app.get('/', (req, res) => {
    res.send('🤖 AutoFlow AI Backend is Running!');
});

module.exports = app;