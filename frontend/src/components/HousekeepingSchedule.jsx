import { useEffect, useState } from "react";
import SideNav from "./SideNav";
import axios from "axios";

export default function HousekeepingSchedule() {
  const [housekeepingSchedule, setHousekeepingSchedule] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [paidBookings, setPaidBookings] = useState([]);

  useEffect(() => {
    const fetchHousekeepingSchedule = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/housekeeping"
        );
        setHousekeepingSchedule(response.data);
      } catch (error) {
        console.error("Error fetching housekeeping schedule: ", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings");
        setBookings(response.data); // Make sure to set the full response, not just `status`
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    fetchBookings();
    fetchHousekeepingSchedule();
  }, []);

  useEffect(() => {
    const fetchOnlyPaidBooking = () => {
      const onlyPaidBooking = bookings.filter(
        (booking) => booking.status === "paid"
      );
      setPaidBookings(onlyPaidBooking);
    };

    if (bookings.length > 0) {
      fetchOnlyPaidBooking();
    }
  }, [bookings]);

  useEffect(() => {
    const createHousekeepingSchedule = async () => {
      if (paidBookings.length > 0) {
        for (let booking of paidBookings) {
          try {
            const housekeepingData = {
              bookingId: booking._id,
              roomId: booking.roomId,
              dateToBeCleaned: booking.endDate,
            };
            const response = await axios.post(
              "http://localhost:5000/api/housekeeping",
              housekeepingData
            );
            console.log("Housekeeping created for booking ID:", booking._id);
          } catch (error) {
            console.error(
              "Error creating housekeeping for booking ID:",
              booking._id,
              error
            );
          }
        }
      }
    };
    createHousekeepingSchedule();
  }, [paidBookings]);

  return (
    <>
      <SideNav />
      <div className="dashboard-table">
        <table className="dashboard-overview-table">
          <thead>
            <tr>
              <th>Booking Id</th>
              <th>Room number</th>
              <th>Date To Be Cleaned</th>
            </tr>
          </thead>
          <tbody>
            {housekeepingSchedule.length > 0 ? (
              housekeepingSchedule.map((housekeeping) => (
                <tr key={housekeeping._id}>
                  <td>{housekeeping.bookingId}</td>
                  <td>{housekeeping.roomId}</td>
                  <td>{housekeeping.dateToBeCleaned}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No bookings available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
