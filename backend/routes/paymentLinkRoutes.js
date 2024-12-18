// paymentRoutes.js
const express = require("express");
const { createPayment, getPaymentStatus } = require("../controllers//paymentLinkController");

const router = express.Router();

// Route for creating the payment
router.post("/paymentCreate", createPayment);

module.exports = router;
