// server.js or app.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Import and use routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/accounts', require('./routes/accountRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// Basic test route to verify API
app.get('/api', (req, res) => {
    res.send('API is running...');
});
console.log('Using auth routes at /api/auth');
app.use('/api/auth', require('./routes/authRoutes'));
// Start server on the defined PORT or fallback to 5008
const PORT = process.env.PORT || 5018;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
