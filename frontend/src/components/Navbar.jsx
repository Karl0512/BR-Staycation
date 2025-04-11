import { Link } from "react-router-dom";
import "../style/Navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
          {
            withCredentials: true,
          }
        );

        setRole(response.data.decoded.role);
        setUser(response.data.decoded.userfname);
      } catch (error) {
        console.error("User not authenticated");
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
    window.location.reload();
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
        {}
      </ul>

      {user ? <h1 style={{ marginRight: "10px" }}> Welcome {user}!</h1> : ""}
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
