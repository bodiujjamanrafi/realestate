import { useState } from 'react';
import { Layers, Map, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import LottieImport from 'lottie-react';
import availableAnimation from '../animation-original (3).json';

const Lottie = LottieImport.default || LottieImport;

export default function InteractiveMap() {
  const [selectedPlot, setSelectedPlot] = useState(1);
  const [inquirySent, setInquirySent] = useState(false);

  const plots = [
    {
      id: 1,
      name: 'Plot 101 - The Peninsula',
      price: 8500000,
      status: 'Available',
      size: '2.4 Acres',
      view: '360° Open Ocean & Beachfront',
      description: 'The crown jewel of Aura Crest Cove. Features private beach frontage, deepwater yacht dockability, and pre-approved plans for a 15,000 sq ft architectural estate.',
      coordinates: 'M 100 100 L 250 80 L 280 200 L 120 220 Z'
    },
    {
      id: 2,
      name: 'Plot 102 - Emerald Ridge',
      price: 6200000,
      status: 'Reserved',
      size: '1.8 Acres',
      view: 'Ocean & Golf Course Skyline',
      description: 'Elevated ridge-line plot overlooking the signature 9th hole and south shore. Features absolute privacy, flanked by dense natural conservation buffer zones.',
      coordinates: 'M 250 80 L 400 60 L 420 180 L 280 200 Z'
    },
    {
      id: 3,
      name: 'Plot 103 - Crestview Plateau',
      price: 5900000,
      status: 'Available',
      size: '2.1 Acres',
      view: 'Sunset Ridge & Mountain Ranges',
      description: 'A level clifftop plateau perfect for a single-story mid-century modern pavilion design. Boasts panoramic sunset views over the coastal mountain ranges.',
      coordinates: 'M 120 220 L 280 200 L 300 320 L 150 340 Z'
    },
    {
      id: 4,
      name: 'Plot 104 - Lagoon Cove',
      price: 4800000,
      status: 'Available',
      size: '1.5 Acres',
      view: 'Calm Sanctuary Lagoon & Waterway',
      description: 'Nestled in a wind-sheltered private cove, ideal for paddleboarding and water recreation. Pre-designed with a subterranean boat garage foundation.',
      coordinates: 'M 280 200 L 420 180 L 440 300 L 300 320 Z'
    },
    {
      id: 5,
      name: 'Plot 105 - The Sanctuary',
      price: 9200000,
      status: 'Under Construction',
      size: '3.1 Acres',
      view: 'Direct Beachfront & Cliffside Cascades',
      description: 'Our largest acreage plot containing natural coastal waterfalls and direct private stairs to the white sand beaches below. Foundation work has commenced.',
      coordinates: 'M 400 60 L 550 50 L 570 170 L 420 180 Z'
    }
  ];

  const activePlotData = plots.find(p => p.id === selectedPlot);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleInquiry = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#FFFFFF']
    });
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 5000);
  };

  return (
    <section 
      id="map" 
      className="section-padding" 
      style={{ backgroundColor: 'var(--bg-primary)', position: 'relative', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="container">
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Visual Interactive Finder</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '16px', fontFamily: 'var(--font-headings)' }}>
            Aura Crest Cove <span className="text-gold">Site Map</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Click on the interactive estate plots below to view pricing, availability, and panoramic viewpoint details.
          </p>
        </div>

        {/* Master Flex Layout */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '40px',
            alignItems: 'stretch'
          }}
        >
          {/* Left Column: Styled Architectural SVG Map */}
          <div 
            className="glass-panel"
            style={{
              padding: '24px',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(18, 22, 30, 0.4)',
              minHeight: '400px',
              position: 'relative'
            }}
          >
            {/* Map Controls Overlay */}
            <div 
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(10, 12, 16, 0.8)',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)'
              }}
            >
              <Map size={12} className="text-gold" />
              <span>Interactive Site Blueprint</span>
            </div>

            {/* SVG Drawing */}
            <svg 
              viewBox="0 0 650 400" 
              style={{
                width: '100%',
                maxHeight: '380px',
                overflow: 'visible',
                filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))'
              }}
            >
              {/* Decorative background grids representing ocean blueprint */}
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(212, 175, 55, 0.03)" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="oceanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(212, 175, 55, 0.05)" />
                  <stop offset="100%" stopColor="rgba(10, 12, 16, 0.4)" />
                </linearGradient>
              </defs>

              {/* Water Area background */}
              <rect width="650" height="400" fill="url(#grid)" rx="16" />
              
              {/* Outer Cove shoreline */}
              <path 
                d="M 50 360 C 150 330, 220 280, 260 210 C 300 130, 400 90, 600 80 L 650 400 Z" 
                fill="url(#oceanGlow)" 
                stroke="rgba(212, 175, 55, 0.08)"
                strokeWidth="2"
              />

              {/* Shoreline beach waves */}
              <path 
                d="M 40 370 C 140 340, 210 290, 250 220 C 290 140, 390 100, 590 90" 
                fill="none" 
                stroke="rgba(212, 175, 55, 0.15)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />

              {/* Gated community boundary */}
              <rect x="80" y="40" width="500" height="320" rx="12" fill="none" stroke="rgba(212, 175, 55, 0.06)" strokeWidth="1" strokeDasharray="5,5" />

              {/* Plot Shapes */}
              {plots.map((plot) => {
                const isActive = selectedPlot === plot.id;
                
                // Color depending on status
                let strokeColor = 'rgba(212, 175, 55, 0.3)';
                let fillColor = 'rgba(212, 175, 55, 0.05)';
                
                if (isActive) {
                  strokeColor = 'var(--accent-gold)';
                  fillColor = 'rgba(212, 175, 55, 0.2)';
                } else if (plot.status === 'Reserved') {
                  strokeColor = 'rgba(100, 116, 139, 0.3)';
                  fillColor = 'rgba(100, 116, 139, 0.08)';
                } else if (plot.status === 'Under Construction') {
                  strokeColor = 'rgba(212, 175, 55, 0.2)';
                  fillColor = 'rgba(212, 175, 55, 0.08)';
                }

                return (
                  <g key={plot.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedPlot(plot.id)}>
                    <path
                      d={plot.coordinates}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isActive ? '2.5' : '1.5'}
                      style={{
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.target.style.fill = 'rgba(212, 175, 55, 0.12)';
                          e.target.style.stroke = 'var(--accent-gold)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.target.style.fill = fillColor;
                          e.target.style.stroke = strokeColor;
                        }
                      }}
                    />
                    {/* Plot label */}
                    <text
                      // Extract simple center coordinates based on bounding values roughly
                      x={plot.id === 1 ? 160 : plot.id === 2 ? 330 : plot.id === 3 ? 200 : plot.id === 4 ? 350 : 470}
                      y={plot.id === 1 ? 140 : plot.id === 2 ? 120 : plot.id === 3 ? 270 : plot.id === 4 ? 250 : 100}
                      fill={isActive ? 'var(--accent-gold)' : 'var(--text-secondary)'}
                      fontSize="12"
                      fontWeight="700"
                      textAnchor="middle"
                      pointerEvents="none"
                      style={{
                        fontFamily: 'var(--font-headings)',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {plot.id === 1 ? '101' : plot.id === 2 ? '102' : plot.id === 3 ? '103' : plot.id === 4 ? '104' : '105'}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right Column: Dynamic Plot Info Panel */}
          <div 
            className="glass-panel"
            style={{
              padding: '40px 32px',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'left'
            }}
          >
            <div>
              {/* Badge for Plot & Availability status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.8rem' }}>
                  PLOT OVERVIEW
                </span>
                {activePlotData.status === 'Available' ? (
                  <div style={{ width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', margin: '-50px -10px' }}>
                    <Lottie 
                      animationData={availableAnimation} 
                      loop={true} 
                      style={{ width: '100%', height: '100%' }} 
                    />
                  </div>
                ) : (
                  <span 
                    className="badge" 
                    style={{
                      backgroundColor: activePlotData.status === 'Reserved' ? 'rgba(100, 116, 139, 0.15)' : 'rgba(212, 175, 55, 0.12)',
                      color: activePlotData.status === 'Reserved' ? '#94a3b8' : '#eab308',
                      border: '1px solid',
                      borderColor: activePlotData.status === 'Reserved' ? 'rgba(100, 116, 139, 0.3)' : 'rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    {activePlotData.status}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-headings)', marginBottom: '12px' }}>
                {activePlotData.name}
              </h3>

              {/* Price */}
              <div 
                style={{ 
                  fontSize: '2.2rem', 
                  fontFamily: 'var(--font-headings)', 
                  fontWeight: 800, 
                  color: 'var(--accent-gold)', 
                  marginBottom: '24px' 
                }}
              >
                {formatPrice(activePlotData.price)}
              </div>

              {/* Plot Stats */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '20px',
                  marginBottom: '24px'
                }}
              >
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Lot Acreage</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <Layers size={14} className="text-gold" /> {activePlotData.size}
                  </span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Primary View</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <Sparkles size={14} className="text-gold" /> {activePlotData.view.split(' & ')[0]}
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '32px' }}>
                {activePlotData.description}
              </p>
            </div>

            {/* Quick Inquiry Form */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
              {inquirySent ? (
                <div style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                  <span style={{ color: '#4ade80', fontSize: '0.9rem', fontWeight: 600 }}>Blueprint Request Sent!</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    An architectural consultant will email the site pack details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquiry} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="email"
                    required
                    placeholder="Enter email for full blueprints"
                    className="form-input"
                    style={{ flexGrow: 1, height: '44px', marginBottom: 0, padding: '0 16px' }}
                  />
                  <button 
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '44px', height: '44px', padding: 0 }}
                  >
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
