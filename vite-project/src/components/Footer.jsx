import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <a href="#home" className="navbar-logo">
              <div className="navbar-logo-mark">H</div>
              <span className="navbar-logo-text">HazardX</span>
            </a>
            <p className="footer-brand-desc">
              Free ML-powered workplace safety analytics to predict and prevent accidents.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Product</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#documentation">Documentation</a></li>
              <li><a href="#case-studies">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact-item">
              <Mail />
              <span>support@hazardx.ai</span>
            </div>
            <div className="footer-contact-item">
              <Phone />
              <span>+91</span>
            </div>
            <div className="footer-contact-item">
              <MapPin />
              <span>Bhilai<br/>Chhattisgarh, India</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-legal">
            © 2026 HazardX. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}