import './Sidebar.css';

function Sidebar() {
  const hours = [
    { day: 'Mon - Fri', time: '9:00 AM - 7:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 5:00 PM' },
    { day: 'Sunday', time: 'Family day 💙' },
  ];

  const categories = [
    { label: 'Jewelry & Watches', href: '#jewelry', count: 42 },
    { label: 'Electronics', href: '#electronics', count: 28 },
    { label: 'Antiques', href: '#antiques', count: 35 },
    { label: 'Musical Instruments', href: '#instruments', count: 15 },
    { label: 'Tools & Equipment', href: '#tools', count: 22 },
    { label: 'Collectibles', href: '#collectibles', count: 31 },
  ];

 const recentItems = [
  {
    img:   '/assets/uploads/sidebar/rolex.jpg',
    name:  'Vintage Rolex Datejust',
    price: '₹2,500',
    note:  'Beautiful patina, runs perfectly'
  },
  {
    img:   '/assets/uploads/sidebar/diamond.jpg',
    name:  'Diamond Solitaire 2ct',
    price: '₹3,800',
    note:  'GIA certified, stunning clarity'
  },
  {
    img:   '/assets/uploads/sidebar/guitar.jpg',
    name:  "Gibson Les Paul '59",
    price: '₹4,200',
    note:  "A musician's dream find"
  },
];

  return (
    <aside className="sidebar">

      {/* ===== Welcome Card ===== */}
      <div className="sidebar-card welcome-card">
        <p className="welcome-emoji">👋</p>
        <p className="welcome-text">
          Welcome! Whether you're buying, selling, or just browsing — you're in the right place.
        </p>
      </div>

      {/* ===== Store Hours ===== */}
      <div className="sidebar-card">
        <h3 className="sidebar-title">☕ When We're Around</h3>
        <ul className="hours-list">
          {hours.map((h) => (
            <li key={h.day}>
              <span>{h.day}</span>
              <span>{h.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== Categories ===== */}
      <div className="sidebar-card">
        <h3 className="sidebar-title">🎨 What We Carry</h3>
        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat.href}>
              <a href={cat.href}>{cat.label}</a>
              <span className="badge">{cat.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== Quick Tip ===== */}
      <div className="sidebar-card tip-card">
        <h3 className="sidebar-title">💡 Did You Know?</h3>
        <p>
          You can bring in <em>anything</em> for a free appraisal — no appointment needed.
          We'll tell you what it's worth and there's zero pressure to sell. Seriously.
        </p>
        <button className="btn btn-primary btn-sm">Book a Visit</button>
      </div>

      {/* ===== Recent Items ===== */}
      <div className="sidebar-card">
        <h3 className="sidebar-title">✨ Just Came In</h3>
        <div className="recent-items">
          {recentItems.map((item) => (
  <div className="recent-item" key={item.name}>
    <div className="recent-item-icon">
      <img
        src={item.img}
        alt={item.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    </div>
    <div>
      <div className="recent-name">{item.name}</div>
      <div className="recent-price">{item.price}</div>
      <div className="recent-note">{item.note}</div>
    </div>
  </div>
))}
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;