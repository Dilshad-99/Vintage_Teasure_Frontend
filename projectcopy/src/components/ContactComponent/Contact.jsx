import { useState } from 'react';
import './Contact.css';
import { useToast } from '../../ToastContext';

const WHATSAPP_NUMBER = "91 7898561191";
const WHATSAPP_MESSAGE = "Hello! I need help with my order.";
const SHOP_LAT = 22.7196;
const SHOP_LNG = 75.8577;

function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showToast("Please fill in all fields.", "warning");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      showToast("Message sent! We'll get back to you soon. 👋", "success");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };

  const handleLocation = () => {
    window.open(`https://www.google.com/maps?q=${SHOP_LAT},${SHOP_LNG}`, '_blank');
  };

  return (
    <div className="page-section contact-page">

      {/* ===== Header ===== */}
      <div className="contact-header">
        <h2>Let's Talk 👋</h2>
        <p className="subtitle">Got a question? Want a quote? Just wanna say hi? We're all ears.</p>
      </div>

      {/* ===== Info Strip — top pe ===== */}
      <div className="contact-strip">
        <div className="strip-item">
          <span>🙋</span>
          <div>
            <h5>Visit Us</h5>
            <p>123 Main Street, City</p>
          </div>
        </div>
        <div className="strip-item">
          <span>📞</span>
          <div>
            <h5>Call Us</h5>
            <p>(555) 123-4567</p>
          </div>
        </div>
        <div className="strip-item">
          <span>📧</span>
          <div>
            <h5>Email Us</h5>
            <p>hello@vintageteasure.com</p>
          </div>
        </div>
        <div className="strip-item strip-whatsapp" onClick={handleWhatsApp}>
          <span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              width="22"
            />
          </span>
          <div>
            <h5>WhatsApp</h5>
            <p>Reply within minutes!</p>
          </div>
        </div>
        <div className="strip-item strip-location" onClick={handleLocation}>
          <span>📍</span>
          <div>
            <h5>Directions</h5>
            <p>Open Google Maps</p>
          </div>
        </div>
      </div>

      {/* ===== Form + Map side by side ===== */}
      <div className="contact-main">

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send Us a Message</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="What should we call you?"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="So we can get back to you"
              />
            </div>
          </div>

          <div className="form-group">
            <label>What's This About?</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. I have a vintage guitar to sell"
            />
          </div>

          <div className="form-group">
            <label>Tell Us More</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Don't be shy — the more details, the better we can help!"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send It Over →'}
          </button>
        </form>

        {/* ===== Map ===== */}
        <div className="contact-map">
          <h3>📍 Find Our Store</h3>
          <iframe
            title="Store Location"
            src={`https://maps.google.com/maps?q=${SHOP_LAT},${SHOP_LNG}&z=15&output=embed`}
            allowFullScreen
          />
          <button className="directions-btn" onClick={handleLocation}>
            Get Directions →
          </button>
        </div>

      </div>
    </div>
  );
}

export default Contact;