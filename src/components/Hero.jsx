import { useState } from 'react';
import { Search, MapPin, Home, DollarSign, ArrowDown } from 'lucide-react';

export default function Hero({ onSearch }) {
  const [activeTab, setActiveTab] = useState('buy');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');

  const locations = [
    { value: 'Beverly Hills', label: 'Beverly Hills, CA' },
    { value: 'Miami Beach', label: 'Miami Beach, FL' },
    { value: 'Aspen', label: 'Aspen, CO' },
    { value: 'Malibu', label: 'Malibu, CA' },
    { value: 'Manhattan', label: 'Manhattan, NY' }
  ];

  const types = [
    { value: 'Villa', label: 'Villas & Estates' },
    { value: 'Penthouse', label: 'Luxury Penthouses' },
    { value: 'Island', label: 'Private Islands' },
    { value: 'Iconic', label: 'Architectural Icons' }
  ];

  const prices = [
    { value: 'under-5m', label: 'Under $5,000,000' },
    { value: '5m-15m', label: '$5,000,000 - $15,000,000' },
    { value: '15m-30m', label: '$15,000,000 - $30,000,000' },
    { value: 'above-30m', label: '$30,000,000+' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({ tab: activeTab, location, type, price });
  };

  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(rgba(10, 12, 16, 0.65), rgba(10, 12, 16, 0.95)), url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80") center/cover no-repeat',
        padding: '120px 24px 80px',
        textAlign: 'center'
      }}
    >
      {/* Background Decorative Glows */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'rgba(212, 175, 55, 0.04)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '350px',
          height: '350px',
          background: 'rgba(212, 175, 55, 0.03)',
          filter: 'blur(120px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />

      <div className="container animate-fade-in-up" style={{ zIndex: 2, maxWidth: '960px' }}>
        {/* Decorative Badge */}
        <div style={{ marginBottom: '24px' }}>
          <span className="badge badge-gold">
            Aura Estates Elite
          </span>
        </div>

        {/* Master Heading */}
        <h1 
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontFamily: 'var(--font-headings)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '20px',
            letterSpacing: '-0.03em'
          }}
        >
          <span className="text-gold-gradient">The Epitome of</span> <br />
          <span style={{ color: 'var(--accent-gold)' }}>Exceptional Living</span>
        </h1>

        {/* Subtitle */}
        <p 
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            maxWidth: '650px',
            margin: '0 auto 48px',
            color: 'var(--text-secondary)',
            fontWeight: 400
          }}
        >
          A curated portfolio of ultra-luxury residences, architectural landmarks, and private islands across the world's premier destinations.
        </p>

        {/* Dynamic Filter Search Console */}
        <div 
          className="glass-panel"
          style={{
            borderRadius: '24px',
            padding: '8px',
            boxShadow: 'var(--shadow-premium), var(--glow-gold)',
            maxWidth: '900px',
            margin: '0 auto'
          }}
        >
          {/* Tab Switcher */}
          <div 
            style={{
              display: 'flex',
              gap: '4px',
              padding: '6px',
              borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
              marginBottom: '8px'
            }}
          >
            {['buy', 'rent', 'sell'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                  border: 'none',
                  color: activeTab === tab ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  padding: '8px 24px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSearchSubmit}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              padding: '12px',
              alignItems: 'end'
            }}
          >
            {/* Location selector */}
            <div className="form-group" style={{ marginBottom: 0, textAlign: 'left' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                <MapPin size={12} /> Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-input"
                style={{ width: '100%', height: '48px', appearance: 'none', WebkitAppearance: 'none' }}
              >
                <option value="">Any Location</option>
                {locations.map((loc) => (
                  <option key={loc.value} value={loc.value}>{loc.label}</option>
                ))}
              </select>
            </div>

            {/* Type selector */}
            <div className="form-group" style={{ marginBottom: 0, textAlign: 'left' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                <Home size={12} /> Property Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-input"
                style={{ width: '100%', height: '48px', appearance: 'none', WebkitAppearance: 'none' }}
              >
                <option value="">Any Type</option>
                {types.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Price range selector */}
            <div className="form-group" style={{ marginBottom: 0, textAlign: 'left' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                <DollarSign size={12} /> Price Budget
              </label>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input"
                style={{ width: '100%', height: '48px', appearance: 'none', WebkitAppearance: 'none' }}
              >
                <option value="">Any Budget</option>
                {prices.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            {/* Search Submit button */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                height: '48px',
                width: '100%',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Search size={18} />
              Explore Listings
            </button>
          </form>
        </div>
      </div>

      {/* Explore indicator */}
      <div 
        style={{
          position: 'absolute',
          bottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          zIndex: 2,
          opacity: 0.7,
          transition: 'var(--transition-smooth)'
        }}
        onClick={() => {
          const propertiesSection = document.getElementById('properties');
          if (propertiesSection) {
            propertiesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
        onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
          Discover More
        </span>
        <ArrowDown size={16} className="text-gold" style={{ animation: 'bounce 2s infinite' }} />
      </div>

      {/* Inline animations styling */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-6px);
          }
          60% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </section>
  );
}
