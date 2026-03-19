import './Login.css';
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { __userapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

function makeCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b, answer : a + b };
}

function Login() {

  const { showToast } = useToast();
  const navigate = useNavigate();

  const [ email, setEmail ]           = useState('');
  const [ password, setPassword ]     = useState('');
  const [ showPass, setShowPass ]     = useState(false);
  const [ loading, setLoading ]       = useState(false);
  const [ captcha, setCaptcha ]       = useState(makeCaptcha());
  const [ captchaVal, setCaptchaVal ] = useState('');
  const [ captchaErr, setCaptchaErr ] = useState(false);

  const resetCaptcha = useCallback(() => {
    setCaptcha(makeCaptcha());
    setCaptchaVal('');
    setCaptchaErr(false);
  }, []);

  useEffect(() => {
    const t = setTimeout(resetCaptcha, 60000);
    return () => clearTimeout(t);
  }, [captcha, resetCaptcha]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast('Please fill in all fields.', 'warning');
      return;
    }

    if (parseInt(captchaVal, 10) !== captcha.answer) {
      setCaptchaErr(true);
      showToast('Wrong captcha, try again.', 'error');
      resetCaptcha();
      return;
    }

    setLoading(true);

    axios.post(__userapiurl + "login", { email, password })
      .then((response) => {
        const user = response.data.userDetails;
        localStorage.setItem('token',   response.data.token);
        localStorage.setItem('_id',     user._id);
        localStorage.setItem('name',    user.name);
        localStorage.setItem('email',   user.email);
        localStorage.setItem('mobile',  user.mobile);
        localStorage.setItem('address', user.address);
        localStorage.setItem('city',    user.city);
        localStorage.setItem('gender',  user.gender);
        localStorage.setItem('info',    user.info);
        localStorage.setItem('role',    user.role);
        showToast(`Welcome back, ${user.name}! 👋`, 'success');
        navigate(user.role === 'admin' ? '/admin' : '/user');
      })
      .catch((error) => {
        console.log(error);
        showToast('Invalid credentials or account not verified.', 'error');
        setEmail('');
        setPassword('');
        resetCaptcha();
      })
      .finally(() => setLoading(false));
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
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button type="button" className="password-toggle" onClick={() => setShowPass(p => !p)}>
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className="form-extras">
          <label className="remember-me"><input type="checkbox" /> Remember me</label>
          <Link to="/ForgetPassword" className="forgot-link">Forgot password?</Link>
        </div>

        <div className="form-group captcha-group">
          <label>Verify you're human</label>
          <div className="captcha-box">
            <span className="captcha-question">{captcha.a} + {captcha.b} = ?</span>
            <button type="button" className="captcha-refresh" onClick={resetCaptcha}>🔄</button>
          </div>
          <input
            type="number"
            value={captchaVal}
            onChange={e => { setCaptchaVal(e.target.value); setCaptchaErr(false); }}
            placeholder="Enter the answer"
            className={captchaErr ? 'captcha-input error' : 'captcha-input'}
          />
          {captchaErr && <p className="captcha-error-msg">❌ Wrong answer, new question generated.</p>}
        </div>

        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Let Me In 🔒'}
        </button>

        <p className="auth-switch">New around here? <Link to="/register">Come join us</Link></p>

      </form>
    </div>
  );
}

export default Login;