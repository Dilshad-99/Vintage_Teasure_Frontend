import './UserHome.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { __productapiurl } from '../../API_URL';

function UserHome() {

  const name      = localStorage.getItem('name')  || 'there';
  const userEmail = localStorage.getItem('email') || '';
  const userRole  = localStorage.getItem('role')  || 'user';

  const [myProducts, setMyProducts] = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    axios.get(__productapiurl + "fetch", { params: { addedby: userEmail, role: userRole } })
      .then(res => setMyProducts(res.data.userDetails || []))
      .catch(() => setMyProducts([]))
      .finally(() => setLoading(false));
  }, [userEmail, userRole]);

  const quickLinks = [
    { to: '/viewcategory',   icon: '📁', title: 'Browse Categories', desc: 'Explore all available categories'  },
    { to: '/addproduct',     icon: '🛍️', title: 'Add Product',       desc: 'Add new products to the store'    },
    { to: '/charity',        icon: '🤝', title: 'Make a Donation',   desc: 'Support our charity initiative'   },
    { to: '/editprofile',    icon: '✏️', title: 'Edit Profile',      desc: 'Update your personal information' },
    { to: '/changepassword', icon: '🔒', title: 'Change Password',   desc: 'Keep your account secure'         },
    { to: '/aiclient',       icon: '🤖', title: 'AI Assistant',      desc: 'Chat with our AI for help'        },
    { to: '/logout',         icon: '👋', title: 'Logout',            desc: 'Sign out of your account'         },
  ];

  return (
    <div className="page-section user-home-page">

      <div className="user-home-header">
        <span className="user-home-icon">👤</span>
        <h2>Welcome, {name}!</h2>
        <p className="subtitle">Good to have you here. What would you like to do today?</p>
      </div>

      <div className="user-stats">
        <div className="stat-card">
          <span className="stat-icon">🛍️</span>
          <h4>My Products</h4>
          <p>{loading ? '...' : myProducts.length} listed</p>
        </div>
        <div className="stat-card"><span className="stat-icon">📁</span><h4>Categories</h4><p>Browse products</p></div>
        <div className="stat-card"><span className="stat-icon">🤝</span><h4>Charity</h4><p>Make a donation</p></div>
        <div className="stat-card"><span className="stat-icon">🤖</span><h4>AI Chat</h4><p>Get assistance</p></div>
      </div>

      {/* My Products Section */}
      <h3 className="user-section-title">My Products</h3>

      {loading ? (
        <p className="loading-msg">Loading your products...</p>
      ) : myProducts.length === 0 ? (
        <div className="user-empty">
          <span>📭</span>
          <p>You haven't added any products yet. <Link to="/addproduct">Add one now!</Link></p>
        </div>
      ) : (
        <div className="product-grid">
          {myProducts.map(product => (
            <div className="product-card" key={product._id}>
              <img
                src={`/assets/uploads/producticons/${product.producticonnm}`}
                alt={product.title}
                className="product-card-image"
                onError={e => e.target.src = '/assets/placeholder.png'}
              />
              <span className="product-card-name">{product.title}</span>
              {product.price && <span className="product-card-price">₹{product.price}</span>}
              <Link to={`/productdetail/${product._id}`} className="product-detail-btn">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      <h3 className="user-section-title">Quick Actions</h3>
      <div className="user-links-grid">
        {quickLinks.map(link => (
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