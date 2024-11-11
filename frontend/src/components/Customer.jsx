import SideNav from "./SideNav";
import { Link } from "react-router-dom";
import "../style/customer.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

export default function Customer() {
  const [bookings, setBooking] = useState("");
  const [selected, setSelected] = useState([]); // For calendar selection
  const [reserved, setReserved] = useState([]); // For reserved dates
  const [startDate, setStartDate] = useState(null); // For form input
  const [endDate, setEndDate] = useState(null);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("1");
  const [roomId, setRoomId] = useState("1");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const weekDays = [0, 1, 2];

  const availableTimes = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
  ];

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

  const [showElement, setShowElement] = useState(false);
  const toggleElement = () => {
    setShowElement(!showElement);
  };

  const closeOverlay = () => {
    setShowElement(false);
  };

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

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      startDate,
      endDate,
      guests,
      roomId,
      name,
      email,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData
      );
      setSuccessMessage("Booking successful!");
      setError("");
    } catch (err) {
      console.log(bookingData);
      setError(err.response ? err.response.data.error : "Booking failed");
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    if (selected.length > 0) {
      const [start, end] = selected;
      setStartDate(start);
      setEndDate(end);
    }
  }, [selected]);

  return (
    <>
      <SideNav />
      <div className="dashboard-container">
        <h1>Overview</h1>
        <div style={{ marginTop: "10px" }} onClick={toggleElement}>
          <h1 className="add-booking-btn"  style={{ cursor: "pointer", borderRadius: "25px", backgroundColor: "#c6b5a1", padding: "10px" }}>+ Add Booking</h1>
          {showElement && (
            <div className="overlay" onClick={closeOverlay}>
              <div
                className="add-booking-form"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <h1>
                    <center>Book Your Stay</center>
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
                      options={{
                        locale: "en",
                        weekStartsOn: 0,
                        useAttributes: true,
                      }}
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
                      <label>Name: </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Email: </label>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <label>Preferred Time:</label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
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
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>

                    <div>
                      <label>Room</label>
                      <select
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                      >
                        <option value="1">Room 1</option>
                        <option value="2">Room 2</option>
                      </select>
                    </div>

                    <button type="submit">Book Now</button>
                  </form>

                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {successMessage && (
                    <p style={{ color: "green" }}>{successMessage}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="dashboard-table">
        <table className="dashboard-overview-table">
          <tr>
            <th>Customer Name</th>
            <th>Room number</th>
            <th>Check-in date</th>
            <th>Check-out date</th>
            <th>payment status</th>
          </tr>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
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
