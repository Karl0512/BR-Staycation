// paymentRoutes.js

const express = require('express');
const { handlePaymentWebhook } = require('./controllers/paymentController');
const router = express.Router();

// Webhook endpoint for payment status updates
router.post('/payment/webhook', handlePaymentWebhook);

module.exports = router;
