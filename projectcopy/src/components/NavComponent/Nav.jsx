import './Nav.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Settings from '../SettingsComponent/Settings';
import { useTheme } from '../../ThemeContext';

const linkClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [role,     setRole]     = useState(localStorage.getItem('role'));
  const [token,    setToken]    = useState(localStorage.getItem('token'));
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

  // Escape key close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const ThemeBtn = () => (
    <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );

  const Hamburger = () => (
    <button
      className={`hamburger ${menuOpen ? 'open' : ''}`}
      onClick={() => setMenuOpen(p => !p)}
      aria-label="Toggle menu"
    >
      <span /><span /><span />
    </button>
  );

  if (token && role === 'admin') return (
    <nav className="nav">
      <div className="nav-inner">
        <Hamburger />
        <ul className={`nav-list ${menuOpen ? 'nav-open' : ''}`}>
          <li><NavLink to="/admin"          end className={linkClass} onClick={closeMenu}>Admin Home</NavLink></li>
          <li><NavLink to="/manageUser"         className={linkClass} onClick={closeMenu}>Manage Users</NavLink></li>
          <li><NavLink to="/addcategory"        className={linkClass} onClick={closeMenu}>Add Category</NavLink></li>
          <li><NavLink to="/addsubcategory"     className={linkClass} onClick={closeMenu}>Add SubCategory</NavLink></li>
          <li><NavLink to="/viewcategory"       className={linkClass} onClick={closeMenu}>View Products</NavLink></li>
          <Settings onClose={closeMenu} />
        </ul>
        <div className="nav-auth">
          <ThemeBtn />
          <NavLink to="/logout" className="nav-auth-link" onClick={closeMenu}>Logout</NavLink>
        </div>
      </div>
    </nav>
  );

  if (token && role === 'user') return (
    <nav className="nav">
      <div className="nav-inner">
        <Hamburger />
        <ul className={`nav-list ${menuOpen ? 'nav-open' : ''}`}>
          <li><NavLink to="/user"         end className={linkClass} onClick={closeMenu}>User Home</NavLink></li>
          <li><NavLink to="/viewcategory" end className={linkClass} onClick={closeMenu}>View Category</NavLink></li>
          <li><NavLink to="/addproduct"      className={linkClass} onClick={closeMenu}>Add Product</NavLink></li>
          <Settings onClose={closeMenu} />
        </ul>
        <div className="nav-auth">
          <ThemeBtn />
          <NavLink to="/charity" className="nav-auth-link" onClick={closeMenu}>Charity</NavLink>
          <NavLink to="/logout"  className="nav-auth-link" onClick={closeMenu}>Logout</NavLink>
        </div>
      </div>
    </nav>
  );

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Hamburger />
        <ul className={`nav-list ${menuOpen ? 'nav-open' : ''}`}>
          <li><NavLink to="/"        end className={linkClass} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/about"      className={linkClass} onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/service"    className={linkClass} onClick={closeMenu}>Services</NavLink></li>
          <li><NavLink to="/contact"    className={linkClass} onClick={closeMenu}>Contact</NavLink></li>
        </ul>
        <div className="nav-auth">
          <ThemeBtn />
          <NavLink to="/login"    className="nav-auth-btn" onClick={closeMenu}>Login</NavLink>
          <NavLink to="/register" className="nav-auth-btn" onClick={closeMenu}>Register</NavLink>
          <NavLink to="/aiclient" className="nav-auth-btn" onClick={closeMenu}>Chat Bot</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Nav;