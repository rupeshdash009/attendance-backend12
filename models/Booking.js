const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({  // Ensure this variable is properly declared
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    passoutYear: { type: Number, required: true },
    percentage: { type: Number, required: true },
    seatNumber: { type: Number, required: true, unique: true },
});

const Booking = mongoose.model('Booking', bookingSchema);  // Correct usage
module.exports = Booking;  // Export the Booking model
