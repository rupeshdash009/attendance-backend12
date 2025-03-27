const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  twelfthPassoutYear: { type: Number, required: true },
  percentage12th: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  seat: { type: String, required: true }, // Seat information
});

module.exports = mongoose.model("Booking", BookingSchema);
