const Rooms = require('../model/Rooms'); // Adjust the path as necessary

// Create a new user
const createRooms = async (req, res) => {
  try {
    const rooms = await Rooms.create(req.body);
    res.status(201).json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
const getRooms = async (req, res) => {
  try {
    const rooms = await Rooms.findAll({});
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user
const getRoom = async (req, res) => {
  try {
    const rooms = await Rooms.findByPk(req.params.id);
    if (!rooms) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
const updateRoom = async (req, res) => {

  try {
    const rooms = await Rooms.findByPk(req.params.id);
    if (!rooms) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user
const deleteRoom = async (req, res) => {
  try {
    const rooms = await Rooms.findByPk(req.params.id);
    if (!rooms) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRooms,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
