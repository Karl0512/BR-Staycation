const User = require("../model/User"); // Adjust the path as necessary
const nodemailer = require('nodemailer')

// email sender
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'siaa311dash5@gmail.com',
    pass: 'ukre vhii frzs oylm'
  }
})

// Create a new user
const createUser = async (req, res) => {
  const { firstname, lastname, email, password, contactnumber, age, role } =
    req.body;
  const doesEmailExist = await User.findOne({ where: { email } })

  console.log(req.body)

  if (doesEmailExist) {
    return res.status(400).json({ error: "Email already exist!" })
  }

  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !contactnumber ||
    !age ||
    !role
  ) {
    res.status(400).json({ error: "Please fill out all the forms" });
  } else {
    try {
      const user = await User.create(req.body); // Add role to the user
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res
      .status(200)
      .json({
        message: "Login successful",
        user: { id: user._id, role: user.role },
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Access denied: You do not have admin privileges" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  loginAdmin,
};
