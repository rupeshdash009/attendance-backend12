require('dotenv').config(); // Add this at the VERY TOP of your file
const express = require('express');
const mongoose = require('mongoose');
const app = express();
console.log('ENV:', process.env); 

// Middleware
app.use(express.json());

// MongoDB Connection
const PORT = process.env.PORT || 5000;

// Add connection error handling
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  });