const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
const User = require("../model/User"); // Ensure this points to your user model

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user.status === 'deactivated') {
      return res.status(403).json({ message: 'Account is deactivated'})
    }
    if (!user || user.password !== password) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
    // Generate JWT Token
    const token = jwt.sign({ id: user.id, userfname: user.firstname, userlname: user.lastname, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });


    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // 👈 since you're using HTTPS on Render
      sameSite: "None", // 👈 required for cross-origin requests with credentials
      maxAge: 24 * 60 * 60 * 1000, // optional but recommended
    });


    res.json({ message: "Login successful", role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const checkAuth = (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    res.json({ decoded });
  });
};


const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,    // Same as when the cookie was set
    secure: true, // Match the cookie's secure flag
    sameSite: 'Strict',  // Match sameSite policy
  });
  res.json({ message: "Logged out" });
};

module.exports = { login, checkAuth, logout };
