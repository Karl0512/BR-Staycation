import SideNav from "./SideNav";
import { Link } from "react-router-dom";
import "../style/customer.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

export default function Customer() {
  const [users, setUsers] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    getUsers();
  }, []);

  const handleDeactivate = async (userId, currentStatus) => {
    if (!window.confirm("Are you sure you want to deactivate this user?"))
      return;

    try {
      const newStatus = currentStatus === "active" ? "deactivated" : "active";
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/toggle-status`,
        { status: newStatus }
      );
      alert("User deactivated succesfully");
      getUsers();
    } catch (error) {}
  };

  return (
    <div className="account-container">
      <SideNav />
      <div className="account-table">
        <table className="account-overview-table">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Contact Number</th>
            <th>role</th>
            <th>Status</th>
          </tr>
          <tbody>
            {users.length > 0 ? (
              users.map((users) => (
                <tr key={users.id}>
                  <td>{users.id}</td>
                  <td>{users.firstname + " " + users.lastname}</td>
                  <td>{users.email}</td>
                  <td>{users.age}</td>
                  <td>{users.contactnumber}</td>
                  <td>{users.role}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleDeactivate(users.id, users.status);
                      }}
                      style={{
                        backgroundColor:
                          users.status !== "active" ? "red" : "green",
                        color: "white",
                        borderRadius: "10px",
                        padding: "0.5rem",
                      }}
                    >
                      {users.status !== "active" ? "deactivated" : "active"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No bookings available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
