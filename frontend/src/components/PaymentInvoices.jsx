import SideNav from "./SideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style/payment.css";

export default function PaymentInvoices() {
  const [payments, setPayment] = useState([]);

  useEffect(() => {
    const getPayments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/payment/`
        );
        const paymentsData = response.data.data; // No need to map attributes here as we're accessing the full payment object
        setPayment(paymentsData);
        console.log(paymentsData); // Check if payments data is correctly fetched
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    getPayments();
  }, []);

  return (
    <div className="container-payment">
      <SideNav />
      <div className="payment-table">
        <table className="payment-overview-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Fee</th>
              <th>Net Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id}>
                  {" "}
                  {/* Using payment.id as the key */}
                  <td>{payment.id}</td> {/* Displaying the payment id here */}
                  <td>{payment.attributes.billing.name}</td>
                  <td>{payment.attributes.billing.email}</td>
                  <td>{payment.attributes.billing.phone || "N/A"}</td>
                  <td>{payment.attributes.amount}</td>
                  <td>{payment.attributes.fee}</td>
                  <td>{payment.attributes.net_amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="loader"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
