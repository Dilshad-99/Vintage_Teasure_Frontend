import { useEffect, useState } from "react";
import axios from "axios";

function DonationHistory() {

  const [data, setData] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    axios.get("http://localhost:3001/payment/history", {
      params: { email }
    })
    .then(res => setData(res.data))
    .catch(() => alert("Error loading history"));
  }, []);

  return (
    <div className="page-section">

      <h2>Donation History 🧾</h2>

      {data.length === 0 ? (
        <p>No donations found</p>
      ) : (
        data.map((d, i) => (
          <div key={i}>
            ₹{d.amount} - {new Date(d.createdAt).toLocaleDateString()}
          </div>
        ))
      )}

    </div>
  );
}

export default DonationHistory;