import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "../style/signup.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [validateEmail, setValidateEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function getAge(birthdate) {
    const birth = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    // Adjust age if the birthdate hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  useEffect(() => {
    if (email.includes("@")) {
      setValidateEmail(""); // Clear error if valid
    } else if (email.length > 0) {
      setValidateEmail("Invalid Email"); // Show error only if input isn't empty
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const age = getAge(birthdate);
    //console.log(age);
    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        firstname,
        lastname,
        email,
        password,
        contactnumber: contactNumber,
        age,
        role: "client",
      });
      console.log("User account created");
      navigate("/");
    } catch (error) {
      console.log("Error Message: ", error.message);
    }
  };

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} action="" className="signup">
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
            <div style={{ position: "relative", display: "inline-block" }}>
              <label htmlFor="">Email</label>
              <p
                style={{
                  position: "absolute",
                  top: "0",
                  left: "35%",
                  color: "red",
                }}
              >
                {validateEmail}
              </p>
            </div>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() =>
                setValidateEmail(email.includes("@") ? "" : "Invalid Email")
              }
            />
            <label htmlFor="">Password</label>
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%" }}
              />
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "row",
                  top: "-20%",
                  left: "60%",
                }}
              >
                <input
                  type="checkbox"
                  name=""
                  onClick={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="">Show Password</label>
              </div>
            </div>

            <label htmlFor="">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={contactNumber}
              onChange={(e) => {
                let newValue = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers

                // Ensure it starts with "09" and is at most 11 characters
                if (newValue.length > 11) {
                  newValue = newValue.slice(0, 11);
                }

                if (!newValue.startsWith("09")) {
                  newValue = "09"; // Force start with "09"
                }

                setContactNumber(newValue);
              }}
              placeholder="Enter contact number"
              maxLength={11}
            />
            <label htmlFor="">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              max={maxDate}
            />
            <div className="id-wrapper">
              <label htmlFor="">Upload Valid Id: </label>
              <input type="file" name="" id="valid-id" />
            </div>
          </div>
          <button className="btn-reg" onSubmit={handleSubmit}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
