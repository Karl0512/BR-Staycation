const express = require('express');
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  loginAdmin
} = require('../controllers/userController'); // Adjust the path as necessary

const router = express.Router();

// Define the routes
router.post('/', createUser);         // Create a new user
router.post('/login', loginUser);     // Login
router.post('/admin/login', loginAdmin); // Admin login route
router.get('/', getUsers);             // Get all users
router.get('/:id', getUser);           // Get a single user
router.patch('/:id', updateUser);      // Update a user
router.delete('/:id', deleteUser);     // Delete a user

module.exports = router;