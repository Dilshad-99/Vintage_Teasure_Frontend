import { useNavigate } from "react-router-dom";

function Success() {

  const navigate = useNavigate();

  return (
    <div className="page-section" style={{ textAlign: "center" }}>

      <h1 style={{ color: "green" }}>🎉 Payment Successful</h1>
      <p>Thank you for your support ❤️</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/charity")} style={{ marginLeft: "10px" }}>
          Donate Again
        </button>
      </div>

    </div>
  );
}

export default Success;