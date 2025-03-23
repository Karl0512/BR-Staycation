import "../style/booknow.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function BookNow() {
  const [user, setUser] = useState(null);

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

  return (
    <Link to={user ? "/rooms" : "/login"} className="btn-booknow">
      Book Now
    </Link>
  );
}
