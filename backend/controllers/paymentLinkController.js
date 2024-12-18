const axios = require("axios");
require("dotenv").config();

const PAYMONGO_API_KEY = process.env.PAYMONGO_API_KEY;

// Function to create a checkout session
const createPayment = async (req, res) => {
  const { amount, description } = req.body.data.attributes;

  const { startDate, endDate, guests, roomId, time, price } = req.body.data.attributes.metadata;
  
  if (!amount || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!startDate || !endDate || !guests || !roomId || !time || !price) {
    return res.status(400).json({ error: "Missing required metadata fields" });
  }

  if (!amount || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Step 2: Create a checkout session
    const checkoutResponse = await axios.post(
      "https://api.paymongo.com/v1/checkout_sessions",
      {
        data: {
          attributes: {
            send_email_receipt: false,
            show_description: true,
            show_line_items: true,
            line_items: [
              {
                currency: "PHP",
                amount: amount * 100,
                name: "bhrenz",
                quantity: 1,
                description: "booking for staycation",
              },
            ],
            metadata: {
              startDate,
              endDate,
              guests,
              roomId,
              time,
              price,
            },
            payment_method_types: ["gcash"],
            success_url: `http://localhost:5173`,
            description: "booking for staycation",
          },
        },
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(PAYMONGO_API_KEY).toString(
            "base64"
          )}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Get the checkout URL from the response
    const checkoutUrl = checkoutResponse.data.data.attributes.checkout_url;
    const paymentId = checkoutResponse.data.data.id;

    // Send the checkout URL back in the response
    res.json({
      checkout_url: checkoutUrl,
      status: "unpaid",
      payment_id: paymentId,
    });
  } catch (error) {
    console.error(
      "Error creating checkout session:",
      error.response?.data || error
    );
    res
      .status(500)
      .send(error.response?.data || "Error creating checkout session");
  }
};

module.exports = { createPayment };
