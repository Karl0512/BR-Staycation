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
              padding: "20px",
              overflowY: "scroll",
            }}
          >
            <h2>Terms and Conditions</h2>
            <p>
              By accessing and using this website or service, you agree to
              comply with and be bound by the following terms and conditions.
              These terms apply to all users of this site, including, without
              limitation, users who are browsers, vendors, customers, merchants,
              and/or contributors of content. Please read these terms and
              conditions carefully before using our service.
            </p>
            <p>
              1. **Privacy and Data Security**: We value your privacy. All
              personal data collected from you will be securely stored and
              protected using industry-standard encryption methods. We will not
              share your personal information with any third party without your
              explicit consent. By using our service, you acknowledge that your
              personal data may be collected, stored, and processed in
              accordance with our Privacy Policy.
            </p>
            <p>
              2. **Payment and Billing**: All payments are processed through
              secure, third-party payment gateways. You agree to provide
              accurate and complete payment information. Failure to do so may
              result in delayed or failed transactions. If any payment is
              declined, we reserve the right to cancel your booking or access to
              our service.
            </p>
            <p>
              3. **Bookings and Cancellations**: Upon booking, a reservation fee
              or deposit may be required. Cancellations may be subject to
              penalties or non-refundable fees. Please refer to our Booking
              Policy for more details on how cancellations are handled.
            </p>
            <p>
              4. **Service Availability**: While we strive to provide
              uninterrupted service, we cannot guarantee that the website or
              service will be available at all times. We reserve the right to
              modify, suspend, or discontinue any part of the service at any
              time without prior notice.
            </p>
            <p>
              5. **Intellectual Property**: All content on this site, including
              but not limited to text, images, graphics, and software, is
              protected by copyright, trademark, and other intellectual property
              laws. You may not copy, reproduce, or distribute any content from
              this website without permission.
            </p>
            <p>
              6. **Limitation of Liability**: We are not liable for any damages,
              losses, or other costs arising from your use of this website or
              service. This includes, but is not limited to, indirect or
              consequential damages.
            </p>
            <p>
              7. **Modifications to Terms**: We reserve the right to update or
              modify these terms at any time. Any changes will be effective
              immediately upon posting the updated terms. Your continued use of
              the service after such changes signifies your acceptance of the
              updated terms.
            </p>
            <p>
              By accepting these Terms and Conditions, you acknowledge that you
              have read, understood, and agreed to abide by all the terms set
              forth above.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                marginTop: "20px",
              }}
            >
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
