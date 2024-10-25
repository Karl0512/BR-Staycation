import React from 'react';
import "../style/ContactUs.css"; // Create this CSS file for styling

export default function ContactUs() {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            
            <div className="contact-options">
                <div className="contact-option">
                    <div className="contact-icon phone-icon"></div> {/* Phone Icon Placeholder */}
                    <h3>BY PHONE</h3>
                    <p>(Monday to Saturday, 9am to 6pm (UTC+8))</p>
                    <p>Globe: <st rong>0-123-456-789</st></p>
                    <p>Smart: <strong>0-912-345-6789</strong></p>
                </div>

                <div className="contact-option">
                    <div className="contact-icon case-icon"></div> {/* Folder Icon Placeholder */}
                    <h3>Submit Your Feedback and Concerns</h3>
                    <p>Send us your questions or concerns by starting a new case and we will give you the help you need.</p>
                    <button className="btn">START HERE</button>
                </div>

                <div className="contact-option">
                    <div className="contact-icon chat-icon"></div> {/* Chat Icon Placeholder */}
                    <h3>FACEBOOK CHAT</h3>
                    <p>Reach us through Facebook.</p>
                    <button className="btn">FACEBOOK CHAT</button>
                </div>          
            </div>

            <div className="track-case">
                <h2>Send a direct message.</h2>
                <p>Send a direct message with our customer service.</p>
                <form className="track-form">
                    <label htmlFor="caseNumber">First Name</label>
                    <input type="text" id="caseNumber" name="caseNumber" placeholder="Enter your name here" required />
                    <label htmlFor="caseNumber">Last Name</label>
                    <input type="text" id="caseNumber" name="caseNumber" placeholder="Enter your lastname here" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email address" required />

                    <button type="submit" className="btn">SEND MESSAGE</button>
                </form>
            </div>
        </div>
    );
}
