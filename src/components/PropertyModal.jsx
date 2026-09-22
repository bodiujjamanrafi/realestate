import { useState } from 'react';
import { X, Bed, Bath, Maximize2, MapPin, Check, Calendar, Mail, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PropertyModal({ property, onClose, onAcquireProperty }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  if (!property) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !date) return;

    // Trigger luxury booking celebration!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFFFFF', '#C5A85C', '#181E29']
    });

    setFormSubmitted(true);
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(5, 6, 8, 0.9)',
        backdropFilter: 'blur(12px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      {/* Modal Card */}
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '90vh',
          borderRadius: '24px',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-premium), var(--glow-gold)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'modalSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(10, 12, 16, 0.7)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'var(--transition-smooth)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; e.currentTarget.style.color = 'var(--accent-gold)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        >
          <X size={20} />
        </button>

        {/* Hero image and title strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Main Photo */}
          <div style={{ height: '380px', position: 'relative' }}>
            <img 
              src={property.image} 
              alt={property.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(10, 12, 16, 1) 100%)'
              }}
            />
            <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
              <span className="badge badge-gold" style={{ marginBottom: '10px' }}>{property.tag || 'Exclusive Listing'}</span>
              <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-headings)' }}>{property.title}</h2>
            </div>
          </div>

          {/* Sub Photos & Highlight specs */}
          <div 
            style={{
              padding: '40px 32px',
              backgroundColor: 'rgba(24, 30, 41, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <MapPin size={18} className="text-gold" />
                <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{property.location}</span>
              </div>

              <div 
                style={{ 
                  fontSize: '2.5rem', 
                  fontFamily: 'var(--font-headings)', 
                  fontWeight: 800, 
                  color: 'var(--accent-gold)',
                  marginBottom: '20px'
                }}
              >
                {formatPrice(property.price)}
              </div>

              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                {property.description || 'Experience the ultimate statement of luxury living. Designed by award-winning architects, this masterfully structured residence features absolute luxury materials, soaring floor-to-ceiling glass pavilions, and custom wellness chambers, framing breathtaking landscapes.'}
              </p>
            </div>

            {/* Quick Specs */}
            <div 
              style={{
                display: 'flex',
                gap: '24px',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '20px'
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Bedrooms</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', marginTop: '4px' }}>
                  <Bed size={16} className="text-gold" /> {property.beds}
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Bathrooms</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', marginTop: '4px' }}>
                  <Bath size={16} className="text-gold" /> {property.baths}
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Area</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', marginTop: '4px' }}>
                  <Maximize2 size={16} className="text-gold" /> {property.sqft.toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>sqft</span>
                </span>
              </div>
            </div>

            {/* Acquisition CTA */}
            <div style={{ marginTop: '28px' }}>
              <button
                className="btn btn-primary"
                onClick={() => onAcquireProperty(property)}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  padding: '14px 28px',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)'
                }}
              >
                Acquire Residence / Place Offer
              </button>
            </div>
          </div>
        </div>

        {/* Lower Section: Features & Viewing Booking Form */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            padding: '40px 32px',
            borderTop: '1px solid var(--border-color)'
          }}
        >
          {/* Amenities checklist */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', fontFamily: 'var(--font-headings)', color: 'var(--text-primary)' }}>
              Exclusive Amenities
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {(property.amenities || [
                'Subterranean Vault Gallery',
                'Infinity Edge Pool',
                'Glass Elevator',
                'Smart Home Automation',
                'Chef\'s Kitchen & Scullery',
                '150-ft Private Yacht Dock',
                'Private Helipad Access',
                'Wine & Cigar Humidor Room',
                'Wellness Spa & Hammam',
                'Fully Equipped Gym'
              ]).map((amenity, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <div 
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.1)',
                      border: '1px solid var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Check size={10} className="text-gold" />
                  </div>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          {/* Consultation Form Panel */}
          <div 
            className="glass-panel" 
            style={{
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              background: 'rgba(20, 24, 32, 0.4)'
            }}
          >
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 55, 0.12)',
                    border: '2px solid var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <Calendar size={28} className="text-gold" />
                </div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '8px', fontFamily: 'var(--font-headings)' }}>Viewing Requested</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Thank you, <strong>{name}</strong>. An Aura Estates Ambassador will contact you at <strong>{email}</strong> within 2 hours to confirm your private viewing.
                </p>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setFormSubmitted(false)}
                  style={{ marginTop: '20px', padding: '8px 16px', fontSize: '0.8rem' }}
                >
                  Schedule Another Date
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', fontFamily: 'var(--font-headings)' }}>
                  Request Private Viewing
                </h4>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                    <User size={12} /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                    <Mail size={12} /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                    <Calendar size={12} /> Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                >
                  Schedule Ambassador Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Slide-up keyframes */}
      <style>{`
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
