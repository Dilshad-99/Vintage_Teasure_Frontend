import './AdminHome.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../API_URL';

function AdminHome() {

  const [ userCount, setUserCount ]         = useState(0);
  const [ activeCount, setActiveCount ]     = useState(0);
  const [ inactiveCount, setInactiveCount ] = useState(0);

  useEffect(() => {
    axios.get(__userapiurl + "fetch", { params : { "role" : "user" } })
      .then((response) => {
        const users = response.data.userDetails || [];
        setUserCount(users.length);
        setActiveCount(users.filter(u => u.status === 1).length);
        setInactiveCount(users.filter(u => u.status === 0).length);
      })
      .catch((error) => console.error(error));
  }, []);

  const adminLinks = [
    { to : "/manageUser",     icon : "👥", title : "Manage Users",   desc : "View, activate or delete users" },
    { to : "/addcategory",    icon : "📁", title : "Add Category",    desc : "Create new product categories" },
    { to : "/addsubcategory", icon : "📂", title : "Add SubCategory", desc : "Add subcategories under existing categories" },
    { to : "/viewcategory",   icon : "👁️", title : "View Products",   desc : "Browse all categories and products" },
    { to : "/charity",        icon : "🤝", title : "Charity",         desc : "View and manage donations" },
  ];

  return (
    <div className="page-section admin-home-page">
      <div className="admin-home-header">
        <span className="admin-home-icon">👑</span>
        <h2>Admin Panel</h2>
        <p className="subtitle">Welcome back! Manage your store from here.</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <h4>Total Users</h4>
          <p className="stat-count">{userCount}</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <h4>Active Users</h4>
          <p className="stat-count active">{activeCount}</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">❌</span>
          <h4>Inactive Users</h4>
          <p className="stat-count inactive">{inactiveCount}</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <h4>Payments</h4>
          <p>View all transactions</p>
        </div>
      </div>

      <h3 className="admin-section-title">Quick Actions</h3>
      <div className="admin-links-grid">
        {adminLinks.map((link) => (
          <Link to={link.to} className="admin-link-card" key={link.to}>
            <span className="admin-link-icon">{link.icon}</span>
            <div className="admin-link-info">
              <h4>{link.title}</h4>
              <p>{link.desc}</p>
            </div>
            <span className="admin-link-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;