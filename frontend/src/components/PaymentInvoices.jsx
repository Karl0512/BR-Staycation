import SideNav from "./SideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style/payment.css"

export default function PaymentInvoices() {
  const [bookings, setBooking] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState("");

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings");
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    getBookings();
  }, []);

  const rowClick = (bookingId) => {
    setSelectedBookingId(bookingId === selectedBookingId ? null : bookingId);
  };

  const markAsPaid = async () => {
    if (!selectedBookingId) return;

    try {
      await axios.patch(
        `http://localhost:5000/api/bookings/${selectedBookingId}`,
        {
            status: "paid",
        }
      );

      // Update the local state to reflect the paid status
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === selectedBookingId
            ? { ...booking, status: "paid" }
            : booking
        )
      );

      // Clear the selected booking after updating
      setSelectedBookingId(null);
    } catch (error) {
      console.error("Error updating payment status: ", error);
    }
  };

  return (
    <>
      <SideNav />
      <div className="dashboard-table">
        <div style={{ display: "flex", padding: "20px", alignItems: "center" }}>
            <label style={{ marginRight: "25px" }}>Booking Id to be paid:</label>
            <input style={{ marginRight: "25px", width: "11.5%" }} type="text" value={selectedBookingId} />
          <button
          style={{ paddingLeft: "25px", paddingRight: "25px", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "#c6b5a1", border: "none", borderRadius: "25px" }}
          onClick={markAsPaid}
          disabled={!selectedBookingId}
          className="mark-paid-button"
        >
          paid
        </button>  
        </div>
        
        <table className="dashboard-overview-table">
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Room number</th>
            <th>Check-in date</th>
            <th>Check-out date</th>
            <th>payment status</th>
          </tr>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  onClick={() => rowClick(booking._id)}
                  style={{
                    backgroundColor:
                      booking._id === selectedBookingId
                        ? "#c6b5a1"
                        : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <td>{booking._id}</td>
                  <td>{booking.name}</td>
                  <td>{booking.roomId}</td>
                  <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                  <td>{booking.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No bookings available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
