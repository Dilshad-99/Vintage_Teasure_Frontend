import './Login.css';
import { useState, useRef, useEffect } from 'react';
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaDone, setCaptchaDone] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [remember, setRemember] = useState(false);

  const SITE_KEY = process.env.REACT_APP_RECAPTCHA_KEY;

  // Load remembered email
  useEffect(() => {
    let savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please fill all fields", "warning");
      return;
    }

    if (!captchaDone || !captchaToken) {
      showToast("Please complete the captcha verification", "warning");
      return;
    }

    setLoading(true);

    axios.post(__userapiurl + "login", {
      email,
      password,
      captcha: captchaToken
    })
    .then((res) => {
      const user = res.data.userDetails;

      // Save login data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("_id", user._id);
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("mobile", user.mobile);
      localStorage.setItem("address", user.address);
      localStorage.setItem("city", user.city);
      localStorage.setItem("gender", user.gender);
      localStorage.setItem("info", user.info);
      localStorage.setItem("role", user.role);

      // Remember email
      if (remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      notifyAuthChange();
      showToast("Welcome " + user.name + "! 🎉", "success");

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    })
    .catch((err) => {
      let msg = "Login failed";

      if (err.response?.data?.message) {
        msg = err.response.data.message;
      }

      showToast(msg, "error");

      // Reset captcha on error
      setPassword("");
      setCaptchaDone(false);
      setCaptchaToken(null);

      if (captchaRef.current) {
        captchaRef.current.reset();
      }
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="page-section auth-page login-page">

      <div className="auth-header">
        <span className="auth-icon">😊</span>
        <h2>Hey, Login Here!</h2>
        <p className="subtitle">Welcome back — good to see you again.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="form-extras">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <Link to="/ForgetPassword" className="forgot-link">
            Forgot password?
          </Link>
        </div>

        {/* reCAPTCHA */}
        <div className="form-group captcha-group">
          {!SITE_KEY ? (
            <div style={{ 
              padding: '15px', 
              background: '#fff3cd', 
              border: '1px solid #ffc107',
              borderRadius: '8px',
              color: '#856404'
            }}>
              <strong>⚠️ reCAPTCHA Not Configured</strong>
              <p style={{ fontSize: '13px', marginTop: '5px' }}>
                Add REACT_APP_RECAPTCHA_KEY to your .env file
              </p>
            </div>
          ) : (
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={SITE_KEY}
              onChange={(token) => {
                console.log("✅ Captcha verified");
                setCaptchaToken(token);
                setCaptchaDone(true);
              }}
              onExpired={() => {
                console.log("⏰ Captcha expired");
                setCaptchaDone(false);
                setCaptchaToken(null);
              }}
              onErrored={() => {
                console.log("❌ Captcha error");
                showToast("Captcha verification failed", "error");
                setCaptchaDone(false);
                setCaptchaToken(null);
              }}
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading || !captchaDone}
        >
          {loading ? "Logging in..." : "Let Me In 🔒"}
        </button>

        <p className="auth-switch">
          New around here? <Link to="/register">Come join us</Link>
        </p>

      </form>
    </div>
  );
}

export default Login;