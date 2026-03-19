import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { __userapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

function Verifyuser() {
  const params = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    axios.get(__userapiurl + "fetch", {
      params: { "email": params.email }
    })
      .then((result) => {
        const user = result.data.userDetails[0];

        if (user.__v === 0) {
          // not yet verified — activate account
          axios.patch(__userapiurl + "update", {
            "condition_obj": { "email": params.email },
            "content_obj": { "status": 1, "__v": 1 }
          })
            .then(() => {
              showToast("Email verified successfully! Please login. ✅", "success");
              navigate("/login");
            })
            .catch(() => {
              showToast("Verification failed. Please try again.", "error");
              navigate("/login");
            });
        } else {
          // already verified
          showToast("Account already verified. Please login.", "info");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
        showToast("Invalid verification link.", "error");
        navigate("/login");
      });
  }, [params.email, navigate, showToast]);

  return (
    <div className="page-section" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <span style={{ fontSize: '48px' }}>⏳</span>
      <p style={{ color: 'var(--text-muted)', marginTop: '16px', fontSize: '15px' }}>
        Verifying your account...
      </p>
    </div>
  );
}

export default Verifyuser;