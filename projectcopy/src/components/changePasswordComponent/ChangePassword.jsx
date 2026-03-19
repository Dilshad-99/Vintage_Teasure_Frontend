import './ChangePassword.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../API_URL';
import { Link } from 'react-router-dom';
import { useToast } from '../../ToastContext';

function ChangePassword() {
  const { showToast } = useToast();
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    axios.get(__userapiurl + "fetch", {
      params: { "email": storedEmail }
    })
      .then((response) => {
        const user = response.data.info || response.data.userDetails || response.data[0];
        if (user) {
          setUserEmail(user.email);
        }
      })
      .catch((error) => {
        console.error(error);
        showToast("Error fetching user data.", "error");
      });
  }, [showToast]);

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

    setLoading(true);

    axios.post(__userapiurl + "login", { email: userEmail, password: oldPassword })
      .then(() => {
        const data = {
          "condition_obj": { "email": userEmail },
          "content_obj": { "password": password }
        };

        axios.patch(__userapiurl + "update", data)
          .then((response) => {
            if (response.data.status === "OK") {
              showToast("Password changed successfully!", "success");
              setOldPassword('');
              setPassword('');
              setConfirmPassword('');
            }
          })
          .catch((error) => {
            console.error(error);
            showToast("Error updating password. Please try again.", "error");
          })
          .finally(() => setLoading(false));
      })
      .catch(() => {
        showToast("Current password is incorrect!", "error");
        setLoading(false);
      });
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
            placeholder="Enter new password"
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