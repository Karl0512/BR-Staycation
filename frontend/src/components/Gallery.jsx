import React, { useState } from "react";
import "../style/Gallery.css";

export default function Gallery() {
  const images = [
    "/img/car-1.jpg",
    "/img/car-2.jpg",
    "/img/car-3.jpg",
    "/img/car-4.jpg",
    "/img/car-5.jpg",
    "/img/car-6.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  const openImage = (index) => {
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setCurrentIndex(null);
  };

  const showPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const showNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="gallery">
      {images.map((src, index) => (
        <div
          className="gallery-item"
          key={index}
          onClick={() => openImage(index)}
        >
          <img src={src} alt={`Gallery Item ${index + 1}`} />
        </div>
      ))}

      {/* Lightbox */}
      {currentIndex !== null && (
        <div className="lightbox">
          <button className="close-btn" onClick={closeImage}>
            ×
          </button>
          <button
            className="prev-btn"
            onClick={showPrevious}
            disabled={currentIndex === 0}
          >
            ‹
          </button>
          <img
            src={images[currentIndex]}
            alt={`Gallery Lightbox ${currentIndex + 1}`}
          />
          <button
            className="next-btn"
            onClick={showNext}
            disabled={currentIndex === images.length - 1}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
