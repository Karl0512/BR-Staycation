import { Link } from "react-router-dom";
import BookNow from '../button/BookNow';
import "./home.css"
import SimpleCalendar from "../calendar/Calendar";
import Amenities from "./Amenities";


export default function Home() {
    return (
        <>
            <div className="home-body">
                <div className="container">
                    <div className="text">
                        <h1 id="heading-1">Your Cozy Getaway</h1>
                        <h2 id="heading-2">With Flexible Hourly Rates!</h2>
                    </div>
                    <div>
                        <BookNow />
                    </div>
                </div>
                    <SimpleCalendar />
            </div>
            <Amenities />
        </>
    )
}