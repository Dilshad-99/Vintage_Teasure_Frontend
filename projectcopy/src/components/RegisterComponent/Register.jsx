import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import axios from 'axios';
import { __userapiurl } from '../../API_URL.js';
import { useToast } from '../../ToastContext';

function Register() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setMobile("");
    setAddress("");
    setCity("");
    setGender("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !mobile || !city || !gender) {
      showToast("Please fill in all fields.", "warning");
      return;
    }

    setLoading(true);

    const userDetails = { name, email, password, mobile, address, city, gender };

    axios.post(__userapiurl + "save", userDetails)
      .then(() => {
        showToast("Registered successfully! Please verify your email. 🎉", "success");
        clearForm();
      })
      .catch(() => {
        showToast("Registration failed. Email may already be in use.", "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="page-section auth-page register-page">
      <div className="auth-header">
        <span className="auth-icon">👋</span>
        <h2>Register Here!</h2>
        <p className="subtitle">Create your account and join the family.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>

        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              onChange={e => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="form-row two-col">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Create a password"
            />
          </div>
        </div>

        <div className="form-row two-col">
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="tel"
              onChange={e => setMobile(e.target.value)}
              value={mobile}
              placeholder="Enter your mobile number"
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <select onChange={e => setCity(e.target.value)} value={city}>
              <option value="">Select City</option>
              <option value="Indore">Indore</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Ujjain">Ujjain</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Address</label>
            <textarea
              onChange={e => setAddress(e.target.value)}
              value={address}
              placeholder="Enter your address"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <div className="gender-group">
              <label className="gender-option">
                <input
                  type="radio"
                  name="gender"
                  onChange={e => setGender(e.target.value)}
                  value="male"
                  checked={gender === "male"}
                />
                Male
              </label>
              <label className="gender-option">
                <input
                  type="radio"
                  name="gender"
                  onChange={e => setGender(e.target.value)}
                  value="female"
                  checked={gender === "female"}
                />
                Female
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
        >
          {loading ? 'Registering...' : "Let's Go! 🎉"}
        </button>

        <p className="auth-switch">
          Already part of the family? <Link to="/login">Welcome back</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;