import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { __userapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

function Verifyuser() {
  const params   = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    // Call the dedicated verify route on backend
    axios.get(__userapiurl + "verify/" + params.email)
      .then((result) => {
        if (result.data.status === true) {
          if (result.data.message === "Already verified") {
            showToast("Account already verified. Please login. ✅", "info");
          } else {
            showToast("Email verified successfully! You can now login. 🎉", "success");
          }
        } else {
          showToast("Verification failed. Please try again.", "error");
        }
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        showToast("Invalid or expired verification link.", "error");
        navigate("/login");
      });
  }, [params.email, navigate, showToast]);

  return (
    <div className="page-section" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <span style={{ fontSize: '48px' }}>⏳</span>
      <h3 style={{ marginTop: '16px' }}>Verifying your account...</h3>
      <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '15px' }}>
        Please wait, do not close this page.
      </p>
    </div>
  );
}

export default Verifyuser;