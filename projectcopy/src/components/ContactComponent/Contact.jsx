import { useState } from 'react';
import './Contact.css';
import { useToast } from '../../ToastContext';

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

    // simulate sending
    setTimeout(() => {
      showToast("Message sent! We'll get back to you soon. 👋", "success");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="page-section contact-page">
      <h2>Let's Talk 👋</h2>
      <p className="subtitle">Got a question? Want a quote? Just wanna say hi? We're all ears.</p>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
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

        <div className="contact-info-cards">
          <div className="info-card">
            <span className="info-icon">🙋</span>
            <h4>Stop By Anytime</h4>
            <p>
              123 Main Street<br />
              City, State 12345<br />
              <span className="info-note">Free parking in the back!</span>
            </p>
          </div>
          <div className="info-card">
            <span className="info-icon">📞</span>
            <h4>Give Us a Ring</h4>
            <p>
              (555) 123-4567<br />
              <span className="info-note">Mon-Sat, 9am-7pm<br />We pick up, promise.</span>
            </p>
          </div>
          <div className="info-card">
            <span className="info-icon">📧</span>
            <h4>Drop Us a Line</h4>
            <p>
              hello@pawnstar.com<br />
              <span className="info-note">Usually reply within a few hours</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;