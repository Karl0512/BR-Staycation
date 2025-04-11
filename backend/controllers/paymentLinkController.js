const axios = require("axios");
require("dotenv").config();
const Paymongo = require('paymongo-node')
const PAYMONGO_API_KEY = process.env.PAYMONGO_API_KEY;
const paymongo = Paymongo(PAYMONGO_API_KEY)

// Function to create a checkout session
const createPayment = async (req, res) => {
  const { amount, description } = req.body.data.attributes;

  const success_url = process.env.SUCCESS_URI

  const { startDate, endDate, guests, roomId, time, price, email, name } = req.body.data.attributes.metadata;
  
  //const [ fname, lname ] = name.split(' ')

  if (!amount || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!startDate || !endDate || !guests || !roomId || !time || !price) {
    return res.status(400).json({ error: "Missing required metadata fields" });
  }


  try {
    // Step 2: Create a checkout session
    /*const customerResponse = await axios.post(
      "https://api.paymongo.com/v1/customers",
      {
        data: {
          attributes: {
            first_name: fname,   // Pass customer's name
            last_name: lname,
            email: email,
            default_device: "email"
          },
        },
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(PAYMONGO_API_KEY).toString("base64")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const customerId = customerResponse.data.data.id;  // Store customer ID*/

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
                name: "Booking for " + name,
                quantity: 1,
                description: "BR Staycation",
              },
            ],
            metadata: {
              startDate,
              endDate,
              name,
              email,
              guests,
              roomId,
              time,
              price,
            },
            payment_method_types: ["gcash"],
            success_url: success_url,
            description: "BR Staycation",
            //customer_id: customerId
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

const getPayments = async (req, res) => {
  try {
    console.log("Fetching all payments...");

    // Axios request to PayMongo API to get the list of payments
    const response = await axios.get("https://api.paymongo.com/v1/payments?limit=50", {
      headers: {
        Authorization: `Basic ${Buffer.from(PAYMONGO_API_KEY).toString(
          "base64"
        )}`,
        "Content-Type": "application/json",
      },
    });

    // Check if there are payments in the response
    const payments = response.data.data;

    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "No payments found" });
    }

    // Send the payments data back as a JSON response
    res.json({
      message: "Payments fetched successfully",
      data: payments,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      error: error.response?.data || "Failed to retrieve payments",
    });
  }
};

const getPaymentsForYear = async (req, res) => {
  const allPayments = [];
  let hasMore = true;
  let cursor = null; // This will store the cursor for pagination

  const year = req.query.year || new Date().getFullYear();
  console.log("Requested year:", year);

  const startOfYear = new Date(`${year}-01-01T00:00:00`).toISOString();
  const endOfYear = new Date(`${year}-12-31T23:59:59`).toISOString();

  try {
    while (hasMore) {
      const params = {
        limit: 50,
        'created_at.between': `${startOfYear}..${endOfYear}`,
      };
      
      // If cursor is not null, add the 'after' parameter
      if (cursor) {
        params.after = cursor; // Set the after cursor from the last payment's ID
      }

      const response = await axios.get('https://api.paymongo.com/v1/payments', {
        headers: {
          Authorization: `Basic ${Buffer.from(PAYMONGO_API_KEY + ':').toString("base64")}`,
          "Content-Type": "application/json",
        },
        params,
      });

      console.log(`Fetched ${response.data.data.length} payments`); // Log the number of payments fetched
      console.log('Next page cursor:', response.data.meta?.after); // Log the cursor for the next page if available

      const payments = response.data.data;

      // Map the payments to only include amount and formatted created_at
      const filteredPayments = payments.map(payment => {
        const createdAt = payment.attributes.created_at;
        const formattedCreatedAt = new Date(createdAt * 1000).toISOString(); // Convert to ISO string
        const amountInCents = payment.attributes.amount;
        const amount = Math.floor(amountInCents / 100); // Convert from cents to the main unit (e.g., 1700000 -> 1700.00)

        return {
          created_at: formattedCreatedAt,
          amount: amount,
        };
      });

      allPayments.push(...filteredPayments); // Append payments to allPayments array

      // Check if there are more payments to fetch
      if (payments.length === 50) {
        // If we have 50 payments, use the ID of the last one as the cursor for the next batch
        cursor = payments[49].id;
      } else {
        // If fewer than 50 payments, stop pagination
        hasMore = false;
      }
    }

    // Send only the necessary data
    res.json({
      year: year,
      count: allPayments.length,
      payments: allPayments,
    });

  } catch (error) {
    console.error('Error fetching payments:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch payments.' });
  }
};









module.exports = { createPayment, getPayments, getPaymentsForYear };
