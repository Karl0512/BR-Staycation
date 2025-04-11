const express = require('express');
const {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getBookingsForYear,
  getRoomByBookings,
  getBookingByEmail,
} = require('../controllers/bookingController'); // Ensure the path is correct

const router = express.Router();

router.get('/booking-year', getBookingsForYear);    // get booking per year
router.get('/booking-email', getBookingByEmail);    // get booking per email
router.get('/room-year', getRoomByBookings);    // get booking per year
router.post('/', createBooking);         // Create a new booking
router.get('/', getBookings);            // Get all bookings
router.get('/:id', getBooking);          // Get a booking by ID
router.patch('/:id', updateBooking);     // Update a booking
router.delete('/:id', deleteBooking);    // Delete a booking


module.exports = router;
