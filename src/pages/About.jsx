import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, BedDouble, LoaderCircle, MapPin, RefreshCw } from 'lucide-react';
import '../components/About.css';

const API = (import.meta.env.VITE_API_BASE_URL || 'https://api.kezoistays.com').replace(/\/$/, '');
const FALLBACK_IMAGE = '/kezoi-live-property-v2.png';
const FEATURED_IMAGE = 'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6309.webp';
const TG0002_IMAGE = 'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/kezoi+property-2/living+area/A6707684.webp';
const titleCase = value => String(value || '').replace(/\b\w/g, letter => letter.toUpperCase());
const propertyImage = property => property.cover_image_url || property.hero_image_url || property.image_url || ({
  'TG-0001': FEATURED_IMAGE,
  'TG-0002': TG0002_IMAGE,
}[property.property_code] || FALLBACK_IMAGE);

const About = () => {
  const [properties, setProperties] = useState([]);
  const [propertiesState, setPropertiesState] = useState('loading');

  const loadProperties = useCallback(async () => {
    setPropertiesState('loading');
    try {
      const response = await fetch(`${API}/api/applications/properties`, { headers: { Accept: 'application/json' } });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success || !Array.isArray(data.properties)) throw Error('Properties could not be loaded.');
      const availableProperties = data.properties.filter(property => property.property_code);
      setProperties(availableProperties);
      setPropertiesState(availableProperties.length ? 'ready' : 'empty');
    } catch {
      setPropertiesState('error');
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProperties();
  }, [loadProperties]);

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
          {propertiesState === 'loading' && <div className="properties-message" role="status"><LoaderCircle className="properties-spinner" size={24} /> Loading our stays...</div>}
          {propertiesState === 'error' && <div className="properties-message properties-error" role="alert"><span>We couldn't load our stays right now.</span><button type="button" onClick={loadProperties}><RefreshCw size={16} /> Retry</button></div>}
          {propertiesState === 'empty' && <div className="properties-message" role="status">No stays are currently available.</div>}
          {propertiesState === 'ready' && properties.map((property) => {
            const location = [property.area, property.city].filter(Boolean).map(titleCase).join(', ');
            const name = property.property_name || titleCase(property.property_type) || 'Kezoi Stay';
            const propertyUrl = property.microsite_url || property.website_url || (property.property_code === 'TG-0001' ? '/TG-0001' : `/book-stay?property=${encodeURIComponent(property.property_code)}`);
            return <a key={property.id || property.property_code} href={propertyUrl} className="presence-property-card" aria-label={`Explore ${property.property_code}, ${name}${location ? ` in ${location}` : ''}`}>
              <div className="property-image-wrapper">
                <img
                  src={propertyImage(property)}
                  alt={`${name}${location ? ` in ${location}` : ''}`}
                  className="property-image"
                  loading="lazy"
                />
              </div>
              <div className="property-card-content">
                <div className="property-card-topline">
                  <span className="property-status"><i aria-hidden="true" /> Available</span>
                  <span className="property-number">{property.property_code}</span>
                </div>
                <h3>{name}</h3>
                <div className="property-facts">
                  {Number(property.bedrooms) > 0 && <span><BedDouble size={18} aria-hidden="true" /> {property.bedrooms} Bedroom{Number(property.bedrooms) === 1 ? '' : 's'}</span>}
                  {location && <span><MapPin size={18} aria-hidden="true" /> {location}</span>}
                </div>
                <div className="property-explore">
                  <span>Explore property</span>
                  <ArrowUpRight size={24} aria-hidden="true" />
                </div>
              </div>
            </a>;
          })}
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
