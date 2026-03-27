import './Nav.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Settings from '../SettingsComponent/Settings';
import { useTheme } from '../../ThemeContext';
import { useToast } from '../../ToastContext';

const linkClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

function Nav() {
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const [role, setRole] = useState(localStorage.getItem('role'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      setRole(localStorage.getItem('role'));
      setToken(localStorage.getItem('token'));
      setMenuOpen(false);
    };
    window.addEventListener('authChange', sync);
    return () => window.removeEventListener('authChange', sync);
  }, []);

  // ✅ Payment success toast
  useEffect(() => {
    const success = localStorage.getItem("paymentSuccess");
    if (success === "true") {
      showToast("Donation Successful 🎉", "success");
      localStorage.removeItem("paymentSuccess");
    }
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const ThemeBtn = () => (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );

  const Hamburger = () => (
    <button
      className={`hamburger ${menuOpen ? 'open' : ''}`}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span /><span /><span />
    </button>
  );

  // 🔥 dynamic links
  let links = [];

  if (token && role === "admin") {
    links = [
      { to: "/admin", label: "Admin Home" },
      { to: "/manageUser", label: "Manage Users" },
      { to: "/addcategory", label: "Add Category" },
      { to: "/addsubcategory", label: "Add SubCategory" },
      { to: "/viewcategory", label: "View Products" },
      { to: "/donationhistory", label: "Donations 🧾" }
    ];
  } else if (token && role === "user") {
    links = [
      { to: "/user", label: "User Home" },
      { to: "/viewcategory", label: "View Category" },
      { to: "/addproduct", label: "Add Product" }
    ];
  } else {
    links = [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/service", label: "Services" },
      { to: "/contact", label: "Contact" }
    ];
  }

  return (
    <nav className="nav">
      <div className="nav-inner">

        <Hamburger />

        <ul className={`nav-list ${menuOpen ? 'nav-open' : ''}`}>
          {links.map((l, i) => (
            <li key={i}>
              <NavLink to={l.to} className={linkClass} onClick={closeMenu}>
                {l.label}
              </NavLink>
            </li>
          ))}
          {token && <Settings onClose={closeMenu} />}
        </ul>

        <div className="nav-auth">
          <ThemeBtn />

          {!token && (
            <>
              <NavLink to="/login" className="nav-auth-btn">Login</NavLink>
              <NavLink to="/register" className="nav-auth-btn">Register</NavLink>
            </>
          )}

          {token && role === "user" && (
            <NavLink to="/charity" className="nav-auth-link">Charity</NavLink>
          )}

          {token && (
            <NavLink to="/logout" className="nav-auth-link">Logout</NavLink>
          )}

          {!token && (
            <NavLink to="/aiclient" className="nav-auth-btn">Chat Bot</NavLink>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Nav;