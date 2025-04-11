import React from "react";
import "../style/ContactUs.css";

export default function ContactUs() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-description"></p>

      <div className="contact-main">
        {/* Left Side: Contact Details */}
        <div className="contact-form">
          <h3>Send Message</h3>
          <form>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" required />

            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />

            <label>Type your Message</label>
            <textarea
              rows="4"
              placeholder="Write your message here..."
              required
            ></textarea>

            <button type="submit" className="btn">
              Send
            </button>
          </form>
        </div>
        <div className="contact-info">
          {/* Address with Clickable Map Icon */}
          <div className="address-box">
            <a
              href="https://www.google.com/maps/search/?api=1&query=102+Plaza+Condominium,+Antipolo,+1870+Rizal"
              target="_blank"
              rel="noopener noreferrer"
              className="maps-link"
            >
              <div className="address-icon"></div> {/* Clickable Map Icon */}
            </a>
            <div className="address-details">
              <h3>Address</h3>
              <p>
                102 Plaza Condominium,
                <br /> Antipolo, 1870 Rizal
              </p>
            </div>
          </div>

          {/* Telephone Section */}
          <div className="info-box">
            <h3>Telephone</h3>
            <p>
              Telephone Number: <strong>0-123-456-789</strong>
            </p>
          </div>

          {/* Email Section */}
          <div className="info-box">
            <h3>Email</h3>
            <p>brstaycation@example.com</p>
          </div>
        </div>

        {/* Right Side: Send Message Form */}
      </div>
    </div>
  );
}
