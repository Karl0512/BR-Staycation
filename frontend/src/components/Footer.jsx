// Footer.jsx
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../style/footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>Connect with us:</p>
                <a href="https://www.facebook.com/profile.php?id=61557942731692" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.tiktok.com/@br.staycation" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-tiktok"></i>
                </a>
                <a href="https://www.airbnb.com/rooms/1191938133896995507?source_impression_id=p3_1729856570_P3PMZF4NEikBhxUg" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-airbnb"></i>
                </a>
            </div>
            
            {/* Copyright Section */}
            <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} BR Staycation. All rights reserved.</p>
            </div>
        </footer>
    );
}
