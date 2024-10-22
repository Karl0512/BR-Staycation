import { Link } from "react-router-dom";
import BookNow from '../button/BookNow';
import "./home.css"
import SimpleCalendar from "../calendar/Calendar";
import Amenities from "./Amenities";
import RoomGallery from './RoomGallery';
import { motion } from 'framer-motion';


export default function Home() {
    return (
        <>
            <div className="home-body">
                <div className="container">
                    <div className="text">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.3,
                              ease: [0, 0.71, 0.2, 1.01]
                            }}
                        >
                        <h1 id="heading-1">Your Cozy Getaway</h1>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.5,
                              ease: [0, 0.71, 0.2, 1.01]
                            }}
                        >
                        <h2 id="heading-2">With Flexible Hourly Rates!</h2>
                        </motion.div>
                    </div>
                    <div>
                        <BookNow />
                    </div>
                </div>
                    <SimpleCalendar />
            </div>
            <RoomGallery />
            <Amenities />
        </>
    )
}