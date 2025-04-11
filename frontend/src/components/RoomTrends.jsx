import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#c6b5a1", "#4a4a4a"];

export default function RoomTrends() {
  const [roomData, setRoomData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchRoomBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings/room-year?year=${year}`
        );
        const bookings = response.data.bookings;

        // Group and count bookings by roomId
        const roomCount = {};
        bookings.forEach((booking) => {
          const roomId = booking.roomId;
          roomCount[roomId] = (roomCount[roomId] || 0) + 1;
        });

        // Format for chart
        const chartData = Object.entries(roomCount).map(([roomId, count]) => ({
          name: `Room ${roomId}`,
          value: count,
        }));

        console.log(response.data);

        console.log("Fetched bookings:", bookings);
        console.log("Processed chartData:", chartData);

        setRoomData(chartData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchRoomBookings();
  }, [year]);

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        Room Booking Trends ({year})
      </h2>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="year">Select Year: </label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: "5px", fontSize: "14px" }}
        >
          {[2025, 2024, 2023].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div style={{ padding: "20px", width: "100%", height: "100%" }}>
        <PieChart width={400} height={300}>
          <Pie
            data={roomData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {roomData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}
