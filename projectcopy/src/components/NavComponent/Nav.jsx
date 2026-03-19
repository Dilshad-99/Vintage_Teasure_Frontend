import './Nav.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Settings from '../SettingsComponent/Settings';
import { useTheme } from '../../ThemeContext';

const linkClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

function Nav() {

  const { theme, toggleTheme } = useTheme();
  const [ role, setRole ]   = useState(localStorage.getItem('role'));
  const [ token, setToken ] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const t = setInterval(() => {
      setRole(localStorage.getItem('role'));
      setToken(localStorage.getItem('token'));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const ThemeBtn = () => (
    <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );

  if (token && role === 'admin') return (
    <nav className="nav"><div className="nav-inner">
      <ul className="nav-list">
        <li><NavLink to="/admin"        end className={linkClass}>Admin Home</NavLink></li>
        <li><NavLink to="/manageUser"       className={linkClass}>Manage Users</NavLink></li>
        <li><NavLink to="/addcategory"      className={linkClass}>Add Category</NavLink></li>
        <li><NavLink to="/addsubcategory"   className={linkClass}>Add SubCategory</NavLink></li>
        <li><NavLink to="/viewcategory"     className={linkClass}>View Products</NavLink></li>
        <Settings />
      </ul>
      <div className="nav-auth">
        <ThemeBtn />
        <NavLink to="/logout" className="nav-auth-link">Logout</NavLink>
      </div>
    </div></nav>
  );

  if (token && role === 'user') return (
    <nav className="nav"><div className="nav-inner">
      <ul className="nav-list">
        <li><NavLink to="/user"        end className={linkClass}>User Home</NavLink></li>
        <li><NavLink to="/viewcategory" end className={linkClass}>View Category</NavLink></li>
        <li><NavLink to="/addproduct"      className={linkClass}>Add Product</NavLink></li>
        <Settings />
      </ul>
      <div className="nav-auth">
        <ThemeBtn />
        <NavLink to="/charity" className="nav-auth-link">Charity</NavLink>
        <NavLink to="/logout"  className="nav-auth-link">Logout</NavLink>
      </div>
    </div></nav>
  );

  return (
    <nav className="nav"><div className="nav-inner">
      <ul className="nav-list">
        <li><NavLink to="/"      end className={linkClass}>Home</NavLink></li>
        <li><NavLink to="/about"     className={linkClass}>About</NavLink></li>
        <li><NavLink to="/service"   className={linkClass}>Services</NavLink></li>
        <li><NavLink to="/contact"   className={linkClass}>Contact</NavLink></li>
      </ul>
      <div className="nav-auth">
        <ThemeBtn />
        <NavLink to="/login"    className="nav-auth-btn">Login</NavLink>
        <NavLink to="/register" className="nav-auth-btn">Register</NavLink>
        <NavLink to="/aiclient" className="nav-auth-btn">Chat Bot</NavLink>
      </div>
    </div></nav>
  );
}

export default Nav;