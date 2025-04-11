import "../style/login.css";
import { Link, useNavigate } from "react-router-dom";
import SlidingImage from "./SlidingImage";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      const { role } = response.data;

      if (role === "admin") {
        console.log("Welcome Admin", response.data);
        navigate("/dashboard"); // Redirect to admin dashboard
      } else {
        console.log("Login successful:", response.data);
        navigate("/"); // Redirect to regular user dashboard
      }
    } catch (error) {
      setError(error.response ? error.response.data.error : "Server Error");
    }
  };

  return (
    <div className="login-body">
      <form onSubmit={handleSubmit} action="POST" className="form-body">
        <img src="/img/brstaycationLogo.jpg" alt="" />
        <div>
          <h1>Br Staycation</h1>
          <h2>Please enter your details</h2>
          <h3>{error}</h3>
        </div>

        <div className="container-label-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>
        <div className="container-label-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <button className="btn-login" type="submit">
          Login
        </button>
        <div className="signup-btn">
          <p>Dont have an account? </p>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </div>

        <li>
          <Link to="/">Go back</Link>
        </li>
      </form>
    </div>
  );
}
