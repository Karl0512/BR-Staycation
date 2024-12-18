import React, { useState } from "react";
import BookingPage from "./Book"; // Import your Booking component
import "../style/rooms.css";

export default function Rooms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const openModal = (room) => {
    setSelectedRoom(room); // Set the room details dynamically
    setIsModalOpen(true); // Show modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Hide modal
    setSelectedRoom(null); // Clear room details
  };

  return (
    <>
      <div className="box-container">
        <div className="box-room">
          <div className="box" onClick={() => openModal(1)}>
            <img className="box-img" src="/img/car-5.jpg" alt="Room 1" />
            <p className="text-box">Room 1</p>
          </div>
          <div className="box" onClick={() => openModal(2)}>
            <img className="box-img" src="/img/car-2.jpg" alt="Room 2" />
            <p className="text-box">Room 2</p>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
          >
            {/* Render the BookingPage component as a modal content */}
            <BookingPage room={selectedRoom} closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}
