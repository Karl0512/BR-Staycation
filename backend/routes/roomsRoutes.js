const express = require('express');
const {
  createRooms,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomsController'); // Adjust the path as necessary

const router = express.Router();

// Define the routes
router.post('/', createRooms);         // Create a new user
router.get('/', getRooms);             // Get all users
router.get('/:id', getRoom);           // Get a single user
router.patch('/:id', updateRoom);      // Update a user
router.delete('/:id', deleteRoom);     // Delete a user

module.exports = router;
