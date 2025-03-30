require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db'); // Ensure this path is correct

connectDB();

const app = express();

// Middleware
app.use(express.json());

// ✅ Correct CORS Configuration
app.use(
  cors({
    origin: ['http://localhost:5173'], // Allow frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Enable cookies/auth headers
  })
);

// ✅ Fixed Signup Endpoint (Correct Route Path)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/booking', require('./routes/bookingRoutes')); // Ensure this path is correct

// Central error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
