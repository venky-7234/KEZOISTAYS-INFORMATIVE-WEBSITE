import React from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';

const StayDetails = () => {
  const { slug } = useParams();
  const { openBooking } = useOutletContext();

  return (
    <div className="section-padding" style={{ paddingTop: '150px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/stays" style={{ color: 'var(--color-gold)', marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Stays</Link>
        <h1 style={{ fontSize: '3rem', color: 'var(--color-ivory)', marginBottom: '20px', textTransform: 'capitalize' }}>
          {slug.replace('-', ' ')}
        </h1>
        
        <div style={{ width: '100%', aspectRatio: '21/9', backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: '40px', borderRadius: '8px' }}>
           {/* Image Placeholder */}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-ivory)', marginBottom: '20px' }}>About this stay</h2>
            <p style={{ color: 'var(--color-grey)', fontSize: '1.1rem', lineHeight: '1.8' }}>
              Experience unparalleled luxury and comfort in this meticulously designed property. 
              Featuring premium amenities, high-speed Wi-Fi, and professional housekeeping, it's the perfect choice for your stay in Hyderabad.
            </p>
          </div>
          <div>
            <button type="button" onClick={openBooking} className="btn-primary" style={{ width: '100%', padding: '20px', fontSize: '1.2rem' }}>Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayDetails;
