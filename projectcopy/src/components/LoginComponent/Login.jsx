import './Login.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { __userapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';
import { notifyAuthChange } from '../../utils/authEvents';

function Login() {
  const { showToast } = useToast();
  const navigate   = useNavigate();
  const captchaRef = useRef(null);

  const [email,        setEmail]        = useState("");
  const [password,     setPassword]     = useState("");
  const [showPass,     setShowPass]     = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [remember,     setRemember]     = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please fill all fields", "warning"); return;
    }
    if (!captchaToken) {
      showToast("Please complete the captcha", "warning"); return;
    }

    setLoading(true);

    try {
      const res  = await axios.post(__userapiurl + "login", { email, password, captcha: captchaToken });
      const user = res.data.userDetails;

      localStorage.setItem("token",   res.data.token);
      localStorage.setItem("_id",     user._id);
      localStorage.setItem("name",    user.name);
      localStorage.setItem("email",   user.email);
      localStorage.setItem("mobile",  user.mobile);
      localStorage.setItem("address", user.address);
      localStorage.setItem("city",    user.city);
      localStorage.setItem("gender",  user.gender);
      localStorage.setItem("info",    user.info || "");
      localStorage.setItem("role",    user.role);

      if (remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      notifyAuthChange();
      showToast(`Welcome ${user.name}!`, "success");

      if (user.role === "admin") navigate("/admin");
      else navigate("/user");

    } catch (err) {
      showToast(err.response?.data?.message || "Login failed", "error");
      setPassword("");
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-section auth-page login-page">
      <div className="auth-header">
        <span className="auth-icon">😊</span>
        <h2>Hey, Login Here!</h2>
        <p className="subtitle">Welcome back — good to see you again.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button type="button" className="password-toggle" onClick={() => setShowPass(!showPass)}>
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div className="form-extras">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <Link to="/ForgetPassword" className="forgot-link">Forgot password?</Link>
        </div>

        <div className="form-group">
          <HCaptcha
            ref={captchaRef}
            sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY}
            onVerify={token => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-full" disabled={loading || !captchaToken}>
          {loading ? "Logging in..." : "Let Me In"}
        </button>

        <p className="auth-switch">
          New around here? <Link to="/register">Come join us</Link>
        </p>

      </form>
    </div>
  );
}

export default Login;