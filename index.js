require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db'); // Ensure this path is correct

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS Configuration
app.use(
  cors({
    origin: ['http://localhost:5173'], // Allow frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Enable cookies/auth headers
  })
);

// ✅ Connect to Database (with environment variable)
const MONGO_URI = process.env.MONGO_URI || "your_default_connection_string_here";
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/booking', require('./routes/bookingRoutes')); // Ensure this path is correct

// Example route to fetch seats
app.get('/api/seats', async (req, res) => {
  try {
    const { course } = req.query;
    if (!course) {
      return res.status(400).json({ message: 'Course is required' });
    }

    const seats = await Seat.find({ course });
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('Backend is running successfully 🚀');
});

// Central error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
