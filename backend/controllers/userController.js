const User = require("../model/User"); // Adjust the path as necessary
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

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
    const users = await User.findAll();
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
  try {
    // Get the token from cookies (or headers if using Authorization Bearer)
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }

      // Extract user ID from the token
      const userId = decoded.id;

      // Find and update the user
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      await user.update(req.body);

      res.status(200).json({ message: "User updated successfully", user });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res
      .status(200)
      .json({
        message: "Login successful",
        user: { id: user.id, role: user.role },
      });
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
};
