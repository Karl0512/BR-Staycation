import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

const weekDays = [0, 1, 2];

const BookingPage = () => {
  const [selected, setSelected] = useState([]); // For calendar selection
  const [reserved, setReserved] = useState([]); // For reserved dates
  const [startDate, setStartDate] = useState(null); // For form input
  const [endDate, setEndDate] = useState(null);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("1");
  const [roomId, setRoomId] = useState("1");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const userId = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const availableTimes = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
  ];

  // Fetch reserved dates for calendar
  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings");
        const formattedReservedDates = response.data.map((reservation) => ({
          startDate: new Date(reservation.startDate),
          endDate: new Date(reservation.endDate),
        }));
        setReserved(formattedReservedDates);
      } catch (error) {
        console.error("Error fetching reserved dates:", error);
      }
    };
    fetchReservedDates();
  }, []);

  useEffect(() => {
    const fetchNameById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setName(response.data.name); // Store the fetched name in state
        setEmail(response.data.email);
        console.log(email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchNameById();
  }, []); // Empty dependency array so it runs once when the component mounts

  // Handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      startDate,
      endDate,
      guests,
      roomId,
      name,
      email,
      time,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData
      );
      setSuccessMessage("Booking successful!");
      setError("");
    } catch (err) {
      setError(err.response ? err.response.data.error : "Booking failed");
      setSuccessMessage("");
    }
  };

  // Update startDate and endDate when calendar selection changes
  useEffect(() => {
    if (selected.length > 0) {
      const [start, end] = selected;
      setStartDate(start);
      setEndDate(end);
    }
  }, [selected]);

  return (
    <div>
      <h1>
        <center>
          Book Your Stay<br></br> {name}
        </center>
      </h1>

      {/* Booking Form */}
      <form
        onSubmit={handleBookingSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Calendar
          style={{ width: "100%" }}
          selected={selected}
          reserved={reserved}
          range={true}
          protection={true}
          options={{ locale: "en", weekStartsOn: 0, useAttributes: true }}
          onChange={setSelected}
          onOverbook={(date, type) => alert(type)}
          disabled={(date) => weekDays.includes(date.getDay())}
        />

        <div>
          <label>Check-In Date:</label>
          <input
            type="text"
            value={startDate ? startDate.toLocaleDateString() : ""}
            disabled
          />
        </div>

        <div>
          <label>Check-Out Date:</label>
          <input
            type="text"
            value={endDate ? endDate.toLocaleDateString() : ""}
            disabled
          />
        </div>

        <div>
          <label>Preferred Time:</label>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Select a time</option>
            {availableTimes.map((timeOption) => (
              <option key={timeOption} value={timeOption}>
                {timeOption}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Guest</label>
          <select value={guests} onChange={(e) => setGuests(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div>
          <label>Room</label>
          <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
            <option value="1">Room 1</option>
            <option value="2">Room 2</option>
          </select>
        </div>

        <button type="submit">Book Now</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default BookingPage;
