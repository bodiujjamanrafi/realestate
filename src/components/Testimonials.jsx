import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: 'Alexander Mercer',
      title: 'Founder, Sovereign Holdings Group',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      quote: 'The acquisition of Villa Mirage was handled with absolute discretion and surgical precision. Aura Estates represents the gold standard of modern digital real estate platforms.',
      rating: 5,
      location: 'Beverly Hills'
    },
    {
      id: 2,
      name: 'Victoria Saint-Laurent',
      title: 'Global Estate Trustee',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
      quote: 'Securing a penthouse with verified resident helipad access in Manhattan is notoriously complex. Aura\'s off-market private advisory team bypassed typical hurdles inside 48 hours.',
      rating: 5,
      location: 'Manhattan'
    },
    {
      id: 3,
      name: 'Lord Marcus Stirling',
      title: 'Sovereign Fund Chairman',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
      quote: 'Aura\'s mapping intelligence and interactive pricing console are years ahead. The level of analytical transparency they bring to high-value assets is unmatched.',
      rating: 5,
      location: 'Aspen'
    }
  ];

  // Auto transition slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + reviews.length) % reviews.length);
  };

  const current = reviews[activeIndex];

  return (
    <section 
      id="testimonials" 
      className="section-padding" 
      style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', position: 'relative' }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Panel: Static Editorial Heading */}
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
              Client Chronicles
            </span>
            <h2 
              style={{ 
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', 
                fontFamily: 'var(--font-headings)', 
                marginBottom: '16px',
                lineHeight: 1.15
              }}
            >
              Vouched by <br />
              <span className="text-gold">Sovereign Buyers</span>
            </h2>
            <p style={{ marginBottom: '32px', maxWidth: '440px' }}>
              Read the success accounts of international investors, estate collectors, and family trusts who acquire prime luxury assets through Aura Estates.
            </p>
            
            {/* Custom arrow navigation */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                onClick={handlePrev}
                className="btn btn-secondary" 
                style={{ width: '48px', height: '48px', padding: 0, borderRadius: '50%' }}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNext}
                className="btn btn-secondary" 
                style={{ width: '48px', height: '48px', padding: 0, borderRadius: '50%' }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Right Panel: Sliding Quote Card */}
          <div 
            className="glass-card animate-fade-in-up" 
            key={current.id} // trigger re-animation on slide change
            style={{ 
              padding: '48px 40px', 
              position: 'relative',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* Decorative Quotes Icon */}
            <Quote 
              size={56} 
              style={{ 
                color: 'rgba(212, 175, 55, 0.06)', 
                position: 'absolute', 
                top: '24px', 
                right: '32px',
                strokeWidth: 1.5
              }} 
            />

            <div>
              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--accent-gold)" stroke="none" />
                ))}
              </div>

              {/* Review Text */}
              <p 
                style={{ 
                  fontSize: 'clamp(1rem, 1.25vw, 1.2rem)', 
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-primary)', 
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  marginBottom: '32px',
                  fontWeight: 300
                }}
              >
                "{current.quote}"
              </p>
            </div>

            {/* Author Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
              <img 
                src={current.image} 
                alt={current.name} 
                style={{ 
                  width: '52px', 
                  height: '52px', 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  border: '1px solid var(--accent-gold)' 
                }} 
              />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{current.name}</h4>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{current.title}</span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{current.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
