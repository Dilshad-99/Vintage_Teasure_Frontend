import './Main.css';
import { useState, useEffect } from 'react';
import { useToast } from '../../ToastContext';

function Main() {

  const { showToast } = useToast();
  const [ count, setCount ] = useState(0);
  const [ now, setNow ]     = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const greeting = () => {
    const h = now.getHours();
    return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
  };

  const increment = () => { setCount(p => p + 1); showToast('Item added to wishlist! 🛍️', 'success'); };
  const decrement = () => {
    if (count === 0) { showToast('Wishlist is already empty!', 'warning'); return; }
    setCount(p => p - 1);
    showToast('Item removed from wishlist.', 'info');
  };

  return (
    <div className="home-page">

      <div className="hero-banner" style={{
        backgroundImage: 'url(/assets/uploads/hero/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
        <div className="hero-content">
          <p className="hero-greeting">{greeting()} 👋</p>
          <h1>Every Item Has a <span className="gold-text">Story</span></h1>
          <p className="hero-subtitle">
            We're not just a pawn shop — we're the people who help you find hidden treasures,
            get fair value for what you own, and treat every customer like family.
            Walk in as a stranger, leave as a friend.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">See What's New</button>
            <button className="btn btn-outline">Bring Something In</button>
          </div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item"><span className="stat-number">5,000+</span><span className="stat-label">Stories Exchanged</span></div>
        <div className="stat-item"><span className="stat-number">2,000+</span><span className="stat-label">Happy Faces</span></div>
        <div className="stat-item"><span className="stat-number">15+</span><span className="stat-label">Years of Trust</span></div>
        <div className="stat-item"><span className="stat-number">98%</span><span className="stat-label">Come Back Again</span></div>
      </div>

      <div className="features-section">
        <h2>Here's What Makes Us Different</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Honest Prices, Always</h3>
            <p>No games, no lowballing. We research every item and give you a price that's genuinely fair — because we want you to come back.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>We Actually Listen</h3>
            <p>Tell us the story behind your piece. Whether it's a family heirloom or a garage sale find, we care about what it means to you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Real Experts, Real People</h3>
            <p>Our team has 40+ years of combined experience — and they'll happily geek out over your vintage finds with you.</p>
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <h2>What People Say About Us</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">"I walked in nervous about selling my grandmother's ring. They took the time to explain everything, showed me comparables, and I left feeling good about the whole thing."</p>
            <div className="testimonial-author">
              <div className="author-avatar">S</div>
              <div><div className="author-name">Sarah M.</div><div className="author-detail">First-time seller</div></div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"Found a 1960s Fender Stratocaster here for an incredible price. The staff even helped me check the serial number. These guys know their stuff and genuinely love what they do."</p>
            <div className="testimonial-author">
              <div className="author-avatar">R</div>
              <div><div className="author-name">Raj K.</div><div className="author-detail">Regular customer, 3 years</div></div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"Needed quick cash for an emergency. They gave me a fair pawn loan, no judgement, and I got my watch back two weeks later. Real human beings running this place."</p>
            <div className="testimonial-author">
              <div className="author-avatar">M</div>
              <div><div className="author-name">Mike T.</div><div className="author-detail">Pawn loan customer</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="widget-section">
        <div className="datetime-widget">
          <div className="widget-icon">☕</div>
          <div>
            <div className="widget-label">{greeting()} — we're here for you</div>
            <div className="widget-value">
              {now.toLocaleString('en-US', { weekday : 'long', year : 'numeric', month : 'long', day : 'numeric', hour : '2-digit', minute : '2-digit', second : '2-digit' })}
            </div>
          </div>
        </div>
        <div className="counter-widget">
          <h3>Your Wishlist</h3>
          <p className="counter-desc">Keep track of items you love</p>
          <div className="counter-display">
            <button className="counter-btn minus" onClick={decrement}>−</button>
            <span className="counter-value">{count}</span>
            <button className="counter-btn plus" onClick={increment}>+</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Main;