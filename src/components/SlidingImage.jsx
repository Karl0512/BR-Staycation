import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/img/car-1.jpg", 
    "/img/car-2.jpg", 
    "/img/car-3.jpg", 
    "/img/car-4.jpg",
    "/img/car-5.jpg",
    "/img/car-6.jpg"
];

export default function SlidingImage() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start the transition
      setIsTransitioning(true);

      // Update index after the slide transition duration
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length); // Move to the next image
        setIsTransitioning(false); // End the transition
      }, 2000); // Match this with the slide duration
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", borderRadius: "20px", boxShadow: "0 3px 5px 5px rgba(0, 0, 0, 0.5)" }}>
    <div style={{ 
        position: "relative", 
        width: "50vw", 
        height: "50vh", 
        overflow: "hidden", 
        display: "flex", 
        justifyContent: "center",
        borderRadius: "20px",
         }}>
      <AnimatePresence>
        {/* Current image */}
        <motion.div
          key={index}
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          //exit={{ x: "-100%" }} // Slide out to the left
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${images[index]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
          }}
        />
        
        {/* Next image */}
        {isTransitioning && (
          <motion.div
            key={(index + 1) % images.length} // This ensures the next image key is correctly set
            initial={{ x: "100%" }} // Start off-screen to the right
            animate={{ x: 0 }}      // Slide in to the center
            //exit={{ x: "100%" }}    // Optional exit to the right
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{

              width: "100%",
              height: "100%",
              backgroundImage: `url(${images[(index + 1) % images.length]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
            }}
          />
        )}
      </AnimatePresence>
    </div>
    </div>
  );
}
