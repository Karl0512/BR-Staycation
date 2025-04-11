import PaymentsByMonth from "./PaymentsByMonth";
import BookingByMonth from "./BookingByMonth";
import TotalRevenue from "./TotalRevenue";
import RoomTrends from "./RoomTrends";

export default function ReportAnalytics() {
  return (
    <>
      <PaymentsByMonth />
      <BookingByMonth />
      <TotalRevenue />
      <RoomTrends />
    </>
  );
}
