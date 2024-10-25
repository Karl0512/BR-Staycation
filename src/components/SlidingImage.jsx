import React, { useEffect, useState } from 'react';

export default function ScrollImageEffect() {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const images = [
        '/img/car-1.jpg',
        '/img/car-2.jpg',
        '/img/car-3.jpg',
        // Add more image URLs
    ];

    return (
        <div className='image-slide' style={{ height: `${images.length * 100}vh`, overflow: 'hidden', position: 'relative' }}>
            {images.map((image, index) => (
                <div key={index} style={{
                    position: 'absolute',
                    top: `${index * 100}vh`,
                    left: 0,
                    right: 0,
                    height: '100vh',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateY(-${scrollY}px)`,
                    transition: 'transform 0.2s ease',
                }}>
                </div>
            ))}
        </div>
    );
}
