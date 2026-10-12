import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X } from 'lucide-react';
import './CustomerStories.css';

gsap.registerPlugin(ScrollTrigger);

const CUSTOMER_STORY_VIDEO = 'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/1012_compressed.mp4';

const CustomerStories = () => {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);
  const videoRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(elementsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isVideoOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    videoRef.current?.play().catch(() => {});

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsVideoOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      videoRef.current?.pause();
    };
  }, [isVideoOpen]);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section className="customer-stories" ref={sectionRef}>
      <div className="customer-stories-content">
        <span className="customer-stories-eyebrow" ref={addToRefs}>STEP INTO KEZOI</span>
        <h2 className="customer-stories-title customer-stories-title-spaced" ref={addToRefs}>Explore the stay and imagine yourself here.</h2>

        <button
          type="button"
          className="video-thumbnail-container"
          ref={addToRefs}
          onClick={() => setIsVideoOpen(true)}
          aria-label="Play customer story video"
        >
          <video
            className="video-thumbnail"
            src={`${CUSTOMER_STORY_VIDEO}#t=0.1`}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="play-button-overlay">
            <div className="play-button">
              <Play size={32} fill="currentColor" />
            </div>
          </div>
        </button>

        <div className="customer-stories-cta-wrapper" ref={addToRefs}>
          <Link to="/experiences/care" className="btn-primary customer-cta">
            FIND YOUR KEZOI HOME
          </Link>
        </div>
      </div>

      {isVideoOpen && (
        <div
          className="customer-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Customer story video"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsVideoOpen(false);
          }}
        >
          <button
            type="button"
            className="customer-video-close"
            ref={closeButtonRef}
            onClick={() => setIsVideoOpen(false)}
            aria-label="Close video"
          >
            <X size={24} aria-hidden="true" />
            <span>CLOSE</span>
          </button>
          <video
            ref={videoRef}
            className="customer-video-player"
            src={CUSTOMER_STORY_VIDEO}
            controls
            autoPlay
            playsInline
          >
            Your browser does not support HTML video.
          </video>
        </div>
      )}
    </section>
  );
};

export default CustomerStories;
