const express = require("express");
const { login, checkAuth, logout, checkAuthDecode } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.get("/check-auth", checkAuth);
router.post("/logout", logout);

module.exports = router;
