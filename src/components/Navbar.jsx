import { useState, useEffect } from 'react';
import { Compass, Menu, X, PhoneCall, User, Plus } from 'lucide-react';

export default function Navbar({ onNavigate, activeSection, currentUser, onAuthTrigger, onPortalTrigger, onSellTrigger }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Properties', id: 'properties' },
    { name: 'Interactive Map', id: 'map' },
    { name: 'Virtual Tour', id: 'tour' },
    { name: 'Mortgage Calculator', id: 'mortgage' },
    { name: 'Valuation & Contact', id: 'contact' }
  ];

  const handleClick = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-slate-950/80 backdrop-blur-md border-b border-yellow-500/10 shadow-lg' 
          : 'py-6 bg-transparent'
      }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        transition: 'var(--transition-smooth)',
        backgroundColor: isScrolled ? 'rgba(10, 12, 16, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none'
      }}
    >
      <div 
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handleClick('hero'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-primary)'
          }}
        >
          <Compass className="text-gold" size={28} style={{ strokeWidth: 1.5 }} />
          <div>
            <span 
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '0.15em',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase'
              }}
            >
              Aura
            </span>
            <span 
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '0.85rem',
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
        </a>

        {/* Desktop Navigation Links */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}
          className="desktop-nav"
        >
          <ul 
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '28px',
              margin: 0,
              padding: 0
            }}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.id);
                  }}
                  style={{
                    color: activeSection === link.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    transition: 'var(--transition-smooth)',
                    borderBottom: activeSection === link.id ? '2px solid var(--accent-gold)' : '2px solid transparent',
                    paddingBottom: '4px'
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== link.id) e.target.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== link.id) e.target.style.color = 'var(--text-secondary)';
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                className="btn btn-secondary"
                onClick={onSellTrigger}
                style={{
                  padding: '10px 18px',
                  fontSize: '0.85rem',
                  borderColor: 'rgba(212,175,55,0.3)',
                  color: 'var(--accent-gold)'
                }}
              >
                <Plus size={14} />
                List Property
              </button>
              
              <button 
                className="btn btn-primary"
                onClick={onPortalTrigger}
                style={{
                  padding: '10px 18px',
                  fontSize: '0.85rem',
                  gap: '8px'
                }}
              >
                <User size={14} />
                My Portal
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                className="btn btn-secondary"
                onClick={onAuthTrigger}
                style={{
                  padding: '10px 18px',
                  fontSize: '0.85rem'
                }}
              >
                Sign In
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => handleClick('contact')}
                style={{
                  padding: '10px 18px',
                  fontSize: '0.85rem'
                }}
              >
                <PhoneCall size={14} />
                Consultation
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'none',
            zIndex: 110
          }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(10, 12, 16, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            zIndex: 99
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              margin: 0,
              padding: 0
            }}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.id);
                  }}
                  style={{
                    color: activeSection === link.id ? 'var(--accent-gold)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '1.5rem',
                    fontFamily: 'var(--font-headings)',
                    fontWeight: 600,
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {currentUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '80%', maxWidth: '300px' }}>
              <button
                className="btn btn-secondary"
                onClick={() => { onSellTrigger(); setIsOpen(false); }}
                style={{
                  padding: '12px 24px',
                  fontSize: '0.95rem',
                  width: '100%',
                  borderColor: 'rgba(212,175,55,0.3)',
                  color: 'var(--accent-gold)',
                  gap: '8px'
                }}
              >
                <Plus size={16} />
                List Property
              </button>
              
              <button
                className="btn btn-primary"
                onClick={() => { onPortalTrigger(); setIsOpen(false); }}
                style={{
                  padding: '12px 24px',
                  fontSize: '0.95rem',
                  width: '100%',
                  gap: '8px'
                }}
              >
                <User size={16} />
                My Portal
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '80%', maxWidth: '300px' }}>
              <button
                className="btn btn-secondary"
                onClick={() => { onAuthTrigger(); setIsOpen(false); }}
                style={{
                  padding: '12px 24px',
                  fontSize: '0.95rem',
                  width: '100%'
                }}
              >
                Sign In
              </button>
              <button
                className="btn btn-primary"
                onClick={() => { handleClick('contact'); setIsOpen(false); }}
                style={{
                  padding: '12px 24px',
                  fontSize: '0.95rem',
                  width: '100%'
                }}
              >
                <PhoneCall size={16} />
                Consultation
              </button>
            </div>
          )}
        </div>
      )}

      {/* CSS overrides for responsive navbar layout */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
