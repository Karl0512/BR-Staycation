import React, { useEffect, useState } from "react";
import ProfileNav from "./ProfileNav";
import axios from "axios";

export default function BookingHistory() {
  const [email, setEmail] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
          {
            withCredentials: true,
          }
        );

        setEmail(response.data.decoded.email);
      } catch (error) {}
    };

    fetchEmail();
  }, []);

  useEffect(() => {
    if (email) {
      // Only fetch bookings when email is not null
      const fetchBookingUser = async () => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/bookings/booking-email?email=${email}`
          );
          setBookings(response.data.bookings);
        } catch (error) {
          console.error("Failed to fetch bookings:", error);
        }
      };
      fetchBookingUser();
    }
  }, [email]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <ProfileNav />
      <div
        style={{
          flex: "1",
          height: "100vh",
          padding: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Booking History</h2>
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Room ID</th>
              <th>Guests</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Time</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.roomId}</td>
                <td>{booking.guests}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.time}</td>
                <td>{booking.price}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
