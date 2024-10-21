// Photos from https://citizenofnowhe.re/lines-of-the-city
import "./Roomgallery.css"
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Parallax effect using scroll
function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const images = [
    { src: "/img/car-1.jpg "},
    { src: "/img/car-2.jpg "},
    { src: "/img/car-3.jpg "},
    { src: "/img/car-4.jpg "},
    { src: "/img/car-5.jpg "},
]

// Image component
function Image({ src }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section>
      <div ref={ref}>
        <img src={src} />
      </div>
      <motion.h2 style={{ y }}>{`BR`}</motion.h2>
    </section>
  );
}

export default function RoomGallery() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {images.map((image, index) => (
        <Image key={index} src={image.src} />
      ))}
    </>
  )
}
