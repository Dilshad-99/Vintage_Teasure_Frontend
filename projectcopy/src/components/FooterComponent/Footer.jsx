import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
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
            <li>&#128231; hello@pawnstar.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Made with &#128153; in our little corner of the world. &copy; 2026 Pawn Star.</p>
      </div>
    </footer>
  );
}

export default Footer;