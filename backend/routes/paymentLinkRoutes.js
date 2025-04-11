// paymentRoutes.js
const express = require("express");
const { createPayment, getPayments, getPaymentsForYear } = require("../controllers//paymentLinkController");

const router = express.Router();

// Route for creating the payment
router.post("/paymentCreate", createPayment);
router.get("/", getPayments);
router.get("/payments-year", getPaymentsForYear);

module.exports = router;
