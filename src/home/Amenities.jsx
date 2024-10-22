import { motion } from "framer-motion";

export default function Amenities() {
  const popUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="amenities">
        <motion.div 
            variants={popUpVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <h1>Amenities</h1>
        </motion.div>
      <div className="amenities-container">
        <motion.div
            variants={popUpVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <img src="/img/aircon.svg" alt="Air Conditioner" />
            <h1>Air-Condition Room</h1>
            <h2>Fully Air-Conditioned Room throughout the stay!</h2>
        </motion.div>
        <motion.div
            variants={popUpVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <img src="/img/smarttv.svg" alt="Smart TV" />
          <h1>Smart TV</h1>
          <h2>Unli Netflix HD and Unli Youtube</h2>
        </motion.div>
        <motion.div
            variants={popUpVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <img src="/img/wifi.svg" alt="Smart TV" />
          <h1>WIFI</h1>
          <h2>Unlimited Wifi!</h2>
        </motion.div>
        <motion.div
            variants={popUpVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <img src="/img/ps4.svg" alt="Smart TV" />
          <h1>PS4</h1>
          <h2>PS4 With 2 controller</h2>
        </motion.div>
        <motion.div
            variants={popUpVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <img src="/img/card.svg" alt="Smart TV" />
          <h1>Card and Board Games</h1>
          <h2>Included cards and board games!</h2>
        </motion.div>
        <motion.div
            variants={popUpVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <img src="/img/kitchen.svg" alt="Smart TV" />
          <h1>Kitchen Wares</h1>
          <h2>
            Refrigerator, Rice Cooker,
            Microwave Oven, Electric Cooker,
            Induction Cooker, Electric Kettle,
            Kitchen wares, and Utensils
          </h2>
        </motion.div>
        <motion.div
            variants={popUpVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <img src="/img/toothbrush.svg" alt="Smart TV" />
          <h1>Bath And Toothbrush</h1>
          <h2>
            2 sets of toothbrush, toothpaste,
            hand soap, shampoo, conditioner
          </h2>
        </motion.div>
        <motion.div
            variants={popUpVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <img src="/img/coffee.svg" alt="Smart TV" />
          <h1>Coffee</h1>
          <h2>Unlimited Coffee for Coffee Lovers!</h2>
        </motion.div>
      </div>
    </div>
  );
}
