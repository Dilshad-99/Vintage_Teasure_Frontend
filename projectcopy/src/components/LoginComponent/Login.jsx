import './Login.css';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { __userapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';
import { notifyAuthChange } from '../../utils/authEvents';

function Login() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const captchaRef = useRef(null);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  // 🔑 ENV KEY (NO FALLBACK)
  const SITE_KEY = process.env.REACT_APP_RECAPTCHA_KEY;

  // Debug (optional)
  // console.log("RECAPTCHA KEY:", SITE_KEY);

  // ✏️ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📧 Email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return showToast('All fields are required.', 'warning');
    }

    if (!isValidEmail(form.email)) {
      return showToast('Invalid email format.', 'warning');
    }

    if (!captchaToken) {
      return showToast('Please complete captcha.', 'warning');
    }

    setLoading(true);

    try {
      const res = await axios.post(
        __userapiurl + "login",
        {
          email: form.email,
          password: form.password,
          captcha: captchaToken
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      const { token, userDetails } = res.data;

      // 💾 Store minimal data
      localStorage.setItem('token', token);
      localStorage.setItem('role', userDetails.role);
      localStorage.setItem('name', userDetails.name);

      notifyAuthChange();

      showToast(`Welcome, ${userDetails.name}!`, 'success');

      navigate(userDetails.role === 'admin' ? '/admin' : '/user');

    } catch (err) {
      showToast(
        err?.response?.data?.message || 'Login failed',
        'error'
      );

      setForm({ email: '', password: '' });

      if (captchaRef.current) {
        captchaRef.current.reset();
      }

      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-section auth-page login-page">
      <div className="auth-header">
        <span className="auth-icon">😊</span>
        <h2>Login</h2>
        <p className="subtitle">Welcome back</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>

        {/* 📧 Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        {/* 🔒 Password */}
        <div className="form-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPass ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPass(prev => !prev)}
            >
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {/* 🤖 CAPTCHA */}
        <div className="form-group">
          {!SITE_KEY && (
            <p style={{ color: 'red' }}>
              ❌ RECAPTCHA KEY missing in .env
            </p>
          )}

          <ReCAPTCHA
            ref={captchaRef}
            sitekey={SITE_KEY}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />
        </div>

        {/* 🔘 Submit */}
        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
        >
          {loading ? 'Please wait...' : 'Login'}
        </button>

        {/* 🔗 Links */}
        <div className="form-extras">
          <Link to="/ForgetPassword">Forgot password?</Link>
          <p>
            New user? <Link to="/register">Register</Link>
          </p>
        </div>

      </form>
    </div>
  );
}

export default Login;