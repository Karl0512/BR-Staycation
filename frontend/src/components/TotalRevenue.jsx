import axios from "axios";
import { useEffect, useState } from "react";

export default function TotalRevenue() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [yearRevenue, setYearRevenue] = useState(null);
  const [fee, setFee] = useState(null);

  useEffect(() => {
    const fetchAllPayments = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/payment/payments-year?year=${year}`
        );

        const amounts = response.data.payments.map((payment) => payment.amount);

        const totalAmounts = amounts.reduce(
          (acc, currentValue) => acc + currentValue,
          0
        );

        setYearRevenue(totalAmounts - totalAmounts * 0.025);
        setFee(totalAmounts * 0.025);
      } catch (error) {
        console.error("Error fetching amounts: ", error);
      }
    };

    fetchAllPayments();
  }, [year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#c6b5a1",
        height: "fit-content",
        borderRadius: "3rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        <h1>Total Revenue on {year}</h1>
        <select
          name="year"
          value={year}
          onChange={handleYearChange}
          className="year-select"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      <h2 style={{ color: "#28a745" }}>₱ {yearRevenue}</h2>
      <br></br>
      <h2>Paymongo Fee:</h2>
      <h2 style={{ color: "#dc3545" }}>- {fee}</h2>
    </div>
  );
}
