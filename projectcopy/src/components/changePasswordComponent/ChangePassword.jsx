import './ChangePassword.css';
import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../API_URL';
import { Link } from 'react-router-dom';
import { useToast } from '../../ToastContext';

function ChangePassword() {
  const { showToast } = useToast();
  const [oldPassword,     setOldPassword]     = useState('');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading,         setLoading]         = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !confirmPassword) {
      showToast("Please fill in all fields.", "warning");
      return;
    }

    if (password !== confirmPassword) {
      showToast("New passwords do not match!", "warning");
      return;
    }

    if (password.length < 6) {
      showToast("New password must be at least 6 characters.", "warning");
      return;
    }

    if (password === oldPassword) {
      showToast("New password cannot be same as old password.", "warning");
      return;
    }

    setLoading(true);

    const email = localStorage.getItem("email");

    // ✅ Single dedicated API call — bcrypt handled on backend
    axios.post(__userapiurl + "changepassword", {
      email,
      oldPassword,
      newPassword: password
    })
      .then((response) => {
        if (response.data.status === true) {
          showToast("Password changed successfully! 🔒", "success");
          setOldPassword('');
          setPassword('');
          setConfirmPassword('');
        }
      })
      .catch((error) => {
        const msg = error.response?.data?.message || "Error updating password.";
        showToast(msg, "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="page-section auth-page change-password-page">
      <div className="auth-header">
        <span className="auth-icon">🔐</span>
        <h2>Change Password</h2>
        <p className="subtitle">Update your account password securely.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            placeholder="Enter your current password"
            onChange={e => setOldPassword(e.target.value)}
            value={oldPassword}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password (min 6 chars)"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Change Password 🔒'}
        </button>

        <p className="auth-switch">
          <Link to={localStorage.getItem("role") === "admin" ? "/admin" : "/user"}>
            ← Back to Dashboard
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ChangePassword;