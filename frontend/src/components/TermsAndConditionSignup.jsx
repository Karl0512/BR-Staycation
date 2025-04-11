import { useState } from "react";

export default function TermsAndConditionSignup({ setTerms }) {
  const [toggleTerms, setToggleTerms] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <>
      <div className="terms-condition">
        <input
          type="checkbox"
          name="terms"
          id="terms"
          checked={isAccepted}
          onChange={(e) => {
            setIsAccepted(e.target.checked);
            setTerms(e.target.checked); // Pass the value back to the parent component
          }}
        />
        <label htmlFor="terms" onClick={() => setToggleTerms(true)}>
          Terms and Condition
        </label>
      </div>

      {toggleTerms && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            position: "fixed",
            background: "rgba(0, 0, 0, 0.5)",
            top: "0",
            left: "0",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "80%",
              height: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Terms and Condition</h2>
            <p>Blah blah blah</p>
            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              <button
                onClick={() => {
                  setIsAccepted(true);
                  setTerms(true); // Notify parent component
                  setToggleTerms(false); // Close modal after accepting
                }}
              >
                Accept
              </button>
              <button onClick={() => setToggleTerms(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
