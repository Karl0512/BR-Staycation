import { Link } from "react-router-dom";
import "../style/dashboard.css";
import SideNav from "./SideNav"; // Import SideNav component
import SimpleCalendar from "./Calendar";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [bookings, setBooking] = useState("");

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings`
        );
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    getBookings();
  }, []);
  const StyledCalendar = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;

        .calendar {
            width: 100%;
            heigth: 100vh:
            padding: 10px;
            font-size: 1em;
            box-shadow: none;
            border: none;
            font-family: 'Poppins', 'Sans-serif';
            
        }
        
        .calendar table, th, td {
            border: 3px solid #c6b5a1;
            border-collapse: collapse;
        }

        table {
            margin-top: 20px;
        }

        .calendar th {
            background-color: #c6b5a1;
        }
    `;

  return (
    <div className="table-container">
      <SideNav />
      <div className="dashboard-content">
        <div className="dashboard-table">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Room number</th>
                <th>Check-in date</th>
                <th>Check-out date</th>
                <th>payment status</th>
              </tr>
            </thead>
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

        <StyledCalendar>
          <SimpleCalendar />
        </StyledCalendar>
      </div>
    </div>
  );
}
