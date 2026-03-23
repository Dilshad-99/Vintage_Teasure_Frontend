import { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Auth from '../AuthComponent/Auth';

function Header() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const interval = setInterval(() => {
      setRole(localStorage.getItem("role"));
      setToken(localStorage.getItem("token"));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const BrandLogo = ({ to }) => (
    <Link to={to} className="header-brand">
      <span className="brand-icon">♦</span>
      <div className="brand-text">
        <h1>Vintage Teasure</h1>
        <span className="brand-tagline">Where Every Item Tells a Story</span>
      </div>
    </Link>
  );

  if (token && role === "admin") {
    return (
      <>
        <Auth />
        <header className="header">
          <div className="header-inner">
            <BrandLogo to="/admin" />
            <div className="header-right">
              <p className="header-welcome">👑 Welcome, Admin</p>
            </div>
          </div>
        </header>
      </>
    );
  }

  if (token && role === "user") {
    return (
      <>
        <Auth />
        <header className="header">
          <div className="header-inner">
            <BrandLogo to="/user" />
            <div className="header-right">
              <p className="header-welcome">👋 Welcome, {localStorage.getItem("name") || "User"}</p>
            </div>
          </div>
        </header>
      </>
    );
  }

  return (
    <>
      <Auth />
      <header className="header">
        <div className="header-inner">
          <BrandLogo to="/" />
          <div className="header-right">
            <div className="header-search">
              <input type="text" placeholder="What are you looking for?" />
              <button className="search-btn" aria-label="Search">
                🔍
              </button>
            </div>
            <div className="header-contact">
              <span>📞 Talk to us: (555) 123-4567</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;