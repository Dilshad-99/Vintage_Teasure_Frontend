import './Footer.css';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = "+91 7898561191"; // apna number daal
const WHATSAPP_MESSAGE = "Hello! I need help with my order.";

function Footer() {

  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h3 className="footer-brand">&#9830; Pawn Star</h3>
          <p className="footer-desc">
            A small shop with a big heart. We've been buying, selling, and building 
            relationships in this community since 2010. Thanks for stopping by — 
            we hope to see you in person soon.
          </p>
          {/* ✅ WhatsApp Button */}
          <button className="whatsapp-btn" onClick={handleWhatsApp}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              width="18"
            />
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
            <li>&#128205; 123 Main Street, City</li>
            <li>&#128222; (555) 123-4567</li>
            <li>&#128231; hello@vintageteasure.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Made with &#128153; in our little corner of the world. &copy; 2026 Vintage Teasure.</p>
      </div>
    </footer>
  );
}

export default Footer;