import { Link } from "react-router-dom";
import "../style/Navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/check-auth",
          {
            withCredentials: true,
          }
        );

        setUser(response.data.user);
      } catch (error) {
        console.log("User not authenticated");
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <nav>
      <div className="logo-title">
        <img src="/img/brstaycationLogo.jpg" alt="" id="logo" />
        <h1>Staycation</h1>
      </div>
      <ul className="nav-link">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/contact">Contact us</Link>
        </li>
      </ul>
      <div className="profile" onClick={toggleDropdown}>
        <img src="/img/profile.svg" alt="" />
        {isDropdownOpen && (
          <div className="dropdown">
            {user ? (
              <>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
