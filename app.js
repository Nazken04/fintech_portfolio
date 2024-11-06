require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/payment', paymentRoutes);

module.exports = app;
