const express = require('express');
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  statusUpdate
} = require('../controllers/userController'); // Adjust the path as necessary

const router = express.Router();

// Define the routes
router.post('/', createUser);         // Create a new user    // Login 
router.get('/', getUsers);             // Get all users
router.get('/:id', getUser);           // Get a single user
router.patch('/update', updateUser);      // Update a user
router.delete('/:id', deleteUser);     // Delete a user
router.put('/:id/toggle-status', statusUpdate)

module.exports = router;
