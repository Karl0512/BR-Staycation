import axios from "axios";
import ProfileNav from "./ProfileNav";
import { useState } from "react";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const handleUpdatePassword = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/users/update`,
        {
          password,
        },
        { withCredentials: true }
      );

      setStatus("Updated!");
    } catch (error) {}
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <ProfileNav />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
          gap: "2rem",
        }}
      >
        <div
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            width: "fit-content",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            padding: "3rem",
            borderRadius: "3rem",
          }}
        >
          <label htmlFor="">New Password:</label>
          <input
            type="password"
            name=""
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div tyle={{ display: "flex", justifyContent: "center" }}>
          <button className="btn-save" onClick={handleUpdatePassword}>
            Save
          </button>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
}
