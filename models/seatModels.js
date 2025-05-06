const mongoose = require('mongoose');

// Seat Schema
const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },  // Seat number (e.g., A1, B2, etc.)
  course: { type: String, required: true },     // Course name (BBA, BCA, etc.)
  isBooked: { type: Boolean, default: false },  // To track if the seat is booked or not
});

// Seat Booking Schema
const seatBookingSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },  // Seat number (e.g., A1, B2, etc.)
  course: { type: String, required: true },     // Course name (BBA, BCA, etc.)
  name: { type: String, required: true },       // Name of the person booking the seat
  phone: { type: String, required: true },      // Phone number of the person booking the seat
  email: { type: String, required: true },      // Email address of the person booking the seat
  passoutYear: { type: String, required: true }, // Year of graduation
  percentage: { type: Number, required: true },  // Percentage of the person
});

// Models
const Seat = mongoose.model('Seat', seatSchema);
const SeatBooking = mongoose.model('SeatBooking', seatBookingSchema);

module.exports = { Seat, SeatBooking };
