import './AdminHome.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api';                          // ✅ api instance

function useCountUp(target, duration = 1000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 30));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function StatCard({ icon, label, value, color, loading }) {
  const animated = useCountUp(value);
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <h4>{label}</h4>
      {loading
        ? <div className="stat-skeleton" />
        : <p className="stat-count" style={color ? { color } : {}}>{animated}</p>
      }
    </div>
  );
}

function AdminHome() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/user/fetch', { params: { role: 'user' } })   // ✅ token auto-attached
      .then(res => setUsers(res.data.userDetails || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const total    = users.length;
  const active   = users.filter(u => u.status === 1).length;
  const inactive = users.filter(u => u.status === 0).length;

  const adminLinks = [
    { to: "/manageUser",     icon: "👥", title: "Manage Users",   desc: "View, activate or delete users" },
    { to: "/addcategory",    icon: "📁", title: "Add Category",    desc: "Create new product categories" },
    { to: "/addsubcategory", icon: "📂", title: "Add SubCategory", desc: "Add subcategories to categories" },
    { to: "/viewcategory",   icon: "👁️", title: "View Products",   desc: "Browse all categories and products" },
    { to: "/charity",        icon: "🤝", title: "Charity",         desc: "View and manage donations" },
    { to: "/editprofile",    icon: "✏️", title: "Edit Profile",    desc: "Update your admin information" },
    { to: "/changepassword", icon: "🔒", title: "Change Password", desc: "Keep your account secure" },
  ];

  return (
    <div className="page-section admin-home-page">
      <div className="admin-home-header">
        <span className="admin-home-icon">👑</span>
        <h2>Admin Panel</h2>
        <p className="subtitle">Welcome back! Manage your store from here.</p>
      </div>

      <div className="admin-stats">
        <StatCard icon="👥" label="Total Users"    value={total}    loading={loading} />
        <StatCard icon="✅" label="Active Users"   value={active}   loading={loading} color="var(--color-success, green)" />
        <StatCard icon="❌" label="Inactive Users" value={inactive} loading={loading} color="var(--color-danger, red)" />
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <h4>Payments</h4>
          <p>View transactions</p>
        </div>
      </div>

      <h3 className="admin-section-title">Quick Actions</h3>
      <div className="admin-links-grid">
        {adminLinks.map(link => (
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