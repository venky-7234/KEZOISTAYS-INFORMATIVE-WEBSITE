import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import logoUrl from '../assets/kezoi_logo-01.svg';
import './Header.css';

const Header = ({ mobileMenuOpen, setMobileMenuOpen, onBook }) => {
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen, setMobileMenuOpen]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none', display: 'block' }}>
            <img src={logoUrl} alt="Kezoi Stays" className="header-logo-img" />
          </Link>
        </div>
        <nav className="nav-links">
  <Link to="/our-stays">Our Stays</Link>

  <div className="nav-dropdown">
    <span className="nav-dropdown-trigger">
      Experiences
    </span>

    <div className="nav-dropdown-content">
      <Link to="/experiences/care">KEZOI CARE</Link>
      <Link to="/experiences/move">KEZOI MOVE</Link>
      <Link to="/experiences/table">KEZOI TABLE</Link>
    </div>
  </div>

  <Link to="/journal">Journal</Link>
  <Link to="/partner">Partner with us</Link>

  <button type="button" className="book-stay-btn" onClick={onBook}>Book Now</button>
</nav>
        {/* Mobile Header Actions - shown only when menu is open */}
{mobileMenuOpen && (
  <div className="mobile-header-actions">

    {/* Instagram */}
<a
  href="https://www.instagram.com/kezoistays?igsi=MTE1Z2pmNWU4OW45dA=="
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram"
  className="mobile-header-action"
>
  <FaInstagram />
</a>

{/* WhatsApp */}
<a
  href="https://wa.me/919052688188"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="WhatsApp"
  className="mobile-header-action"
>
  <FaWhatsapp />
</a>

{/* YouTube */}
<a
  href="#"
  aria-label="YouTube"
  className="mobile-header-action"
>
  <FaYoutube />
</a>

{/* LinkedIn */}
<a
  href="#"
  aria-label="LinkedIn"
  className="mobile-header-action"
>
  <FaLinkedinIn />
</a>

    
  </div>
)}

{/* Mobile Menu Toggle Button */}
<button
  type="button"
  className="mobile-menu-btn"
  onClick={toggleMobileMenu}
  aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
  aria-expanded={mobileMenuOpen}
  aria-controls="mobile-navigation"
>
  {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
</button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        id="mobile-navigation"
        className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-nav-pattern"></div>
        <div className="mobile-nav-content">
          <Link to="/" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/our-stays" onClick={toggleMobileMenu}>Our Stays</Link>
          <div className="mobile-nav-group">
            <span className="mobile-nav-title">Experiences</span>
            <Link to="/experiences/care" onClick={toggleMobileMenu}>KEZOI CARE</Link>
            <Link to="/experiences/move" onClick={toggleMobileMenu}>KEZOI MOVE</Link>
            <Link to="/experiences/table" onClick={toggleMobileMenu}>KEZOI TABLE</Link>
          </div>
          <Link to="/journal" onClick={toggleMobileMenu}>Journal</Link>
          <Link to="/partner" onClick={toggleMobileMenu}>Partner with us</Link>
          <button type="button" onClick={() => { toggleMobileMenu(); onBook(); }} className="mobile-book-stay-btn">Book Now</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
