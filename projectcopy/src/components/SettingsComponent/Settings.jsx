import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Settings.css';

function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
  const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
  document.addEventListener('keydown', onKey);
  return () => document.removeEventListener('keydown', onKey);
}, []);

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // close when route changes
  const handleItemClick = () => setIsOpen(false);

  return (
    <li className="settings-dropdown" ref={dropdownRef}>
      <span
        className={`nav-link dropdown-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        Settings {isOpen ? '▲' : '▾'}
      </span>
      <ul className={`settings-menu ${isOpen ? 'show' : ''}`}>
        <li>
          <NavLink
            to="/editprofile"
            className="settings-item"
            onClick={handleItemClick}
          >
            ✏️ Edit Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/changepassword"
            className="settings-item"
            onClick={handleItemClick}
          >
            🔒 Change Password
          </NavLink>
        </li>
      </ul>
    </li>
  );
}

export default Settings;