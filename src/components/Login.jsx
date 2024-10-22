import "../style/login.css"
import LoginBtn from "./LoginBtn";
import { Link } from "react-router-dom";
import SlidingImage from "./SlidingImage";

export default function Login() {
    return (
        <div className="login-body">
                <form action="" className="form-body">
                    <img src="/img/brstaycationLogo.jpg" alt="" />
                    <div>
                        <h1>Br Staycation</h1>
                        <h2>Please enter your details</h2>
                    </div>
                    
                    <div className="container-label-input">
                        <label htmlFor="username">Username</label>
                        <input type="username" />
                    </div>
                    <div className="container-label-input">
                        <label htmlFor="password">Password</label>
                        <input type="pasword" />
                    </div>
                    <LoginBtn />
                    <div className="signup-btn">
                        <p>Dont have an account? </p>
                        <li><Link to="/signup">Sign up</Link></li>
                    </div>
                    
                    <li><Link to="/">Go back</Link></li>
                </form>
                
        </div>
    )
    
}