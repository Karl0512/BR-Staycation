import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style/receipt.css";
import { parse, format, subHours, addHours } from "date-fns";
import axios from "axios";
import moment from "moment";

const Receipt = ({ paymentId }) => {
  const location = useLocation();
  const { startDate, endDate, time, guests, roomId, price, label } =
    location.state || {};

  const [paymentStatus, setPaymentStatus] = useState("pending");

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(`/api/payment-status/${paymentId}`);
        setPaymentStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    // Poll every 5 seconds
    const interval = setInterval(fetchPaymentStatus, 5000);
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [paymentId]);
  console.log(time);
  console.log(price);
  console.log(paymentStatus, "wala");

  const [selectedPayment, setSelectedPayment] = useState(null);

  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);

  // Function to update the startDate with the selected time
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

  function calculateDaysPassed(startDateObject, endDateObject) {
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endDateObject - startDateObject;

    // Convert milliseconds to days and round down to the nearest whole number
    const daysPassed = Math.floor(
      differenceInMilliseconds / (24 * 60 * 60 * 1000)
    );

    return daysPassed;
  }

  // Only update the startDateObject if time is provided
  const updatedStartDateObject = time
    ? setTimeToDate(new Date(startDateObject), time)
    : new Date(startDateObject);

  function subtractHoursFromTime(timeString, hoursToSubtract) {
    // Parse the time string into a Date object
    const time = parse(timeString, "hh:mm a", new Date());

    // Subtract the specified number of hours
    const newTime = subHours(time, hoursToSubtract);

    // Format the new time back to a string
    const newTimeString = format(newTime, "hh:mm a");
    return newTimeString;
  }

  function addHoursToTime(timeString, hoursToAdd) {
    // Parse the time string into a Date object
    const time = parse(timeString, "hh:mm a", new Date());

    // Add the specified number of hours
    const newTime = addHours(time, hoursToAdd);

    // Format the new time back to a string
    const newTimeString = format(newTime, "hh:mm a");
    return newTimeString;
  }

  let endTime = null;
  console.log(time);
  const days = calculateDaysPassed(startDateObject, endDateObject);
  if (startDateObject.toDateString() === endDateObject.toDateString()) {
    console.log("true");
    endTime = addHoursToTime(time, label);
  } else {
    console.log("false");
    console.log(startDateObject.toDateString());
    console.log(endDateObject.toDateString());
    endTime = subtractHoursFromTime(time, days * 2);
  }

  const handeToPayment = async () => {
    const paymentData = {
      data: {
        attributes: {
          amount: price, // Amount in cents (10000 = 100.00 PHP)
          description: "Booking for Staycation",
          payment_method_allowed: ["gcash"],
          metadata: {
            startDate,
            endDate,
            time,
            guests,
            roomId,
            price,
          },
        },
      },
    };
    console.log(paymentData.data.attributes.metadata);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payment/paymentCreate", // Replace with your API endpoint
        paymentData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );

      console.log("Response:", response.data);
      //const checkOutUrl = response.data.checkout_url;
      //console.log(checkOutUrl);
      window.open(response.data.checkout_url);
    } catch (error) {
      console.error("Error occured: ", error.response?.data || error.message);
    }
  };

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
          <img src="./img/brstaycationLogo.jpg" id="br-logo" />
          <h1>Your Booking Summary</h1>
          <p>
            Check in:{" "}
            {updatedStartDateObject.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {` ${updatedStartDateObject.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </p>
          <p>
            Check out:{" "}
            {endDateObject?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            {endTime}
          </p>
          <p>Guest: {guests}</p>
          <p>For: {label} hrs</p>
          <p>days: {days} days</p>
          <p>startdateObject: {startDate} hrs</p>
          <p>enddateObject: {endDate} hrs</p>
          <p>enddateObject: {guests} </p>
          <p>payment status: {roomId} </p>
          <p>payment status: {time} </p>
          <p>payment status: {price} </p>
          <p>enddateObject: {} hrs</p>

          <button onClick={handeToPayment}>Pay</button>
        </div>
      </div>
    </>
  );
};

export default Receipt;
