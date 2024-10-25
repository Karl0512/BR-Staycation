import React, { useState, useEffect } from 'react';
import "../style/Gallery.css"; // Please don't update this line

const reservations = [
    {
        id: 1,
        title: 'Exterior',
        description: 'A beautiful dining area for your family gatherings.',
        images: ['img/exterior1.jpg', 'img/external.jpg'], // Multiple images for slider
    },
    {
        id: 2,
        title: 'Kitchen',
        description: 'A modern kitchen for all your cooking needs.',
        images: ['img/kitchen.jpg', 'img/kitchen.jpg'],
    },
    {
        id: 3,
        title: 'Dining Area',
        description: 'An additional bedroom with stunning views.',
        images: ['img/dining.jpg', 'img/dining1.jpg'],
    },
    {
        id: 4,
        title: 'Bedroom',
        description: 'Fun and entertainment await in the games room.',
        images: ['img/bedroom.jpg', 'img/bedroom1.jpg', 'img/bedroom2.jpg'], // Slider images
    },
    {
        id: 5,
        title: 'Bathroom',
        description: 'A modern bathroom with sleek fixtures.',
        images: ['img/bathroom.jpg', 'img/bathroom1.jpg', 'img/bathroom3.jpg'],
    },
    {
        id: 6,
        title: 'Additional Photos',
        description: 'Some more amazing views and amenities.',
        images: ['img/ps4.jpg', 'img/additional1.jpg'],
    },
];

export default function Home() {
    return (
        <div className="gallery-container">
            {reservations.map((reservation) => (
                <GalleryItem key={reservation.id} reservation={reservation} />
            ))}
        </div>
    );
}

// New GalleryItem component to handle each item separately
function GalleryItem({ reservation }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // Change the image every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex + 1) % reservation.images.length
            );
        }, 3000); // 3 seconds
        return () => clearInterval(interval);
    }, [reservation.images.length]);

    return (
        <div className="gallery-item">
            <div className="gallery-description">
                <h3 className="gallery-title">{reservation.title}</h3>
                <p className="gallery-description-text">{reservation.description}</p>
            </div>
            <div className="gallery-image-container">
                <img
                    src={reservation.images[currentImageIndex]} // Dynamic image
                    alt={`${reservation.title} - ${reservation.description}`} 
                    className="gallery-image"
                />
                <button className="view-all-button">View All Photos</button> {/* Button */}
            </div>
        </div>
    );
}
