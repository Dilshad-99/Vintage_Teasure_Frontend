import './ForgetPassword.css';
import { useState } from 'react';
import axios from 'axios';
import { __userapiurl, __forgetpasswordurl } from '../../API_URL';
import { Link } from 'react-router-dom';
import { useToast } from '../../ToastContext';

function ForgetPassword() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
const handleSubmit = (e) => {
  e.preventDefault();

  if (!email) {
    showToast("Please enter your email address.", "warning");
    return;
  }

  setLoading(true);

  axios.post(__forgetpasswordurl, { email })
    .then(() => {
      showToast("Reset link sent! 📧", "success");
      setEmail('');
    })
    .catch((err) => {
      showToast("Error sending reset email", "error");
    })
    .finally(() => setLoading(false));
};

  return (
    <div className="page-section auth-page forget-password-page">
      <div className="auth-header">
        <span className="auth-icon">🔒</span>
        <h2>Forgot Password?</h2>
        <p className="subtitle">Enter your registered email to get a reset link.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email address"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link 📧'}
        </button>

        <p className="auth-switch">
          Remember your password? <Link to="/login">Back to Login</Link>
        </p>
      </form>
    </div>
  );
}

export default ForgetPassword;