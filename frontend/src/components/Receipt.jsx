// iimport mga kailangan
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/receipt.css";
import "../style/sidenav.css";
import { useNavigate } from "react-router-dom";
import { parse, format, subHours, addHours } from "date-fns";
import axios from "axios";

const Receipt = ({ paymentId }) => {
  // kunin yung mga data galing sa booking dalhin sa receipt gamit useLocation
  const location = useLocation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
          {
            withCredentials: true,
          }
        );

        setToken(response.data.decoded);
      } catch (error) {
        console.log("User not authenticated");
      }
    };

    checkIfLoggedIn();
  }, []);

  // deconstruct yung object
  const {
    startDate,
    endDate,
    time,
    guests,
    roomId,
    price,
    label,
    name,
    email,
    rate,
  } = location.state || {};

  let guestFee = guests > 2 ? 300 * (guests - 2) : 0;

  // mag set variable para sa pag track ng status ng payment mag uupdate lang pag nabayaran na
  const [paymentStatus, setPaymentStatus] = useState("pending");

  // mag set ng variable para sa payment method
  const [selectedPayment, setSelectedPayment] = useState(null);

  // gawin object yung string na date from booking component
  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);

  // function para gawin date yung time string
  function setTimeToDate(startDateObject, timeString) {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    const updatedDate = new Date(startDateObject);

    updatedDate.setHours(hours);
    updatedDate.setMinutes(minutes);
    updatedDate.setSeconds(0);
    updatedDate.setMilliseconds(0);

    return updatedDate;
  }

  // function para i compute kung ilang araw lumipas
  function calculateDaysPassed(startDateObject, endDateObject) {
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endDateObject - startDateObject;

    // Convert milliseconds to days and round down to the nearest whole number
    const daysPassed = Math.floor(
      differenceInMilliseconds / (24 * 60 * 60 * 1000)
    );

    return daysPassed;
  }

  // pag sasamahin yung date object at time, gagana lang kung may provided na time
  const updatedStartDateObject = time
    ? setTimeToDate(new Date(startDateObject), time)
    : new Date(startDateObject);

  // function para i subtract yung oras para to sa mga booking over 1 day
  function subtractHoursFromTime(timeString, hoursToSubtract) {
    // Parse the time string into a Date object
    const time = parse(timeString, "hh:mm a", new Date());

    // Subtract the specified number of hours
    const newTime = subHours(time, hoursToSubtract);

    // Format the new time back to a string
    const newTimeString = format(newTime, "hh:mm a");
    return newTimeString;
  }

  // function para sa pag add ng oras para sa booking na 1 day
  function addHoursToTime(timeString, hoursToAdd) {
    // Parse the time string into a Date object
    const time = parse(timeString, "hh:mm a", new Date());

    // Add the specified number of hours
    const newTime = addHours(time, hoursToAdd);

    // Format the new time back to a string
    const newTimeString = format(newTime, "hh:mm a");
    return newTimeString;
  }

  // mag declare ng variable na endtime i set sa null
  // tawagin yung function the nag compute kung gaanong karaming days and lumipas
  let endTime = null;
  const days = calculateDaysPassed(startDateObject, endDateObject);

  // IF ELSE CONDITION para kung 1 day lang yung booking o hindi pag ka hindi mag susubtract,
  // pagka oo mag add ng oras either 8 or 12hrs idadagdag
  if (startDateObject.toDateString() === endDateObject.toDateString()) {
    endTime = addHoursToTime(time, label);
  } else {
    endTime = subtractHoursFromTime(time, days * 2);
  }

  // function na mag hahandle ng event na payment
  const handeToPayment = async () => {
    // mag create ng object pangalan ay paymentData
    // same siya sa structure ng object na hinihingi ni paymongo

    const downpayment =
      parseInt(guestFee) < 0
        ? parseInt(price) - parseInt(price) * 0.5
        : (parseInt(guestFee) + parseInt(price)) * 0.5;

    const paymentData = {
      data: {
        attributes: {
          amount: downpayment, // Amount in cents (10000 = 100.00 PHP)
          description: "Booking for Staycation",
          payment_method_allowed: ["gcash"],
          metadata: {
            startDate,
            endDate,
            email,
            name,
            time,
            guests,
            roomId,
            price,
          },
        },
      },
    };
    //console.log(paymentData.data.attributes.metadata);

    // pagtapos mag create ng object try catch block para i send sa api endpoint
    // lagyan ng header at content type ay application/json
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/paymentCreate`, // Replace with your API endpoint
        paymentData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );

      // after maipasa ng try catch mag bukas ng panibagong window
      // kunin ang url galing sa response na manggagaling sa api endpoint
      window.open(response.data.checkout_url);
    } catch (error) {
      console.error("Error occured: ", error.response?.data || error.message);
    }
  };

  // function para i calculate yung price
  function calculatePrice(price, days) {
    const amount = price * days;

    return amount;
  }
  // function para i calculate yung total
  function calculateTotal(price, days, guest) {
    const total = price * days + (2 - guest) * 300;
    return total;
  }

  return (
    <>
      <div className="receipt">
        <div className="payment-method">
          <h1>Payment Method</h1>
          <div className="payment-option">
            <div
              className={`option cash ${
                selectedPayment === "cash" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                id="cash"
                name="payment"
                checked={selectedPayment === "cash"}
                onChange={() => setSelectedPayment("cash")}
              />
              <label htmlFor="cash">
                <img src="./img/cash.svg" alt="Cash Payment" />
                <p>Cash Payment</p>
              </label>
            </div>
            <div
              className={`option online ${
                selectedPayment === "Gcash" ? "selected" : ""
              }`}
              onChange={() => setSelectedPayment("Gcash")}
            >
              <input
                type="radio"
                id="Gcash"
                name="payment"
                checked={selectedPayment === "Gcash"}
                onChange={() => setSelectedPayment("Gcash")}
              />
              <label htmlFor="Gcash">
                <img src="./img/gcash-icon.svg" alt="Gcash Payment" />
                <p>Gcash Payment</p>
              </label>
            </div>
          </div>
        </div>
        <div className="payment-summary">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="./img/brstaycationLogo.jpg" id="br-logo" />
            <strong style={{ fontSize: "3rem" }}>Staycation</strong>
          </div>

          <h1 style={{ textAlign: "start" }}>Booking Details</h1>

          {/* ilagay sa html yung mga data para makita ng user ang kanilang input from booking */}
          <p style={{ color: "green" }}>
            Check in:{" "}
            {/* gawin string yung date na object para maintindihan ng user */}
            {updatedStartDateObject.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {/* ganon din sa time gawing string para maintindihan ng user */}
            {` ${updatedStartDateObject.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </p>

          {/* same lang sa startdate gawin string din yung enddate na 
              object para maintindihan ng user 
          */}
          <p style={{ color: "#ff4d4f" }}>
            Check out:{" "}
            {endDateObject?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            {/* kunin yung endtime based sa if else condition kanina */}
            {endTime}
          </p>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Guest: {guests}</p>
          <p>For: {label} hrs</p>
          <h1 style={{ textAlign: "start" }}>Pricing Breakdown</h1>
          <p>
            Rate: {label} hrs for ₱{rate}
          </p>
          {/* i calculate yung price */}
          <p>
            {"₱ "}
            Guest {"(₱ 300 for each additional guest beyond 2)"}:{"₱ "}
            {guests > 2 ? (guests - 2) * 300 : 0}{" "}
          </p>

          {/* i calculate yung total */}
          <p>
            Total:{"₱ "}
            {guestFee < 0 ? price : parseInt(price) + parseInt(guestFee)}{" "}
          </p>
          <p>
            Downpayment:{"₱ "}
            {parseInt(guestFee) < 0
              ? parseInt(price) - parseInt(price) * 0.5
              : (parseInt(guestFee) + parseInt(price)) * 0.5}{" "}
          </p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="btn-sidenav-signout"
              style={{ width: "50%" }}
              onClick={handeToPayment}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Receipt;
