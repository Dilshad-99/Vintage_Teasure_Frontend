import { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [role,  setRole]  = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const name = localStorage.getItem("name") || "User";

  useEffect(() => {
    const sync = () => {
      setRole(localStorage.getItem("role"));
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener('authChange', sync);
    return () => window.removeEventListener('authChange', sync);
  }, []);

  const BrandLogo = ({ to }) => (
    <Link to={to} className="header-brand">
      <span className="brand-icon">♦</span>
      <div className="brand-text">
        <h1>Vintage Treasure</h1>
        <span className="brand-tagline">Where Every Item Tells a Story</span>
      </div>
    </Link>
  );

  if (token && role === "admin") return (
    <header className="header">
      <div className="header-inner">
        <BrandLogo to="/admin" />
        <div className="header-right">
          <p className="header-welcome">👑 Welcome, Admin</p>
        </div>
      </div>
    </header>
  );

  if (token && role === "user") return (
    <header className="header">
      <div className="header-inner">
        <BrandLogo to="/user" />
        <div className="header-right">
          <p className="header-welcome">👋 Welcome, {name}</p>
        </div>
      </div>
    </header>
  );

  return (
    <header className="header">
      <div className="header-inner">
        <BrandLogo to="/" />
        <div className="header-right">
          <div className="header-contact">
            <span>📞 Talk to us: (555) 123-4567</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;