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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <ProfileNav></ProfileNav>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            width: "fit-content",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            gap: "2rem",
            padding: "3rem",
            borderRadius: "3rem",
          }}
        >
          <label htmlFor="" style={{ fontSize: "1.5rem" }}>
            Email:
          </label>
          <input
            type="email"
            name=""
            id=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderRadius: "2rem" }}
          />
          <label htmlFor="" style={{ fontSize: "1.5rem" }}>
            Contact No:
          </label>
          <input
            type="text"
            name=""
            style={{ borderRadius: "2rem" }}
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
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn-save" onClick={handleUpdateInfo}>
            Save
          </button>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
}
