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
  const [revenueData, setRevenueData] = useState([]);
  const [year, setYear] = useState("2024"); // Default to 2024 or set a value based on your needs

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    // Fetch the payment data for the selected year
    const fetchPaymentsData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/payment/payments-year?year=${year}`
        ); // Adjust URL if needed
        const payments = response.data.payments;
        console.log(payments);

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

        // Group payments by month and sum the revenue
        const monthlyRevenue = payments.reduce((acc, payment) => {
          const month = new Date(payment.created_at).toLocaleString("en-US", {
            month: "short",
          }); // Get short month name (e.g., "Jan", "Feb", etc.)
          const revenue = payment.amount;

          if (acc[month]) {
            acc[month] += revenue;
          } else {
            acc[month] = revenue;
          }
          return acc;
        }, {});

        // Prepare data for the chart with a count for each month
        const formattedData = allMonths.map((month) => ({
          month,
          revenue: monthlyRevenue[month] || 0, // If no data, set revenue to 0
        }));

        // Sort the data based on the months
        const sortedData = formattedData.sort((a, b) => {
          const monthOrder = [
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
          return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        });

        setRevenueData(sortedData); // Set the data to state
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPaymentsData();
  }, [year]);

  // Calculate the maximum revenue value from the data to set Y-axis domain dynamically
  const maxRevenue = Math.max(...revenueData.map((data) => data.revenue), 0);

  // Generate ticks based on the highest revenue value, dividing by 5 (you can adjust this number for more or fewer ticks)
  const tickInterval = Math.ceil(maxRevenue / 5); // You can adjust this for more precise ticks
  const ticks = Array.from({ length: 6 }, (_, i) => i * tickInterval);

  return (
    <>
      <h1>Payment per Month on {year}</h1>
      <select name="year" value={year} onChange={handleYearChange}>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>
      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c6b5a1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#c6b5a1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis
              domain={[0, maxRevenue + tickInterval]} // Dynamic domain with padding
              ticks={ticks} // Dynamic ticks array
              tickFormatter={(value) => `₱${value.toLocaleString()}`}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#c6b5a1"
              fillOpacity={1}
              fill="url(#colorRev)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
