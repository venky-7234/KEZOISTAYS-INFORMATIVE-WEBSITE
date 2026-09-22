import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './Hero.css';
import { FaWhatsapp } from 'react-icons/fa';
const Hero = ({ mobileMenuOpen }) => {
  const heroRef = useRef(null);
  const [activePanel, setActivePanel] = useState('live');
  const navigate = useNavigate();

  const handlePanelClick = (id, link, e) => {
    e.preventDefault();
    // If clicking a non-active panel, expand it.
    // If it is already active, navigate to the page.
    if (activePanel !== id) {
      setActivePanel(id);
    } else {
      navigate(link);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for the panels
      gsap.fromTo('.hero-frame',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const panels = [
    {
      id: 'live',
      title: 'Kezoi Live',
      image: 'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/Kezoi_Live01.png',
      link: '/experiences/live'
    },
    {
      id: 'care',
      title: 'Kezoi Care',
      image: 'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/Kezoi_Care01.jpg',
      link: '/experiences/care'
    },
    {
      id: 'move',
      title: 'Kezoi Move',
      image: 'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/Kezoi_Move.png',
      link: '/experiences/move'
    },
    {
      id: 'table',
      title: 'Kezoi Table',
      image: 'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/Kezoi_Table01.png',
      link: '/experiences/table'
    }


    
  ];

  return (
    <section className="hero-split" ref={heroRef} id="home">
      {panels.map((panel) => (
        <a
          href={panel.link}
          className={`hero-frame frame-${panel.id} ${activePanel === panel.id ? 'active' : ''} ${activePanel && activePanel !== panel.id ? 'inactive' : ''}`}
          key={panel.id}
          onClick={(e) => handlePanelClick(panel.id, panel.link, e)}
        >
          <div
            className="frame-bg"
            style={{ backgroundImage: `url('${panel.image}')` }}
          ></div>
          <div className="frame-overlay"></div>

          <div className="frame-content">
            <h2 className="frame-title">{panel.title}</h2>
            <span className="frame-subtitle">CLICK TO EXPLORE MORE</span>
          </div>
        </a>
      ))}

      {/* Floating Icons */}
      
{!mobileMenuOpen && (
  <div className="hero-floating-icons">

  {/* Instagram */}
  <a
    href="https://www.instagram.com/kezoistays?igsi=MTE1Z2pmNWU4OW45dA=="
    target="_blank"
    rel="noopener noreferrer"
    className="hero-float-icon"
    aria-label="Instagram"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  </a>

  {/* WhatsApp */}
<a
  href="https://wa.me/919052688188"
  target="_blank"
  rel="noopener noreferrer"
  className="hero-float-icon hero-whatsapp-icon"
  aria-label="WhatsApp"
>
  <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M12.01 2C6.49 2 2 6.49 2 12c0 1.76.46 3.41 1.32 4.86L2.05 22l5.27-1.35A9.94 9.94 0 0 0 12.01 22C17.53 22 22 17.51 22 12S17.53 2 12.01 2Zm0 18.18c-1.47 0-2.91-.39-4.17-1.13l-.3-.18-3.13.8.84-3.04-.2-.31A8.19 8.19 0 1 1 12.01 20.18Zm4.49-6.13c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.52.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/>
</svg>
  
</a>

  {/* Book Stay */}
  <a
    href="/book-stay"
    className="hero-float-icon hero-book-icon"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>

    <span className="hero-float-text">
      BOOK STAY
    </span>
  </a>

  </div>
)}
    </section>
  );
};

export default Hero;
