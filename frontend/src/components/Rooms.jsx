// IMPORT YUNG MGA KAILANGAN
import React, { useState } from "react";
import BookingPage from "./Book"; // Import your Booking component
import "../style/rooms.css";

export default function Rooms() {
  // MAG SET NG VARIABLE PARA SA MAG OPEN AT CLOSE NG POPUP
  // MAG SET DIN PARA SA MAG TRACK KUNG ANONG ROOM ANG PINILI NG USER
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // FUNCTION PARA SA PAG BUKAS NG POPUP
  const openModal = (room) => {
    setSelectedRoom(room); // Set the room details dynamically
    setIsModalOpen(true); // Show modal
  };

  // FUNCTION PARA SA PAG CLOSE NG POPUP
  const closeModal = () => {
    setIsModalOpen(false); // Hide modal
    setSelectedRoom(null); // Clear room details
  };

  return (
    <>
      <div className="box-container">
        <div className="box-room">
          {/* PAG KA PININDOT YUNG DIV TATAWAGIN YUNG FUNCTION NA OPENMODAL AT ANG ILALAGAY AY 1 PARA SA ROOM 1
              ETO YUNG IPAPASA PAPUNTANG BOOKING
          */}
          <div className="box" onClick={() => openModal(1)}>
            <img className="box-img" src="/img/car-5.jpg" alt="Room 1" />
            <p className="text-box">Room 1</p>
          </div>

          {/* SAME LANG DITO PERO 2 YUNG IPAPASA 
              NEED TONG AYUSIN DAPAT PAG KA NAG DAGDAG ADMIN NG ROOM AUTOMATIC NA MAG KAKAROON DITO
          */}
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
