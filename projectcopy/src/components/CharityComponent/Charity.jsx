import { useState, useEffect } from 'react';
import axios from 'axios';
import './Charity.css';
import { __paymentapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

function Charity() {
  const { showToast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount,   setCustomAmount]   = useState("");
  const [loading,        setLoading]        = useState(false);

  const amounts = [100, 200, 500, 1000];

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePresetAmount = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleCustomAmount = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    setSelectedAmount(Number(val) || 0);
  };

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const payNow = async () => {
    if (!finalAmount || finalAmount <= 0) {
      showToast("Please select or enter an amount!", "warning");
      return;
    }

    if (finalAmount < 1) {
      showToast("Minimum donation amount is ₹1.", "warning");
      return;
    }

    const name  = localStorage.getItem('name')  || 'Anonymous';
    const email = localStorage.getItem('email');

    if (!email) {
      showToast("Please login before making a payment.", "warning");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(__paymentapiurl, {
        amount: finalAmount,
        name,
        email,
      });

      const rzp = new window.Razorpay({
        key:         data.key_id,
        amount:      data.order.amount,
        currency:    "INR",
        name:        "Vintage Treasure",
        description: "Support / Donation 🤝",
        order_id:    data.order.id,
        prefill:     { name, email },
        theme:       { color: "#8B4513" },

        handler: async (response) => {
          // ✅ Verify payment on backend
          try {
            await axios.post('http://localhost:3001/payment/verifyPayment', {
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
            });
            showToast("Payment Successful! 🎉 Thank you for your donation!", "success");
          } catch (err) {
            showToast("Payment done but verification failed.", "warning");
          }
          setSelectedAmount(0);
          setCustomAmount("");
          setLoading(false);
        },

        modal: {
          ondismiss: () => {
            showToast("Payment cancelled.", "warning");
            setLoading(false);
          }
        }
      });

      rzp.open();

    } catch (err) {
      showToast(err.response?.data?.error || "Payment failed. Try again.", "error");
      setLoading(false);
    }
  };

  return (
    <div className="donation-container">
      <div className="donation-card">
        <span className="donation-icon">🤝</span>
        <h1>Support / Donation</h1>
        <p>Your contribution helps us serve the community better.</p>

        <div className="amount-boxes">
          {amounts.map((amt) => (
            <div
              key={amt}
              className={`amt-box ${selectedAmount === amt && !customAmount ? 'selected' : ''}`}
              onClick={() => handlePresetAmount(amt)}
            >
              ₹{amt}
            </div>
          ))}
        </div>

        <div className="custom-amount-wrapper">
          <label className="custom-amount-label">Or enter custom amount:</label>
          <div className="custom-amount-input-wrapper">
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              className="custom-amount-input"
              placeholder="Enter amount"
              value={customAmount}
              onChange={handleCustomAmount}
              min="1"
            />
          </div>
        </div>

        {finalAmount > 0 && (
          <p className="selected-amount">
            You are donating: <span>₹{finalAmount}</span>
          </p>
        )}

        <button
          onClick={payNow}
          className="donate-btn"
          disabled={loading || finalAmount <= 0}
        >
          {loading ? 'Processing...' : `Donate ₹${finalAmount || 0} 💛`}
        </button>
      </div>
    </div>
  );
}

export default Charity;