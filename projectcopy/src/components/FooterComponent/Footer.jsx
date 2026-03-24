import './Footer.css';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = "917898561191";
const WHATSAPP_MESSAGE = "Hello! I need help with Vintage Treasure.";

function Footer() {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank');
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h3 className="footer-brand">♦ Vintage Treasure</h3>   {/* ✅ Fixed */}
          <p className="footer-desc">
            A small shop with a big heart. We've been buying, selling, and building
            relationships in this community since 2010. Thanks for stopping by —
            we hope to see you in person soon.
          </p>
          <button className="whatsapp-btn" onClick={handleWhatsApp}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="18" />
            Chat on WhatsApp
          </button>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/service">What We Do</Link></li>
            <li><Link to="/contact">Say Hello</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#buy">Browse &amp; Buy</a></li>
            <li><a href="#sell">Sell Something</a></li>
            <li><a href="#pawn">Quick Cash Loans</a></li>
            <li><a href="#appraisal">Free Appraisals</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Find Us</h4>
          <ul className="contact-info">
            <li>📍 123 Main Street, Indore</li>
            <li>📞 (555) 123-4567</li>
            <li>📧 hello@vintagetreasure.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Made with 💙 in Indore. © 2026 Vintage Treasure. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;