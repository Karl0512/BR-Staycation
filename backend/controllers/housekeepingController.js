const Housekeeping = require('../model/Housekeeping'); // Adjust the path as necessary

// Create a new Housekeeping
const createHouekeeping = async (req, res) => {
    const { endDate } = req.body
  try {
    const Housekeeping = await Housekeeping.create(req.body);
    res.status(201).json(Housekeeping);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Housekeepings
const getHousekeepings = async (req, res) => {
  try {
    const Housekeepings = await Housekeeping.find({});
    res.status(200).json(Housekeepings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Housekeeping
const getHousekeeping= async (req, res) => {
  const { id } = req.params;
  try {
    const Housekeeping = await Housekeeping.findById(id);
    if (!Housekeeping) {
      return res.status(404).json({ error: 'Housekeeping not found' });
    }
    res.status(200).json(Housekeeping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Housekeeping
const updateHousekeeping= async (req, res) => {
  const { id } = req.params;
  try {
    const Housekeeping = await Housekeeping.findByIdAndUpdate(id, req.body, { new: true });
    if (!Housekeeping) {
      return res.status(404).json({ error: 'Housekeeping not found' });
    }
    res.status(200).json(Housekeeping);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Housekeeping
const deleteHousekeeping= async (req, res) => {
  const { id } = req.params;
  try {
    const Housekeeping = await Housekeeping.findByIdAndDelete(id);
    if (!Housekeeping) {
      return res.status(404).json({ error: 'Housekeeping not found' });
    }
    res.status(200).json({ message: 'Housekeeping deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createHouekeeping,
  getHousekeepings,
  getHousekeeping,
  updateHousekeeping,
  deleteHousekeeping
};
