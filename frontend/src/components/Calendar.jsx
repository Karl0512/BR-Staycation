import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import "../style/Calendar.css";
import moment from "moment";

const weekDays = [0, 1, 2];

export default function SimpleCalendar() {
  const [selectedRoom1, setSelectedRoom1] = useState([]);
  const [reservedRoom1, setReservedRoom1] = useState([]);
  const [selectedRoom2, setSelectedRoom2] = useState([]);
  const [reservedRoom2, setReservedRoom2] = useState([]);

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        // Only URL is necessary if startDate and endDate are not parameters
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings?roomId=1`
        );

        // Formatting reserved dates based on the expected structure
        const formattedReservedDates = response.data.map((reservation) => ({
          startDate: moment(
            reservation.startDate,
            "YYYY-MM-DD HH:mm:ss"
          ).toDate(),
          endDate: moment(reservation.endDate, "YYYY-MM-DD HH:mm:ss").toDate(),
        }));

        setReservedRoom1(formattedReservedDates);
      } catch (error) {
        console.error("Error fetching reserved dates:", error);
      }
    };

    fetchReservedDates();
  }, []);

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        // Only URL is necessary if startDate and endDate are not parameters
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings?roomId=2`
        );

        // Formatting reserved dates based on the expected structure
        const formattedReservedDates = response.data.map((reservation) => ({
          startDate: moment(
            reservation.startDate,
            "YYYY-MM-DD HH:mm:ss"
          ).toDate(),
          endDate: moment(reservation.endDate, "YYYY-MM-DD HH:mm:ss").toDate(),
        }));

        setReservedRoom2(formattedReservedDates);
      } catch (error) {
        console.error("Error fetching reserved dates:", error);
      }
    };

    fetchReservedDates();
  }, []);

  return (
    <div className="container">
      <div className="slider-wrapper">
        <div className="slider">
          <div className="slide" id="slider-1">
            <h1>
              <center>Room 1</center>
            </h1>
            <Calendar
              className="custom-component"
              selected={selectedRoom1}
              reserved={reservedRoom1}
              range={true}
              protection={true}
              options={{ locale: "en", weekStartsOn: 0, useAttributes: true }}
              onChange={setSelectedRoom1}
              onOverbook={(date, type) => alert(type)}
              disabled={(date) => weekDays.includes(date.getDay())}
            />
          </div>
          <div className="slide" id="slider-2">
            <h1>
              <center>Room 2</center>
            </h1>
            <Calendar
              className="custom-component"
              style={{ width: "100%" }}
              selected={selectedRoom2}
              reserved={reservedRoom2}
              range={true}
              protection={true}
              options={{ locale: "en", weekStartsOn: 0, useAttributes: true }}
              onChange={setSelectedRoom2}
              onOverbook={(date, type) => alert(type)}
              disabled={(date) => weekDays.includes(date.getDay())}
            />
          </div>
        </div>
        <div className="slider-nav">
          <a href="#slider-1"></a>
          <a href="#slider-2"></a>
        </div>
      </div>
    </div>
  );
}
