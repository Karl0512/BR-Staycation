import { motion } from "framer-motion";

export default function Amenities() {
    const popUpVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0},
    }
    
    return (
        <div className="amenities">
                <h1>Amenities</h1>
                <div className="amenities-container">
                    <motion.div
                        variants={popUpVariant}
                        initial="hidden"
                        whileInView={popUpVariant.visible}
                        exit={popUpVariant.hidden}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="/img/aircon.svg" alt="" srcset="" />
                        <h1>Air-Condition Room</h1>
                        <h2>Fully Air-Conditioned Room throughout the stay!</h2> 
                    </motion.div>
                    <motion.div
                        variants={popUpVariant}
                        initial="hidden"
                        whileInView={popUpVariant.visible}
                        exit={popUpVariant.hidden}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="/img/smarttv.svg" alt="" srcset="" />
                        <h1>Smart TV</h1>
                        <h2>Unli Netflix HD and Unli Youtube</h2>
                    </motion.div>
                    <motion.div
                        variants={popUpVariant}
                        initial="hidden"
                        whileInView={popUpVariant.visible}
                        exit={popUpVariant.hidden}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="/img/wifi.svg" alt="" srcset="" />
                        <h1>WIFI</h1>
                        <h2>Free Unlimited WiFi!</h2>
                    </motion.div>
                    <motion.div
                        variants={popUpVariant}
                        initial="hidden"
                        whileInView={popUpVariant.visible}
                        exit={popUpVariant.hidden}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="/img/ps4.svg" alt="" />
                        <h1>PS4</h1> 
                        <h2>PS4 With 2 Controller</h2>
                    </motion.div>
                    <motion.div
                        variants={popUpVariant}
                        initial="hidden"
                        whileInView={popUpVariant.visible}
                        exit={popUpVariant.hidden}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="/img/card.svg" alt="" />
                        <h1>Card and Board Games</h1>
                        <h2>Included Cards and Board Games!</h2> 
                    </motion.div>
                    <motion.div
                        variants={popUpVariant}
                        initial="hidden"
                        whileInView={popUpVariant.visible}
                        exit={popUpVariant.hidden}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="/img/kitchen.svg" alt="" />
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
                        whileInView={popUpVariant.visible}
                        exit={popUpVariant.hidden}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="/img/toothbrush.svg" alt="" />
                        <h1>Bath and Toothbrush</h1>
                        <h2>
                            2 sets of toothbrush, toothpaste,
                            hand soap, shampoo, conditioner
                        </h2>
                    </motion.div>
                    <motion.div
                        variants={popUpVariant}
                        initial="hidden"
                        whileInView={popUpVariant.visible}
                        exit={popUpVariant.hidden}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="/img/coffee.svg" alt="" />
                        <h1>Coffee</h1>
                        <h2>Unlimited Coffee for Coffee lovers!</h2> 
                    </motion.div>
                </div>
        </div>
    )
}