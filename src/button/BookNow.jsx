import "./booknow.css"
import { Link } from 'react-router-dom';

export default function BookNow() {
    return (
        <Link to="/book" className="btn-booknow" >Book Now</Link>
        
    )
}