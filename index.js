require('dotenv').config(); // Add this at the VERY TOP of your file
const express = require('express');
const mongoose = require('mongoose');
const app = express();
console.log('ENV:', process.env); 
const cors = require("cors");


// Middleware
app.use(express.json());

// MongoDB Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

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

  // Allow requests from your frontend (Vercel domain)
  app.use(cors());

  // ✅ Test Route to check CORS
  app.get("/test", (req, res) => {
    res.json({ message: "CORS is working!" });
  });