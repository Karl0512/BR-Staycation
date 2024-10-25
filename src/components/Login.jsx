import "../style/login.css"
import LoginBtn from "./LoginBtn";
import { Link, useNavigate } from "react-router-dom";
import SlidingImage from "./SlidingImage";
import { mockLoginAPI } from '../api/api';
import { useState } from "react"

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()


    const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the mock API
      const response = await mockLoginAPI(username, password);
      setMessage(response.message); // Success message
      navigate('/dashboard')
    } catch (error) {
      setMessage(error.message); // Error message
    }
}

    return (
        <div className="login-body">
                <form action="" className="form-body" onSubmit={handleLogin}>
                    <img src="/img/brstaycationLogo.jpg" alt="" />
                    <div>
                        <h1>Br Staycation</h1>
                        <h2>Please enter your details</h2>
                    </div>
                    
                    <div className="container-label-input">
                        <label htmlFor="username">Username</label>
                        <input 
                        type="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="container-label-input">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="pasword" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        />
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