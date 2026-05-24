import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#home" className="navbar-logo">
            <div className="navbar-logo-mark">H</div>
            <span className="navbar-logo-text">HazardX</span>
          </a>

          <div className="navbar-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#contact">Contact</a>
            <button className="navbar-cta" onClick={() => navigate('/predict')}>Get Started</button>
          </div>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <a href="#home" onClick={() => setMobileOpen(false)}>Home</a>
        <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
        <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How It Works</a>
        <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
        <button className="navbar-cta" style={{marginTop: '0.5rem', width: '100%'}} onClick={() => { setMobileOpen(false); navigate('/predict'); }}>Get Started</button>
      </div>
    </>
  );
}