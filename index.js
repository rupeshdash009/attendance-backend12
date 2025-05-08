// Import necessary modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

// Models
const { Seat, SeatBooking } = require('./models/seatModels');
// Routes
const seatRoutes = require('./routes/seats');
const authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173", // Frontend local dev
    "https://attendance-portal01.vercel.app", // Production URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Database connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://rupeshdash20:2W4LNi93lZk93mBd@cluster0.gt8be.mongodb.net";
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes for Auth and Seat Management
app.use('/api/auth', authRoutes);
app.use('/api/seats', seatRoutes);

// Route to get booked seats for a specific course (BBA/BCA)
app.get('/api/seats/:course', async (req, res) => {
  const { course } = req.params;
  try {
    const bookedSeats = await getBookedSeats(course);
    res.json(bookedSeats); // Send the booked seats as JSON
  } catch (error) {
    console.error('Error fetching booked seats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to book a seat (send booking data and seat number)
app.post('/api/book-seat', async (req, res) => {
  const { seatNumber, course, name, phone, email, passoutYear, percentage } = req.body;
  try {
    const newBooking = new SeatBooking({
      seatNumber,
      course,
      name,
      phone,
      email,
      passoutYear,
      percentage,
    });

    await newBooking.save();
    res.status(201).json({ message: "Seat booked successfully" });
  } catch (error) {
    console.error("❌ Error saving booking:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Default route for basic check
app.get('/', (req, res) => {
  res.send('✅ Backend is running successfully 🚀');
});

app.use('/api/users', userRoutes);
// Centralized error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
