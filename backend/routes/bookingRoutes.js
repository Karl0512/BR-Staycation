const express = require('express');
const {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController'); // Adjust the path as necessary

const router = express.Router();

// Define the routes
router.post('/', createBooking);
router.get('/', getBookings);             // Get all users
router.get('/:id', getBooking);           // Get a single user
router.patch('/:id', updateBooking);      // Update a user
router.delete('/:id', deleteBooking);     // Delete a user

module.exports = router;
