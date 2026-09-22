import React from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/kezoi_logo-01.svg';
import './Footer.css';

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg-icon">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const WhatsappIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="social-svg-icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.01 2C6.49 2 2 6.49 2 12c0 1.76.46 3.41 1.32 4.86L2.05 22l5.27-1.35A9.94 9.94 0 0 0 12.01 22C17.53 22 22 17.51 22 12S17.53 2 12.01 2Zm0 18.18c-1.47 0-2.91-.39-4.17-1.13l-.3-.18-3.13.8.84-3.04-.2-.31A8.19 8.19 0 1 1 12.01 20.18Zm4.49-6.13c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.52.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg-icon">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg-icon">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid-background"></div>
      <div className="footer-container section-padding">
        
        <div className="footer-top">
          <div className="footer-brand">
            <img 
              src={logoUrl} 
              alt="Kezoi Stays Logo" 
              className="footer-logo-img" 
            />
            <h2 className="footer-tagline">KEZOI — A HOME. WITH A LIFE AROUND IT.</h2>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Links</h4>
              <Link to="/about">Our Presence</Link>
              <Link to="/experiences">Experiences</Link>
              <Link to="/journal">Journal</Link>
              <Link to="/partner">Partner with us</Link>
            </div>

            <div className="footer-col">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/cancellation">Cancellation Policy</Link>
              <Link to="/partner-terms">Partner Terms</Link>
            </div>

            <div className="footer-col">
              <h4>Social</h4>

              <div className="social-icons">

  <a
    href="https://www.instagram.com/kezoistays?igsi=MTE1Z2pmNWU4OW45dA=="
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <InstagramIcon />
  </a>

  <a
    href="#"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
  >
    <YoutubeIcon />
  </a>

  <a
    href="#"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <LinkedinIcon />
  </a>

  <a
    href="https://wa.me/919052688188"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
  >
    <WhatsappIcon />
  </a>

</div>


            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; KEZOI STAYS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
