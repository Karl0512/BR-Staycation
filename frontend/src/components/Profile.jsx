import { Link } from "react-router-dom";
import "../style/Navbar.css";
import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import ProfileNav from "./ProfileNav";

export default function Profile() {
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdateInfo = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/users/update`,
        {
          email,
          contactnumber: contactNumber,
        },
        { withCredentials: true }
      );

      setStatus("Updated!");
    } catch (error) {}
  };

  return (
    <>
      <ProfileNav></ProfileNav>
      <label htmlFor="">Email:</label>
      <input
        type="email"
        name=""
        id=""
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="">Contact No:</label>
      <input
        type="text"
        name=""
        id=""
        value={contactNumber}
        onChange={(e) => {
          let newValue = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers

          // Ensure it starts with "09" and is at most 11 characters
          if (newValue.length > 11) {
            newValue = newValue.slice(0, 11);
          }

          if (!newValue.startsWith("09")) {
            newValue = "09"; // Force start with "09"
          }

          setContactNumber(newValue);
        }}
      />
      <label htmlFor=""></label>

      <button onClick={handleUpdateInfo}>Save</button>
      <p>{status}</p>
    </>
  );
}
