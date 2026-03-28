import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../API_URL";

function DonationHistory() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");

  useEffect(() => {
    axios.get(`${BASE_URL}/payment/history`, { params: { email } })
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [email]);

  return (
    <div className="page-section">
      <h2>Donation History 🧾</h2>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>No donations found</p>
      ) : (
        data.map((d, i) => (
          <div key={i}>
            ₹{d.amount} — {new Date(d.createdAt).toLocaleDateString()}
          </div>
        ))
      )}
    </div>
  );
}

export default DonationHistory;