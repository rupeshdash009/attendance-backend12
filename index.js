require('dotenv').config(); // At the VERY TOP of your file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Environment variables check
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in environment variables');
  process.exit(1);
}

// Middleware
app.use(express.json());

// Enhanced CORS configuration
app.use(cors({
  origin: 'https://attendance-portal01.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // If you need to handle cookies/auth headers
}));

// Improved MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1); // Exit with failure
  }
};

// Connect to MongoDB before starting the server
connectDB();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Signup endpoint with better error handling
app.post('https://attendance-backend12.onrender.com/api/auth/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    
    // TODO: Add your actual signup logic here
    // Example: const user = await User.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Signup successful',
      // user: user // Include created user if needed
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Signup failed',
      error: error.message
    });
  }
});

// Central error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});