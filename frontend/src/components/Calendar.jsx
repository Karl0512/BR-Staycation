import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import "../style/custom-style.css"

const weekDays = [0, 1, 2];

export default function SimpleCalendar() {
  const [selected, setSelected] = useState([]);
  const [reserved, setReserved] = useState([]);

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        // Only URL is necessary if startDate and endDate are not parameters
        const response = await axios.get("http://localhost:5000/api/bookings");
        
        // Formatting reserved dates based on the expected structure
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

  return (
    <div className="App" style={{ width: "30%" }}>
      <h1>Booked Dates</h1>
      <Calendar className="custom-component"
        
        selected={selected}
        reserved={reserved}
        range={true}
        protection={true}
        options={{ locale: "en", weekStartsOn: 0, useAttributes: true }}
        onChange={setSelected}
        onOverbook={(date, type) => alert(type)}
        disabled={(date) => weekDays.includes(date.getDay())}
      />
    </div>
  );
}
