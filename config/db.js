// /config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Optional, if not already in index.js

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://rupeshdash20:2W4LNi93lZk93mBd@cluster0.gt8be.mongodb.net", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB; // <<< You forgot this most likely
