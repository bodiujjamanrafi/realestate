import { useState } from 'react';
import { Compass, Send, Award, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Footer({ onNavigate }) {
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsEmail) return;

    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.9 },
      colors: ['#D4AF37', '#FFFFFF']
    });

    setSubscribed(true);
    setNewsEmail('');
  };

  const handleLink = (id) => {
    onNavigate(id);
  };

  return (
    <footer 
      style={{
        backgroundColor: '#07080B',
        borderTop: '1px solid var(--border-color)',
        padding: '80px 24px 40px',
        textAlign: 'left',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Main Grid */}
        <div 
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}
        >
          {/* Brand Col */}
          <div className="footer-brand-col" style={{ flexGrow: 1.5 }}>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px'
              }}
            >
              <Compass className="text-gold" size={26} />
              <div>
                <span 
                  style={{
                    fontFamily: 'var(--font-headings)',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    letterSpacing: '0.15em',
                    color: '#FFF',
                    textTransform: 'uppercase'
                  }}
                >
                  Aura
                </span>
                <span 
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.8rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginTop: '-2px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Estates
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '280px', lineHeight: '1.6' }}>
              Brokerage, acquisition advisement, and private placement portfolios for institutional architectural masterpieces.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Shield size={14} className="text-gold" />
              <span>SIPC & Equal Housing Opportunity Broker</span>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="footer-links-col">
            <h4 style={{ color: '#FFF', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
              Portfolios
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <li>
                <a href="#properties" onClick={(e) => { e.preventDefault(); handleLink('properties'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  Villas & Estates
                </a>
              </li>
              <li>
                <a href="#properties" onClick={(e) => { e.preventDefault(); handleLink('properties'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  Luxury Penthouses
                </a>
              </li>
              <li>
                <a href="#properties" onClick={(e) => { e.preventDefault(); handleLink('properties'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  Private Islands
                </a>
              </li>
              <li>
                <a href="#map" onClick={(e) => { e.preventDefault(); handleLink('map'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  Site Blueprints Map
                </a>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="footer-links-col">
            <h4 style={{ color: '#FFF', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
              Resources
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <li>
                <a href="#tour" onClick={(e) => { e.preventDefault(); handleLink('tour'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  360° Interior Hotspots
                </a>
              </li>
              <li>
                <a href="#mortgage" onClick={(e) => { e.preventDefault(); handleLink('mortgage'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  Mortgage Calculator
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleLink('contact'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  Digital Valuations
                </a>
              </li>
              <li>
                <a href="#agents" onClick={(e) => { e.preventDefault(); handleLink('contact'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  Broker Relations
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="footer-registry-col" style={{ flexGrow: 1.2 }}>
            <h4 style={{ color: '#FFF', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
              Private Registry
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
              Register to receive exclusive off-market listings and private portfolio invitations.
            </p>

            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)', padding: '12px', borderRadius: '8px' }}>
                <Award size={16} className="text-gold" />
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>Access Registered</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  className="form-input"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  style={{ flexGrow: 1, height: '44px', marginBottom: 0, padding: '0 12px', fontSize: '0.85rem' }}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ width: '44px', height: '44px', padding: 0, borderRadius: '8px' }}
                  title="Subscribe"
                >
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div 
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>
            © {new Date().getFullYear()} Aura Estates International Brokerage. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#FFF'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>NDA Protocol</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#FFF'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#FFF'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
