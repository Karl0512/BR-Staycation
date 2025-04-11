import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PaymentsByMonth() {
  const [bookingData, setBookingData] = useState([]);
  const [year, setYear] = useState("2024"); // Default to 2024 or set a value based on your needs

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    // Fetch the booking data for the selected year
    const fetchBookingsData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/bookings/booking-year?year=${year}`
        ); // Adjust URL if needed
        const bookings = response.data.bookings;
        console.log(bookings);

        // Initialize an array with all months (January to December)
        const allMonths = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        // Count bookings by month
        const monthlyCount = bookings.reduce((acc, booking) => {
          const month = new Date(booking.createdAt).toLocaleString("en-US", {
            month: "short",
          }); // Get short month name (e.g., "Jan", "Feb", etc.)

          if (acc[month]) {
            acc[month] += 1; // Increment the count for the month
          } else {
            acc[month] = 1; // Initialize count for the month
          }
          return acc;
        }, {});

        // Prepare data for chart, ensuring every month is represented
        const formattedData = allMonths.map((month) => ({
          month,
          count: monthlyCount[month] || 0, // If no bookings for the month, set count to 0
        }));

        setBookingData(formattedData); // Update the state with formatted data
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookingsData();
  }, [year]); // Re-fetch data when the year changes

  return (
    <>
      <h1>Booking per Month on {year}</h1>
      <select name="year" value={year} onChange={handleYearChange}>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>
      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={bookingData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c6b5a1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#c6b5a1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis
              domain={[0, "dataMax + 1"]}
              tickFormatter={(value) => value}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#c6b5a1"
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
