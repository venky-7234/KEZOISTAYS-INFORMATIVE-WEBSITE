import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Journal.css';

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg-icon">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg-icon">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg-icon">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg-icon">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Journal = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Hero Reveal Animation
      gsap.fromTo('.journal-eyebrow', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      
      // Animate title lines if they exist, or just the title
      gsap.fromTo('.journal-title',
        { y: 50, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.out', delay: 0.4 }
      );

      // Hero background fade on scroll
      gsap.to('.journal-hero', {
        opacity: 0,
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.journal-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 2. Parallax Grid Images
      gsap.utils.toArray('.journal-category-img').forEach((img) => {
        gsap.fromTo(img, 
          { y: '-15%' },
          {
            y: '15%',
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement, // Trigger on the image wrapper
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });

      // Grid items fade up
      gsap.utils.toArray('.journal-category').forEach((item) => {
        gsap.fromTo(item,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });

      // 3. Infinite Social Marquee
      // Moves left horizontally on scroll
      gsap.to('.marquee-inner', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.journal-social-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1 // smooth scrubbing
        }
      });

      // 4. Newsletter Clip-Path Reveal
      gsap.fromTo('.newsletter-content-wrapper',
        { clipPath: 'inset(20% 5% 20% 5% round 10px)', scale: 0.9 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          scale: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.journal-newsletter-section',
            start: 'top 80%',
            end: 'center center',
            scrub: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    { name: 'Homes', image: 'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/HomesHd.jpg', size: 'large' },
    { name: 'People', image: 'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/Peoplehd.jpg', size: 'portrait' },
    { name: 'Food', image: 'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/food_2_11zon.jpg', size: 'landscape' },
    { name: 'Cities', image: 'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/Cities.png', size: 'portrait' },
    { name: 'Travel', image: 'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/Travel_8_11zon.jpg', size: 'large' },
    
  ];

  return (
    <div className="journal-page" ref={containerRef}>
      {/* Hero Section */}
      <section className="journal-hero">
        <div className="journal-hero-content">
          <span className="journal-eyebrow">THE KEZOI JOURNAL</span>
          <h1 className="journal-title">LIFE AROUND<br/>THE HOME.</h1>
        </div>
      </section>

      {/* Asymmetrical Categories Grid */}
      <section className="journal-categories-section">
        <div className="journal-categories-grid">
          {categories.map((cat, index) => (
            <div className={`journal-category size-${cat.size}`} key={index}>
              <h3 className="journal-category-name">{cat.name}</h3>
              <div className="journal-category-image-wrapper">
                <img src={cat.image} alt={cat.name} className="journal-category-img" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee Social CTA Section */}
      <section className="journal-social-section">
        <div className="marquee-container">
          <div className="marquee-inner">
            <div className="marquee-content">
              <span>FOLLOW THE LIFE AROUND KEZOI</span>
              <a href="https://www.instagram.com/kezoistays?igsi=MTE1Z2pmNWU4OW45dA==" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
              <a href="#"><YoutubeIcon /></a>
              <a href="#"><LinkedinIcon /></a>
              <a href="#"><FacebookIcon /></a>
            </div>
            {/* Duplicate for infinite effect */}
            <div className="marquee-content">
              <span>FOLLOW THE LIFE AROUND KEZOI</span>
              <a href="https://www.instagram.com/kezoistays?igsi=MTE1Z2pmNWU4OW45dA==" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
              <a href="#"><YoutubeIcon /></a>
              <a href="#"><LinkedinIcon /></a>
              <a href="#"><FacebookIcon /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="journal-newsletter-section">
        <div className="newsletter-content-wrapper">
          <div className="newsletter-content">
            <h2 className="newsletter-title">THE KEZOI LETTER</h2>
            <p className="newsletter-desc">Curated stories, design insights, and exclusive updates delivered straight to your inbox.</p>
            <a href="#" className="btn-primary newsletter-cta">JOIN THE KEZOI LETTER</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Journal;
