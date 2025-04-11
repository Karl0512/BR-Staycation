import { Link, NavLink } from "react-router-dom";
import "../style/sidenav.css";
import axios from "axios";

export default function SideNav() {
  const signOut = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    window.location.reload();
  };
  return (
    <div className="side-nav">
      <div className="side-nav-heading">
        <img src="/img/brstaycationLogo.jpg" alt="" />
        <h1>Staycation</h1>
      </div>
      <div className="side-nav-link">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "side-nav-item active-link" : "side-nav-item"
            }
            to="/dashboard"
          >
            <img src="/img/calendar.svg" alt="" />
            Booking Overview
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "side-nav-item active-link" : "side-nav-item"
            }
            to="/customer"
          >
            <img src="/img/customer.svg" alt="" />
            Customer Management
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "side-nav-item active-link" : "side-nav-item"
            }
            to="/paymentinvoices"
          >
            <img src="/img/invoice.svg" alt="" />
            Payment & Invoices
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "side-nav-item active-link" : "side-nav-item"
            }
            to="/reportAnalytics"
          >
            <img src="/img/analytics.svg" alt="" />
            Report & Analytics
          </NavLink>
        </li>
      </div>
      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
}
