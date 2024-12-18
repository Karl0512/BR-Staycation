const express = require('express');
const {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController'); // Ensure the path is correct

const router = express.Router();

router.post('/', createBooking);         // Create a new booking
router.get('/', getBookings);            // Get all bookings
router.get('/:id', getBooking);          // Get a booking by ID
router.patch('/:id', updateBooking);     // Update a booking
router.delete('/:id', deleteBooking);    // Delete a booking

module.exports = router;
