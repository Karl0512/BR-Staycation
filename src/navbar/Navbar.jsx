import { Link } from "react-router-dom";
import "./Navbar.css"
import { useState } from "react";

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <nav>
            <div className="logo-title">
                <img src="/img/brstaycationLogo.jpg" alt="" id="logo" />
                <h1>Staycation</h1>
            </div>
            <ul className="nav-link">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/contact">Contact us</Link></li>
            </ul>
            <div className="profile" onClick={toggleDropdown}>
                <img src="/img/profile.svg" alt="" />
                {isDropdownOpen &&(
                    <div className="dropdown">
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}