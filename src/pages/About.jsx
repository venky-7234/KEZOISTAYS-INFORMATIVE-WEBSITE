import React, { useEffect } from 'react';
import { ArrowUpRight, BedDouble, MapPin } from 'lucide-react';
import '../components/About.css';

const PROPERTY_URL = 'https://www.kezoistays.com/TG-0001';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <section className="properties-section" aria-labelledby="properties-title">
        <div className="properties-heading">
          <div>
            <span className="properties-kicker">OUR PRESENCE</span>
            <h1 id="properties-title">Homes in Hyderabad</h1>
          </div>
          <p>Explore our homes and discover each property through its dedicated microsite.</p>
        </div>

        <div className="presence-property-grid">
          <a href={PROPERTY_URL} className="presence-property-card" aria-label="Explore Kezoi's premium 3BHK flat in Manikonda, Hyderabad">
            <div className="property-image-wrapper">
              <img
                src="https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6309.webp"
                alt="Living room of the premium Kezoi 3BHK flat in Manikonda, Hyderabad"
                className="property-image"
                loading="eager"
              />
            </div>
            <div className="property-card-content">
              <div className="property-card-topline">
                <span className="property-status"><i aria-hidden="true" /> Available</span>
                <span className="property-number">Manikonda</span>
              </div>
              <h3>Premium 3BHK Flat</h3>
              <div className="property-facts">
                <span><BedDouble size={18} aria-hidden="true" /> 3 Bedrooms</span>
                <span><MapPin size={18} aria-hidden="true" /> Manikonda, Hyderabad</span>
              </div>
              <div className="property-explore">
                <span>Explore property</span>
                <ArrowUpRight size={24} aria-hidden="true" />
              </div>
            </div>
          </a>
        </div>
      </section>

      <section className="coming-soon" aria-label="Upcoming properties">
        <span>THE COLLECTION IS GROWING</span>
        <p>Our next Kezoi home is currently being prepared for its first guests.</p>
      </section>

      <section className="closing-statement">
        <h2 className="closing-statement-text">YOU ARE NOT CHECKING IN.<br />YOU ARE ARRIVING HOME.</h2>
      </section>
    </div>
  );
};

export default About;
