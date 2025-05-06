const express = require('express');
const router = express.Router();
const { Seat } = require('../models/seatModels'); // Ensure this path is correct

// Get all seats or filter by course
router.get("/", async (req, res) => {
    const { course } = req.query;
    try {
        const seats = course
            ? await Seat.find({ course })
            : await Seat.find();
        res.json(seats);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});


// Check if a student has already booked a seat
router.get('/check-booking', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email parameter is required'
            });
        }

        const booking = await Seat.findOne({ email });

        res.json({
            success: true,
            hasBooked: !!booking,
            bookingDetails: booking || null
        });
    } catch (err) {
        console.error('Error checking booking:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to check booking status',
            error: err.message
        });
    }
});

// Book a new seat
router.post("/book-seat", async (req, res) => {
    try {
        const { seatNumber, course, name, phone, email, passoutYear, percentage } = req.body;

        if (!seatNumber || !course || !name || !phone || !email || !passoutYear || !percentage) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if seat is already booked
        const existingBooking = await Seat.findOne({ seatNumber, course });
        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: "This seat is already booked"
            });
        }

        // Check if user already booked a seat
        const userBooking = await Seat.findOne({ email });
        if (userBooking) {
            return res.status(400).json({
                success: false,
                message: "You have already booked a seat"
            });
        }

        const booking = new Seat({
            seatNumber,
            course,
            name,
            phone,
            email,
            passoutYear,
            percentage
        });

        await booking.save();

        res.status(201).json({
            success: true,
            message: "Seat booked successfully",
            booking
        });
    } catch (err) {
        console.error('Error booking seat:', err);
        res.status(500).json({
            success: false,
            message: "Failed to book seat",
            error: err.message
        });
    }
});

module.exports = router;
