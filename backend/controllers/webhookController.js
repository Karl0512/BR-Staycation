// paymentController.js

const handlePaymentWebhook = async (req, res) => {
    const payload = req.body; // The payload from PayMongo
    const paymentStatus = payload.data.attributes.status;
  
    if (paymentStatus === "paid") {
      console.log("Payment successful");
      // You can perform any additional actions here, such as updating your database.
    } else {
      console.log("Payment failed or pending");
    }
  
    // Respond back to PayMongo
    res.status(200).send("Webhook received successfully");
  };
  
  module.exports = { handlePaymentWebhook };
  