// IIMPORT MGA KAILNGAN
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import { useNavigate } from "react-router-dom";
import "../style/book.css";
import moment from "moment-timezone";

const weekDays = [0, 1, 2];

// IPASA YUNG DATA FROM ROOM COMPONENT
const BookingPage = ({ room }) => {
  // I DECLARE MGA KAILANGAN
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]); // For calendar selection
  const [reserved, setReserved] = useState([]); // For reserved dates
  const [startDate, setStartDate] = useState(null); // For form input
  const [endDate, setEndDate] = useState(null);
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [guests, setGuests] = useState("1");
  //const [rooms, setRooms] = useState([]); // To store fetched rooms
  //const [roomId, setRoomId] = useState(""); // To store selected room
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  //const userId = localStorage.getItem("token");
  const [name, setName] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [term1Accepted, setTerm1Accepted] = useState(false);
  const [term2Accepted, setTerm2Accepted] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");

  // Handle opening the modal, ETO YUNG PAG BUKAS NG POPUP
  const handleModalOpen = () => {
    setShowModal(true);
  };

  // Handle closing the modal, ETO YUNG PAG CLOSE NG POPUP
  const handleModalClose = () => {
    setShowModal(false);
  };

  // Handle accepting terms
  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowModal(false); // Close the modal after accepting terms
  };
  const handleAcceptTerms1 = (e) => {
    setTerm1Accepted(e.target.checked);
  };
  const handleAcceptTerms2 = (e) => {
    setTerm2Accepted(e.target.checked);
  };

  //const isAcceptEnabled = termsAccepted && bookingAccepted;

  // ETO YUNG MGA AVAILABLE TIME NAKA ARRAY
  const availableTimes = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
  ];

  // SAME SA RATES NAKA ARRAY DIN MAY LABEL AND VALUE
  const rates = [
    { label: 8, value: "1000" },
    { label: 12, value: "1200" },
    { label: 22, value: "1700" },
  ];

  useEffect(() => {
    if (startDate && endDate && price.label === 22) {
      const diffInDays = moment(endDate).diff(moment(startDate), "days") + 1;

      let calculatedPrice =
        diffInDays > 1 ? diffInDays * parseInt(price.value) : price.value;

      // Add ₱300 per extra guest (if guests > 2)
      if (guests > 2) {
        calculatedPrice += (guests - 2) * 300;
      }

      setTotalPrice(calculatedPrice);
    } else if (price.value) {
      let calculatedPrice = parseInt(price.value);

      // Add ₱300 per extra guest (if guests > 2)
      if (guests > 2) {
        calculatedPrice += (guests - 2) * 300;
      }

      setTotalPrice(calculatedPrice);
    }
  }, [startDate, endDate, price, guests]);

  // KUNIN YUNG MGA BOOKED DATES GALING SA DATABASE ILAGAY SA CALENDAR
  useEffect(() => {
    //console.log(room);
    const fetchReservedDates = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings?roomId=${room}`
        );
        // I MAP YUNG DATA KUNIN LANG YUNG startDate AT endDate
        const formattedReservedDates = response.data.map((reservation) => ({
          startDate: reservation.startDate,
          endDate: reservation.endDate,
        }));

        // ILAGAY SA setReserved DAHIL YAN YUNG HINIHINGI NG COMPONENT
        setReserved(formattedReservedDates);
      } catch (error) {
        console.error("Error fetching reserved dates:", error);
      }
    };

    // TAWAGIN YUNG FUNCTION PARA GUMANA
    fetchReservedDates();
    //console.log(reserved);
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
          {
            withCredentials: true,
          }
        );

        setDecodedToken(response.data.decoded);
      } catch (error) {
        console.error("Error fetching token: ", error.response?.data?.message);
      }
    };

    fetchToken();
  }, []);
  // Empty dependency array so it runs once when the component mounts

  // ETO YUNG MANGYAYARI PAG KA PININDOT NG USER BOOK NOW
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    /*console.log(startDate);
    console.log(endDate);
    console.log(reserved);
    console.log(selected);*/

    // UNA I VALIDATE KUNG LAHAT BA MERON LAMANG YUNG MGA NECESSARY NA DATA
    if (!startDate || !endDate || !guests || !time) {
      // PAG KA WALANG LAMAN ISA MAG SEND NG ERROR NA I FILL OUT LAHAT
      setSuccessMessage("fill out all the forms!");
    } else {
      console.log(startDate);
      console.log(endDate);
      // KUNG WALA NAMANG KULANG I FORMAT YUNG STARTDATE AT ENDDATE OBJECT PA STRING
      const formattedStartDate = moment(startDate)
        .tz("Asia/Singapore")
        .format("YYYY-MM-DD");
      const formattedEndDate = moment(endDate)
        .tz("Asia/Singapore")
        .format("YYYY-MM-DD");

      // GUMAWA NG OBJECT

      const { userfname, userlname, id, email } = decodedToken;
      const username = userfname + " " + userlname;

      const bookingData = {
        id,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        guests,
        roomId: room,
        name: username,
        email,
        time,
        price: totalPrice,
        rate: price.value,
        label: price.label,
      };
      //console.log(bookingData);

      // PAGTAPOS GUMAWA NG OBJECT IPASA SA RECEIPT COMPONENT YUNG BOOKINGDATA
      navigate("/receipt", { state: bookingData });
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

  /*useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rooms"); // Adjust the URL if needed
        setRooms(response.data); // Set the rooms data
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);*/

  // FUNCTION PARA MAPALITAN YUNG DATE KAPAG ANG PINILI NG USER 8 OR 12HRS
  const handleDateChange = (dates) => {
    // Allow the user to select multiple dates unless 8 or 12 hours are chosen
    if (price.label === 8 || price.label === 12) {
      // Set the end date equal to the start date for 8 or 12 hours
      if (dates.length === 1) {
        setSelected([dates[0], dates[0]]); // Set startDate and endDate to the same date
      }
    } else {
      // If not 8 or 12 hours, allow range selection
      setSelected(dates);
    }
  };

  return (
    <div className="container-book">
      {/* Booking Form */}
      <form onSubmit={handleBookingSubmit} className="form-book">
        <div className="rates">
          <label className="label-rates">Rates:</label>
          <div className="rate-button">
            {rates.map((ratesOption) => (
              <button
                key={ratesOption.value}
                type="button"
                className={`time-button ${
                  price.value === ratesOption.value ? "active" : ""
                }`} // Correct comparison
                onClick={() => setPrice(ratesOption)}
              >
                {ratesOption.label} hrs for {ratesOption.value}
              </button>
            ))}
          </div>
        </div>
        {price && (
          <div className="calendar" disabled={!price}>
            <h1 className="h1-book">
              <center>Room {room}</center>
            </h1>
            <Calendar
              style={{ width: "100%" }}
              selected={selected}
              reserved={reserved}
              range={true}
              protection={true}
              options={{ locale: "en", weekStartsOn: 0, useAttributes: true }}
              onChange={handleDateChange}
              onOverbook={(date, type) => alert(type)}
              disabled={(date) => weekDays.includes(date.getDay())}
            />
          </div>
        )}

        {price && (
          <div className="time">
            <div>
              <label className="label-time">Preferred Time:</label>
              <div className="time-buttons">
                {availableTimes.map((timeOption) => (
                  <button
                    key={timeOption}
                    type="button"
                    className={`time-button ${
                      time === timeOption ? "active" : ""
                    }`}
                    onClick={() => setTime(timeOption)}
                  >
                    {timeOption}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label-guest">Guest</label>
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={5}>5 Guests</option>
                {/* Add more if needed */}
              </select>
            </div>
          </div>
        )}
        {price && (
          <div>
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {startDate && (
                <img src="/img/check-icon.svg" width="20" height="20" />
              )}
              {startDate ? (
                `Check-in: ${startDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })} at`
              ) : (
                <>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C12 22 4 14.5 4 9.5C4 5.36 7.36 2 11.5 2C15.64 2 19 5.36 19 9.5C19 14.5 12 22 12 22Z"
                      fill="#52c41a"
                    />

                    <circle cx="12" cy="10" r="3" fill="white" />

                    <path
                      d="M11 10.8L9.6 9.4L8.5 10.5L11 13L15.5 8.5L14.4 7.4L11 10.8Z"
                      fill="#52c41a"
                    />
                  </svg>

                  <p>Please select a check-in date </p>
                </>
              )}
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="16"
                  rx="2"
                  ry="2"
                  fill="#FF4D4F"
                />
                <path
                  d="M7 2V5"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M17 2V5"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M3 8H21"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                />

                <path
                  d="M9 13L11 15L15 11"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Checkout date:{" "}
              {endDate
                ? endDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })
                : "End date not selected"}
            </p>

            <p>Guest: {guests}</p>
            <p>Price: {totalPrice}</p>
            <div className="terms">
              <input
                type="checkbox"
                id="terms-checkbox"
                disabled={!termsAccepted} // Disable checkbox until terms are accepted
                checked={termsAccepted}
                onChange={() => {}}
              />
              <label htmlFor="terms-checkbox">
                I agree to the{" "}
                <span
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={handleModalOpen}
                >
                  Terms and Conditions
                </span>
              </label>
            </div>

            {/* Terms Modal */}
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <h2>Terms and Conditions</h2>
                  <p>
                    {/* Example terms; you can replace this with actual terms */}
                    <b>Responsibility for Property</b>
                    <br />
                    All guests are expected to take care of and maintain the
                    facilities and property during their stay.
                    <br />
                    <b>Payment for Damaged or Lost Items</b>
                    <br />
                    If any item is damaged or lost during the stay, the guest is
                    required to pay for its replacement or repair cost based on
                    the current market value.
                    <br />
                    <b>Property Inspection</b>
                    <br />
                    A property inspection will be conducted before check-out to
                    ensure that all items are in proper condition. If any damage
                    or loss is identified, it will be immediately communicated
                    to the guest.
                    <br />
                    <b>Security Deposit</b>
                    <br />
                    A security deposit may be required before check-in, which
                    will be refunded after the inspection if no damage or loss
                    is found.
                    <br />
                    <b>Downpayment and Cancellation Policy</b>
                    <br />
                    Guests are required to provide a 50% downpayment to confirm
                    their booking. The remaining 50% of the total amount must be
                    settled before check-in or on the scheduled stay date.
                    <br />
                    The downpayment is non-refundable and will be forfeited if
                    the guest cancels their booking or fails to show up on the
                    scheduled stay date. Limitation of Liability
                    <br />
                    The property owner is not responsible for any personal
                    belongings that may be lost or damaged during the guest's
                    stay.
                    <br />
                    <b>Compliance with Rules</b>
                    <br />
                    Guests are required to adhere to all stated rules to
                    maintain the safety and order of the property.
                    {/* Add more terms here */}
                  </p>
                  <div>
                    <div className="input">
                      <input
                        type="checkbox"
                        checked={term1Accepted}
                        onChange={(e) => handleAcceptTerms1(e)}
                      />
                      <p>
                        I have read, understand and agreed to the terms and
                        conditions
                      </p>
                    </div>
                    <div className="input">
                      <input
                        type="checkbox"
                        checked={term2Accepted}
                        onChange={(e) => handleAcceptTerms2(e)}
                      />
                      <p>
                        by booking you are agreeing to these terms and condition
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn-modal"
                      disabled={!term1Accepted || !term2Accepted}
                      onClick={handleAcceptTerms}
                    >
                      I Accept
                    </button>
                    <button className="btn-modal" onClick={handleModalClose}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button
              className="btn-book"
              disabled={!termsAccepted}
              type="submit"
            >
              Book Now
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingPage;
