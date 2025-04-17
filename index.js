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
// Models
const Course = require('./models/Course');
const Seat = require('./models/Seat');

// Routes
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

// ✅ Home route to show backend is running
app.get('/', (req, res) => {
  res.send('Backend is running successfully 🚀');
});

app.post('/api/book', async (req, res) => {
  try {
    const { seatId, course, studentName } = req.body;
    
    const seat = await Seat.findOne({ _id: seatId, course });
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }
    
    if (seat.isBooked) {
      return res.status(400).json({ message: 'Seat already booked' });
    }
    
    seat.isBooked = true;
    seat.studentName = studentName;
    seat.bookedAt = new Date();
    
    await seat.save();
    res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});