import { Link } from "react-router-dom";
import BookNow from '../button/BookNow';
import "./home.css"
import SimpleCalendar from "../calendar/Calendar";


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
            <div className="amenities">
                <h1>Amenities</h1>
                <div className="amenities-container">
                    <div>
                        <img src="/img/aircon.svg" alt="" srcset="" />
                        <h1>Air-Condition Room</h1> 
                    </div>
                    <div>
                        <img src="/img/smarttv.svg" alt="" srcset="" />
                        <h1>Smart TV</h1>
                    </div>
                    <div>
                        <img src="/img/wifi.svg" alt="" srcset="" />
                        <h1>WIFI</h1>
                    </div>
                    <div>
                        <img src="/img/ps4.svg" alt="" />
                        <h1>PS4</h1> 
                    </div>
                    <div>
                        <img src="/img/card.svg" alt="" />
                        <h1>Card and Board Games</h1> 
                    </div>
                    <div>
                        <img src="/img/kitchen.svg" alt="" />
                        <h1>Kitchen Wares</h1>  
                    </div>
                    <div>
                        <img src="/img/toothbrush.svg" alt="" />
                        <h1>Bath and Toothbrush</h1>
                    </div>
                    <div>
                        <img src="/img/coffee.svg" alt="" />
                        <h1>Coffee</h1> 
                    </div>
                </div>
            </div>
        </>
    )
}