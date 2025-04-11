import PaymentsByMonth from "./PaymentsByMonth";
import BookingByMonth from "./BookingByMonth";
import TotalRevenue from "./TotalRevenue";
import RoomTrends from "./RoomTrends";
import SideNav from "./SideNav";
import "../style/reports.css";

export default function ReportAnalytics() {
  return (
    <div className="reports-container">
      <SideNav />
      <div className="reports-content">
        <div style={{ backgroundColor: "#4a4a4a", position: "sticky" }}></div>
        <div className="analytics">
          <TotalRevenue />
          <RoomTrends />
        </div>

        <PaymentsByMonth />
        <BookingByMonth />
      </div>
    </div>
  );
}
