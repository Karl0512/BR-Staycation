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
    <>
      <ProfileNav />
      <label htmlFor="">New Password:</label>
      <input
        type="password"
        name=""
        id=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleUpdatePassword}>Save</button>
      <p>{status}</p>
    </>
  );
}
