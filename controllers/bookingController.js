const Booking = require('../models/Booking');

// Get all bookings for a specific course
exports.getBookings = async (req, res) => {
  try {
    const { course } = req.query;
    if (!course) {
      return res.status(400).json({ message: 'Course parameter is required' });
    }

    const bookings = await Booking.find({ course }).select('seatNumber');
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { course, seatNumber } = req.body;

    // Check if seat is already booked for this course
    const existingBooking = await Booking.findOne({ seatNumber, course });
    if (existingBooking) {
      return res.status(409).json({ message: `Seat ${seatNumber} is already booked for ${course}` });
    }

    // Validate 12th percentage
    if (req.body.percentage12th < 50) {
      return res.status(400).json({ message: 'Minimum 50% in 12th required for admission' });
    }

    // Validate passout year (assuming current year is 2023 for example)
    const currentYear = new Date().getFullYear();
    if (req.body.twelfthPassoutYear > currentYear) {
      return res.status(400).json({ message: 'Invalid passout year' });
    }

    const newBooking = new Booking(req.body);
    await newBooking.save();

    res.status(201).json({ 
      message: `Seat ${seatNumber} booked successfully for ${course}`,
      booking: newBooking 
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};