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
    <>
      <select name="year" value={year} onChange={handleYearChange}>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>

      <h1>Total Revenue on {year}</h1>
      <h2>{yearRevenue}</h2>
      <h2>Paymongo Fee:</h2>
      <h2>{fee}</h2>
    </>
  );
}
