const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  studentName: String,
  bookedAt: Date
});

module.exports = mongoose.model('Seat', seatSchema);
