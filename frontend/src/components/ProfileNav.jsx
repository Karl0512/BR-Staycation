import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function ProfileNav() {
  return (
    <>
      <Link to="/profile">Profile</Link>
      <Link to="/bookinghistory">Booking History</Link>
      <Link to="/changepassword">Change password</Link>
      <button>Logout</button>
    </>
  );
}
