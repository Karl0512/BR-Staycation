import "./Roomgallery.css"
import { animate, motion } from "framer-motion";

export default function RoomGallery() {
  const slideInNegative = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  }

  const slideInPositive = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  }

  const fadeInOut = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <div className="container">
      <div className="wrapper">
        <motion.div 
          variants={slideInNegative}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          scrollSnapAlign="start"
        >
        <img src="/img/car-1.jpg" alt="" />
        </motion.div>
        <motion.div
          variants={fadeInOut}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          exit="initial"
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
        <h1>Cozy</h1>
        </motion.div>
      </div>
      <div className="wrapper">
      <motion.div
          variants={fadeInOut}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          exit="initial"
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
        <h1>Refreshing</h1>
        </motion.div>
        <motion.div 
          variants={slideInPositive}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          scrollSnapAlign="start"
        >
        <img src="/img/car-2.jpg" alt="" />
        </motion.div>
      </div>
      <div className="wrapper">
      <motion.div 
          variants={slideInNegative}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          scrollSnapAlign="start"
        >
        <img src="/img/car-3.jpg" alt="" />
        </motion.div>
        <motion.div
          variants={fadeInOut}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          exit="initial"
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
        <h1>Refreshing</h1>
        </motion.div>
      </div>
      <div className="wrapper">
      <motion.div
          variants={fadeInOut}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          exit="initial"
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
        <h1>Refreshing</h1>
        </motion.div>
        <motion.div 
          variants={slideInPositive}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          scrollSnapAlign="start"
        >
        <img src="/img/car-4.jpg" alt="" />
        </motion.div>
      </div>
      <div className="wrapper">
      <motion.div 
          variants={slideInNegative}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          scrollSnapAlign="start"
        >
        <img src="/img/car-5.jpg" alt="" />
        </motion.div>
        <motion.div
          variants={fadeInOut}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          exit="initial"
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
        <h1>Refreshing</h1>
        </motion.div>
      </div>
      
    </div>
  )
}