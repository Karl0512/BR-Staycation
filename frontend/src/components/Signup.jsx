import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "../style/signup.css"
import { useState } from 'react';
import axios from "axios";

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fullname = `${firstname} ${lastname}`

        try {
            const response = await axios.post('http://localhost:5000/api/users', {
                name: fullname,
                email,
                password,
                contactNumber,
                birthdate
            })
            console.log("User account created")
            navigate("/")

        } catch (error) {
            
        }
    }

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} action="" className="signup" >
                <div className="signup-wrapper">
                    <div>
                        <h1>Sign up</h1>
                    </div>
                    <div className="form">
                        <label htmlFor="">Lastname</label>
                        <input 
                            type="text" 
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <label htmlFor="">Firstname</label>
                        <input 
                            type="text" 
                            name="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <label htmlFor="">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <label htmlFor="">Password</label>
                        <input 
                            type="text" 
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        
                        <label htmlFor="">Contact Number</label>
                        <input 
                            type="text" 
                            name="contactNumber" 
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                        <label htmlFor="">Birthdate</label>
                        <input 
                            type="date" 
                            name="birthdate" 
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                        <div className="id-wrapper">
                            <label htmlFor="">Upload Valid Id: </label>
                            <input type="file" name="" id="" /> 
                        </div>
                        
                    </div> 
                    <button className="btn-reg" onSubmit={handleSubmit}>Register</button>
                </div>
                
            </form>
        </div>
    )
}