import { useState } from 'react';
import { TrendingUp, DollarSign, MapPin, BarChart3, LineChart, Award } from 'lucide-react';

export default function MarketTrends() {
  const [selectedLocation, setSelectedLocation] = useState('all');

  const marketData = {
    all: {
      indexName: 'Aura Global Luxury Index',
      indexValue: '3,842.15',
      change: '+11.8%',
      volume: '$1.42B',
      chartPoints: [100, 115, 120, 138, 155, 172, 198], // historical values
      years: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
      highlights: [
        'Super-prime inventory contracted by 14% globally, driving pricing momentum.',
        'Manhattan and Malibu lead transaction density for waterfront luxury.',
        'Average cash transaction share rose to 62% in the ultra-luxury tier.'
      ]
    },
    manhattan: {
      indexName: 'Manhattan Penthouse Index',
      indexValue: '4,105.80',
      change: '+12.4%',
      volume: '$480M',
      chartPoints: [110, 122, 128, 142, 160, 180, 205],
      years: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
      highlights: [
        'Skyline duplex demand surged following corporate relocations.',
        'Price per square foot topped $3,200 on average for Central Park views.',
        'Co-op approvals streamlined for verified sovereign fund profiles.'
      ]
    },
    beverlyhills: {
      indexName: 'Beverly Hills Estate Index',
      indexValue: '3,540.20',
      change: '+8.7%',
      volume: '$395M',
      chartPoints: [95, 105, 112, 124, 138, 150, 168],
      years: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
      highlights: [
        'Gated canyon estates seeing record bidding cycles.',
        'Wellness hammock extensions add an average of 4.5% to property value.',
        'Subterranean gallery counts heavily influencing transaction velocity.'
      ]
    },
    malibu: {
      indexName: 'Malibu Waterfront Index',
      indexValue: '4,890.95',
      change: '+15.2%',
      volume: '$310M',
      chartPoints: [120, 138, 152, 180, 210, 240, 282],
      years: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
      highlights: [
        'Private beach cove access premium expanded to an all-time high.',
        'Louvered privacy installations standard in 90% of new builds.',
        'Off-market pocket transactions represent 45% of total coastal volume.'
      ]
    }
  };

  const activeData = marketData[selectedLocation];

  // Build SVG path points
  const width = 500;
  const height = 150;
  const padding = 20;
  
  const minVal = Math.min(...activeData.chartPoints);
  const maxVal = Math.max(...activeData.chartPoints);
  const range = maxVal - minVal;

  const points = activeData.chartPoints.map((val, idx) => {
    const x = padding + (idx * (width - padding * 2)) / (activeData.chartPoints.length - 1);
    const y = height - padding - ((val - minVal) * (height - padding * 2)) / range;
    return { x, y, val };
  });

  const pathD = points.reduce((acc, p, idx) => {
    return acc + `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }, '');

  // Grid background lines for SVG
  const gridLines = [0.25, 0.5, 0.75].map(ratio => height - padding - ratio * (height - padding * 2));

  return (
    <section 
      id="trends" 
      className="section-padding" 
      style={{ backgroundColor: 'var(--bg-primary)', position: 'relative', borderTop: '1px solid var(--border-color)' }}
    >
      {/* Glow Effects */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: '250px',
          height: '250px',
          background: 'rgba(212, 175, 55, 0.03)',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Title Block */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
            Exclusive Insights
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'var(--font-headings)', marginBottom: '16px' }}>
            Market <span className="text-gold">Intelligence</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Real-time analytics and valuation indices across elite global micro-markets.
          </p>
        </div>

        {/* Location Select Buttons */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '8px', 
            marginBottom: '36px',
            flexWrap: 'wrap'
          }}
        >
          {Object.keys(marketData).map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              style={{
                background: selectedLocation === loc ? 'var(--accent-gold)' : 'rgba(24, 30, 41, 0.4)',
                color: selectedLocation === loc ? 'var(--bg-primary)' : 'var(--text-primary)',
                border: '1px solid',
                borderColor: selectedLocation === loc ? 'var(--accent-gold)' : 'var(--border-color)',
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {loc === 'all' ? 'Global Portfolio' : loc === 'beverlyhills' ? 'Beverly Hills' : loc}
            </button>
          ))}
        </div>

        {/* Intelligence Board */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '30px' 
          }}
        >
          
          {/* Left Block: Index Stats & SVG Graph */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '32px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              height: '100%',
              minHeight: '400px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {activeData.indexName}
                  </span>
                  <span style={{ fontSize: '2.25rem', fontFamily: 'var(--font-headings)', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '4px', display: 'block' }}>
                    {activeData.indexValue}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    color: '#34d399',
                    fontSize: '1rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    textShadow: '0 0 10px rgba(52, 211, 153, 0.25)'
                  }}>
                    <TrendingUp size={16} /> {activeData.change}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>YoY growth</span>
                </div>
              </div>

              {/* SVG Area Chart */}
              <div style={{ background: 'rgba(10, 12, 16, 0.4)', borderRadius: '16px', padding: '16px 8px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
                <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', overflow: 'visible' }}>
                  {/* Grid Lines */}
                  {gridLines.map((glY, idx) => (
                    <line key={idx} x1={padding} y1={glY} x2={width - padding} y2={glY} stroke="rgba(212, 175, 55, 0.05)" strokeDasharray="4 4" />
                  ))}

                  {/* Gradient fill */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent-gold)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--accent-gold)" stopOpacity="0.00" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area fill path */}
                  <path
                    d={`${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
                    fill="url(#chartGradient)"
                  />

                  {/* Line stroke path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="var(--accent-gold)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Intersecting dots */}
                  {points.map((p, idx) => (
                    <g key={idx}>
                      <circle 
                        cx={p.x} 
                        cy={p.y} 
                        r="4" 
                        fill="var(--bg-primary)" 
                        stroke="var(--accent-gold)" 
                        strokeWidth="2" 
                      />
                    </g>
                  ))}
                </svg>

                {/* Years Label */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', marginTop: '12px' }}>
                  {activeData.years.map((year, idx) => (
                    <span key={idx} style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{year}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BarChart3 size={20} style={{ color: 'var(--accent-gold)', filter: 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.45))', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quarterly Vol</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activeData.volume}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LineChart size={20} style={{ color: 'var(--accent-gold)', filter: 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.45))', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Index High</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{points[points.length - 1].val}% base</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Insights list & Market commentary */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '32px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              height: '100%'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <MapPin className="text-gold" size={20} />
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>
                  Tactical Commentary
                </h3>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: 1.7 }}>
                Micro-market variables are indicating continued yield premiums for trophy assets. Limited zoning clearances in coastal zones and restrictive city penthouses ensure supply inelasticity relative to global wealth scaling.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeData.highlights.map((highlight, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div 
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(212,175,55,0.12)', 
                        border: '1px solid var(--accent-gold)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--accent-gold)',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      {idx + 1}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div 
              style={{ 
                marginTop: '32px',
                padding: '16px', 
                borderRadius: '12px', 
                backgroundColor: 'rgba(212,175,55,0.03)', 
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <Award className="text-gold" size={20} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Certified valuation analytics vetted by the Aura Advisory Board.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
