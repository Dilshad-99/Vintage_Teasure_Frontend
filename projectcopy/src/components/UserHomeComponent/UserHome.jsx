import './UserHome.css';
import { Link } from 'react-router-dom';

function UserHome() {

  const name     = localStorage.getItem('name') || 'there';
  const userRole = localStorage.getItem('role');

  const quickLinks = [
    { to : '/viewcategory',   icon : '📁', title : 'Browse Categories', desc : 'Explore all available categories',  roles : ['user', 'admin'] },
    { to : '/addproduct',     icon : '🛍️', title : 'Add Product',       desc : 'Add new products to the store',    roles : ['user'] },
    { to : '/charity',        icon : '🤝', title : 'Make a Donation',   desc : 'Support our charity initiative',   roles : ['user', 'admin'] },
    { to : '/editprofile',    icon : '✏️', title : 'Edit Profile',      desc : 'Update your personal information', roles : ['user', 'admin'] },
    { to : '/changepassword', icon : '🔒', title : 'Change Password',   desc : 'Keep your account secure',         roles : ['user', 'admin'] },
    { to : '/aiclient',       icon : '🤖', title : 'AI Assistant',      desc : 'Chat with our AI for help',        roles : ['user', 'admin'] },
    { to : '/logout',         icon : '👋', title : 'Logout',            desc : 'Sign out of your account',         roles : ['user', 'admin'] },
  ];

  const visibleLinks = quickLinks.filter(l => l.roles.includes(userRole));

  return (
    <div className="page-section user-home-page">
      <div className="user-home-header">
        <span className="user-home-icon">👤</span>
        <h2>Welcome, {name}!</h2>
        <p className="subtitle">Good to have you here. What would you like to do today?</p>
      </div>

      <div className="user-stats">
        <div className="stat-card"><span className="stat-icon">📁</span><h4>Categories</h4><p>Browse products</p></div>
        <div className="stat-card"><span className="stat-icon">🤝</span><h4>Charity</h4><p>Make a donation</p></div>
        <div className="stat-card"><span className="stat-icon">🤖</span><h4>AI Chat</h4><p>Get assistance</p></div>
        <div className="stat-card"><span className="stat-icon">✏️</span><h4>Profile</h4><p>Manage account</p></div>
      </div>

      <h3 className="user-section-title">Quick Actions</h3>
      <div className="user-links-grid">
        {visibleLinks.map((link) => (
          <Link to={link.to} className="user-link-card" key={link.to}>
            <span className="user-link-icon">{link.icon}</span>
            <div className="user-link-info">
              <h4>{link.title}</h4>
              <p>{link.desc}</p>
            </div>
            <span className="user-link-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserHome;