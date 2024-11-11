const express = require('express');
const {
    createHousekeeping,
    getHousekeepings,
    getHousekeeping,
    updateHousekeeping,
    deleteHousekeeping,
} = require('../controllers/housekeepingController'); // Adjust the path as necessary

const router = express.Router();

// Define the routes
router.post('/', createHousekeeping);
router.get('/', getHousekeepings);             // Get all users
router.get('/:id', getHousekeeping);           // Get a single user
router.patch('/:id', updateHousekeeping);      // Update a user
router.delete('/:id', deleteHousekeeping);     // Delete a user

module.exports = router;
