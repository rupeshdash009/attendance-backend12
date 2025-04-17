const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Get all bookings for a course
router.get('/', bookingController.getBookings);

// Create a new booking
router.post('/', bookingController.createBooking);

module.exports = router;