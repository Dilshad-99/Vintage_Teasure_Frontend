import { useState, useEffect } from "react";
import axios from "axios";
import "./Charity.css";
import { useToast } from "../../ToastContext";
import { useNavigate } from "react-router-dom";

function Charity() {

  const { showToast } = useToast();
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(false);
  const [loading, setLoading] = useState(false);

  const preset = [100, 200, 500, 1000];

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const finalAmount = custom ? Number(custom) : amount;

  const payNow = async () => {

    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");

    if (!finalAmount) {
      showToast("Enter amount", "warning");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3001/payment/processPayment",
        { amount: finalAmount, name, email, monthly }
      );

      const data = res.data;

      const rzp = new window.Razorpay({
        key: data.key_id,
        amount: data.order.amount,
        currency: "INR",
        order_id: data.order.id,
        name: "Donation",
        description: "Support ❤️",

        handler: async (response) => {
          await axios.post(
            "http://localhost:3001/payment/verifyPayment",
            response
          );

          showToast("Payment Successful 🎉", "success");
          navigate("/success");
        },

        modal: {
          ondismiss: () => {
            showToast("Payment cancelled", "warning");
          }
        }
      });

      rzp.open();

    } catch {
      showToast("Payment failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation-container">

      <div className="donation-card">

        <span className="donation-icon">🤝</span>
        <h1>Support / Donation</h1>
        <p>Your help matters ❤️</p>

        {/* preset */}
        <div className="amount-boxes">
          {preset.map(a => (
            <div
              key={a}
              className={`amt-box ${amount === a && !custom ? "selected" : ""}`}
              onClick={() => {
                setAmount(a);
                setCustom("");
              }}
            >
              ₹{a}
            </div>
          ))}
        </div>

        {/* custom */}
        <div className="custom-amount-wrapper">
          <label className="custom-amount-label">Custom Amount</label>
          <div className="custom-amount-input-wrapper">
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              className="custom-amount-input"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value);
                setAmount(Number(e.target.value));
              }}
            />
          </div>
        </div>

        {/* recurring */}
        <label>
          <input
            type="checkbox"
            checked={monthly}
            onChange={() => setMonthly(!monthly)}
          />
          Monthly Donation 🔁
        </label>

        {/* UPI QR */}
        <div>
          <h3>UPI Payment</h3>
          <img src="/assets/upi-qr.png" width="200" alt="QR" />
        </div>

        <button
          className="donate-btn"
          onClick={payNow}
          disabled={loading}
        >
          {loading ? "Processing..." : `Donate ₹${finalAmount || 0}`}
        </button>

      </div>
    </div>
  );
}

export default Charity;