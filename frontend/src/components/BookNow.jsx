import "../style/booknow.css";
import { Link } from "react-router-dom";

export default function BookNow() {
  return (
    <Link to="/rooms" className="btn-booknow">
      Book Now
    </Link>
  );
}
