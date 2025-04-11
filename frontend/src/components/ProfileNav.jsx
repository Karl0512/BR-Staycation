import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../style/profilenav.css";
import axios from "axios";

export default function ProfileNav() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "1rem",
        borderRight: "2px solid #c6b5a1",
      }}
    >
      <Link className="btn-profile" to="/profile">
        Profile
      </Link>
      <Link className="btn-book-history" to="/bookinghistory">
        Booking History
      </Link>
      <Link className="btn-change-pass" to="/changepassword">
        Change password
      </Link>
    </div>
  );
}
