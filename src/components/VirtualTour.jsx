import { useState } from 'react';
import { Eye, Info, Sparkles, Navigation, X } from 'lucide-react';

export default function VirtualTour() {
  const [activeSpace, setActiveSpace] = useState('living');
  const [activeTooltip, setActiveTooltip] = useState(null);

  const spaces = {
    living: {
      name: 'Grand Pavilion',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
      hotspots: [
        {
          id: 'l1',
          top: '45%',
          left: '25%',
          title: 'Guatemala Marble Hearth',
          description: 'Double-sided, custom carved verde marble fireplace framing the dual lounge spaces.'
        },
        {
          id: 'l2',
          top: '30%',
          left: '70%',
          title: 'Motorized Glass Facade',
          description: '14-foot floor-to-ceiling motorized Schuco glass panels opening seamlessly to the main terrace.'
        }
      ]
    },
    deck: {
      name: 'Infinity Terrace',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
      hotspots: [
        {
          id: 'd1',
          top: '65%',
          left: '50%',
          title: 'Cantilever Infinity Pool',
          description: '60-foot structural cantilevered heated saltwater infinity pool overlooking the coastal cliff.'
        },
        {
          id: 'd2',
          top: '75%',
          left: '80%',
          title: 'Maritime Teak Decking',
          description: 'Premium Indonesian teak wood decking, oil-treated to withstand coastal microclimates.'
        }
      ]
    },
    kitchen: {
      name: 'Epicurean Kitchen',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
      hotspots: [
        {
          id: 'k1',
          top: '55%',
          left: '42%',
          title: 'Dual Calacatta Islands',
          description: 'Double bookmatched Calacatta Gold marble slab waterfall islands with integrated flush induction cooktops.'
        },
        {
          id: 'k2',
          top: '35%',
          left: '78%',
          title: 'Gaggenau Preservation Vaults',
          description: 'Professional-grade column refrigeration, freezer, and dual-zone sommelier wine cellars.'
        }
      ]
    },
    spa: {
      name: 'Wellness Sanctuary',
      image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1400&q=80',
      hotspots: [
        {
          id: 's1',
          top: '58%',
          left: '48%',
          title: 'Limestone Soaking Tub',
          description: 'Monolithic tub carved out of a single block of Spanish limestone, centered under a direct skylight dome.'
        },
        {
          id: 's2',
          top: '40%',
          left: '20%',
          title: 'Hammam Steam Room',
          description: 'Thermodynamic steam chamber equipped with heated stone benching and integrated aromatherapy infusers.'
        }
      ]
    }
  };

  const currentSpace = spaces[activeSpace];

  return (
    <section 
      id="tour" 
      className="section-padding" 
      style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)', position: 'relative' }}
    >
      <div className="container">
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>VIRTUAL REALITY PREVIEW</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '16px', fontFamily: 'var(--font-headings)' }}>
            360° Interior <span className="text-gold">Hotspots</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Experience our spaces virtually. Select a venue below and click the pulsing gold hotspots to explore architectural finishes.
          </p>
        </div>

        {/* Space Selector Tabs */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '36px',
            flexWrap: 'wrap'
          }}
        >
          {Object.entries(spaces).map(([key, value]) => (
            <button
              key={key}
              onClick={() => {
                setActiveSpace(key);
                setActiveTooltip(null);
              }}
              style={{
                background: activeSpace === key ? 'var(--accent-gold)' : 'rgba(24, 30, 41, 0.4)',
                color: activeSpace === key ? 'var(--bg-primary)' : 'var(--text-primary)',
                border: '1px solid',
                borderColor: activeSpace === key ? 'var(--accent-gold)' : 'var(--border-color)',
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Eye size={16} />
              {value.name}
            </button>
          ))}
        </div>

        {/* Viewfinder Canvas */}
        <div 
          className="glass-panel"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(350px, 55vh, 650px)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-premium), var(--glow-gold)',
            border: '1px solid var(--border-color)'
          }}
        >
          {/* Main Space Photo */}
          <img 
            src={currentSpace.image} 
            alt={currentSpace.name} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'var(--transition-slow)'
            }}
          />

          {/* Compass overlay marker */}
          <div 
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(10, 12, 16, 0.8)',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)'
            }}
          >
            <Navigation size={14} className="text-gold" style={{ transform: 'rotate(45deg)' }} />
            <span>Interactive Viewfinder</span>
          </div>

          {/* Hotspots Mapping */}
          {currentSpace.hotspots.map((hotspot) => {
            const isTooltipOpen = activeTooltip === hotspot.id;
            return (
              <div 
                key={hotspot.id}
                style={{
                  position: 'absolute',
                  top: hotspot.top,
                  left: hotspot.left,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                {/* Glowing pulse hotspot point */}
                <div 
                  className="hotspot-pulse"
                  onClick={() => setActiveTooltip(isTooltipOpen ? null : hotspot.id)}
                >
                  <Info size={12} style={{ color: 'var(--bg-primary)' }} />
                </div>

                {/* Floating Tooltip details */}
                {isTooltipOpen && (
                  <div 
                    className="glass-panel animate-fade-in-up"
                    style={{
                      position: 'absolute',
                      bottom: '28px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '260px',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid var(--accent-gold)',
                      textAlign: 'left',
                      boxShadow: 'var(--shadow-premium)',
                      zIndex: 20
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Sparkles size={12} /> {hotspot.title}
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveTooltip(null); }}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {hotspot.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
