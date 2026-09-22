import { useState, useEffect } from 'react';
import { Star, ShieldCheck, Mail, Calendar, X, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [startIndex, setStartIndex] = useState(0);

  const agentsList = [
    {
      id: 1,
      name: 'Julian Vance',
      role: 'Principal Ambassador / Partner',
      license: 'AURA-ELITE #9021',
      volume: '$850M+',
      listingsCount: 14,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      specialty: 'Private Islands & Subterranean Architecture'
    },
    {
      id: 2,
      name: 'Seraphina Thorne',
      role: 'Senior Portfolio Director',
      license: 'AURA-ELITE #4041',
      volume: '$620M+',
      listingsCount: 9,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      specialty: 'Skyline Penthouses & Mid-Century Classics'
    },
    {
      id: 3,
      name: 'Maximilian Sterling',
      role: 'Global Acquisition Advisor',
      license: 'AURA-ELITE #7721',
      volume: '$480M+',
      listingsCount: 12,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      specialty: 'Alpine Chalets & Historic Vineyard Estates'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev - 1 + agentsList.length) % agentsList.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [agentsList.length]);

  const orderedAgents = [
    agentsList[(activeIndex - 1 + agentsList.length) % agentsList.length],
    agentsList[activeIndex],
    agentsList[(activeIndex + 1) % agentsList.length]
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !bookingDate) return;

    confetti({
      particleCount: 120,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#FFFFFF']
    });

    setBookingConfirmed(true);
  };

  const handleOpenBooking = (agent) => {
    setSelectedAgent(agent);
    setBookingConfirmed(false);
    setClientName('');
    setClientEmail('');
    setBookingDate('');
  };

  return (
    <section 
      id="agents" 
      className="section-padding" 
      style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)', position: 'relative' }}
    >
      <div className="container">
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>EXPERT REPRESENTATION</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '16px', fontFamily: 'var(--font-headings)' }}>
            Elite Portfolio <span className="text-gold">Advisors</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Our select team of advisors manages portfolios for private clients, family offices, and developers worldwide.
          </p>
        </div>

        {/* Agents Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr 1fr',
            gap: '24px',
            alignItems: 'center'
          }}
          className="agents-grid"
        >
          {orderedAgents.map((agent, idx) => {
            const isCenter = idx === 1;
            return (
              <div 
                key={isCenter ? `${agent.id}_active_${activeIndex}` : agent.id}
                className={`glass-card ${isCenter ? 'animate-center-fade' : ''}`}
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '380px',
                  transform: isCenter ? 'scale(1.08)' : 'scale(0.84)',
                  opacity: isCenter ? 1 : 0.45,
                  zIndex: isCenter ? 2 : 1,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  border: isCenter ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)',
                  boxShadow: isCenter ? '0 12px 40px rgba(212, 175, 55, 0.18)' : 'none',
                  background: isCenter ? 'rgba(24, 30, 41, 0.75)' : 'rgba(18, 22, 30, 0.4)'
                }}
              >
                {/* Image & Overlay license */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  <img 
                    src={agent.image} 
                    alt={agent.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                  />
                  <div 
                    className="agent-license-overlay"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(10, 12, 16, 0.8)',
                      backdropFilter: 'blur(4px)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      color: 'var(--accent-gold)',
                      border: '1px solid rgba(212,175,55,0.2)'
                    }}
                  >
                    {agent.license}
                  </div>
                </div>

                {/* Info Body */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span className="agent-license-inline">{agent.license}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    {agent.role}
                  </span>
                  
                  <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-headings)', marginBottom: '4px' }}>
                    {agent.name}
                  </h3>

                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '12px', fontStyle: 'italic' }}>
                    Specialty: {agent.specialty}
                  </p>

                  {/* Stats Panel */}
                  <div 
                    className="agent-card-stats"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      borderTop: '1px solid var(--border-color)',
                      borderBottom: '1px solid var(--border-color)',
                      padding: '8px 0',
                      marginBottom: '16px',
                      textAlign: 'center'
                    }}
                  >
                    <div>
                      <span style={{ display: 'block', fontSize: '0.55rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Volume</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-gold)' }}>{agent.volume}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.55rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Listings</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>{agent.listingsCount}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.55rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rating</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '2px', justifyContent: 'center' }}>
                        {agent.rating} <Star size={10} fill="var(--accent-gold)" stroke="none" />
                      </span>
                    </div>
                  </div>

                  {/* CTA Action */}
                  <button 
                    className="btn btn-secondary agent-card-btn"
                    onClick={() => handleOpenBooking(agent)}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      marginTop: 'auto',
                      padding: '8px 12px',
                      fontSize: '0.75rem',
                      gap: '6px'
                    }}
                  >
                    <Calendar size={12} className="text-gold" />
                    Request Access
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Modal Overlay */}
      {selectedAgent && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(5, 6, 8, 0.9)',
            backdropFilter: 'blur(10px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedAgent(null)}
        >
          <div 
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '480px',
              borderRadius: '24px',
              padding: '32px',
              position: 'relative',
              textAlign: 'left',
              boxShadow: 'var(--shadow-premium), var(--glow-gold)',
              animation: 'modalSlideUp 0.4s ease forwards'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button 
              onClick={() => setSelectedAgent(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            {bookingConfirmed ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div 
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 55, 0.12)',
                    border: '2px solid var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <ShieldCheck size={26} className="text-gold" />
                </div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '8px', fontFamily: 'var(--font-headings)' }}>Consultation Requested</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  A personal assistant representing <strong>{selectedAgent.name}</strong> will contact you to coordinate executive clearance for your visit on <strong>{bookingDate}</strong>.
                </p>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setSelectedAgent(null)}
                  style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}
                >
                  Dismiss Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <img 
                    src={selectedAgent.image} 
                    alt={selectedAgent.name} 
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 600 }}>Portfolio Consultation</span>
                    <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-headings)' }}>{selectedAgent.name}</h4>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                    <User size={12} /> Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="form-input"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                    <Mail size={12} /> Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="form-input"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                    <Calendar size={12} /> Requested Date
                  </label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
                >
                  Secure Direct Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
