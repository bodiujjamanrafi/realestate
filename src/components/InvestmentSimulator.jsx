import { useState, useEffect } from 'react';
import { Calculator, HelpCircle, ArrowUpRight, TrendingUp, Info, ShieldAlert } from 'lucide-react';

export default function InvestmentSimulator({ properties = [] }) {
  const [selectedPropId, setSelectedPropId] = useState('');
  const [years, setYears] = useState(10);
  const [appreciationRate, setAppreciationRate] = useState(6.5); // annual %
  const [rentalYield, setRentalYield] = useState(4.2); // annual %
  const [isSimulating, setIsSimulating] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Results state
  const [results, setResults] = useState(null);

  // Set default property when properties are loaded
  useEffect(() => {
    if (properties.length > 0 && !selectedPropId) {
      setSelectedPropId(properties[0].id.toString());
    }
  }, [properties, selectedPropId]);

  const activeProp = properties.find(p => p.id.toString() === selectedPropId);

  const handleSimulate = (e) => {
    if (e) e.preventDefault();
    if (!activeProp) return;

    setIsSimulating(true);

    // Simulate luxury computation time
    setTimeout(() => {
      setIsSimulating(false);
      
      const initialValue = activeProp.price;
      const appRateDecimal = appreciationRate / 100;
      const yieldDecimal = rentalYield / 100;
      
      // Year-by-year projections
      let currentValue = initialValue;
      let cumulativeRent = 0;
      const projections = [];

      for (let yr = 1; yr <= years; yr++) {
        const appreciationValue = currentValue * appRateDecimal;
        const rentalIncome = currentValue * yieldDecimal;
        
        currentValue += appreciationValue;
        cumulativeRent += rentalIncome;

        projections.push({
          year: yr,
          assetValue: currentValue,
          rentIncome: rentalIncome,
          cumulativeRent
        });
      }

      const capitalGains = (currentValue - initialValue) * 0.15; // mock 15% tax
      const netRentIncome = cumulativeRent * 0.80; // mock 20% maintenance/tax overhead
      const totalProfit = (currentValue - initialValue - capitalGains) + netRentIncome;
      const roi = (totalProfit / initialValue) * 100;

      setResults({
        initialValue,
        finalValue: currentValue,
        grossAppreciation: currentValue - initialValue,
        cumulativeRent,
        maintenanceCost: cumulativeRent * 0.20,
        capitalGainsTax: capitalGains,
        netProfit: totalProfit,
        roiPercentage: roi,
        yearlyData: projections
      });
    }, 1000);
  };

  // Run simulation automatically when inputs tweak for dynamic responsiveness
  useEffect(() => {
    if (activeProp) {
      handleSimulate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPropId, years, appreciationRate, rentalYield]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section 
      id="simulator" 
      className="section-padding" 
      style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', position: 'relative' }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
            Financial Planning
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'var(--font-headings)', marginBottom: '16px' }}>
            Wealth <span className="text-gold">Yield Simulator</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Simulate historical compounding gains, rental cash flow, and tax structures for premium estates.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', alignItems: 'stretch' }}>
          {/* Left panel: Simulator Inputs */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '36px 32px', 
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              background: 'rgba(20, 24, 32, 0.4)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <Calculator className="text-gold" size={20} />
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>Simulation Console</h3>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {/* Select Asset */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Select Luxury Property</label>
                <select
                  className="form-input"
                  value={selectedPropId}
                  onChange={(e) => setSelectedPropId(e.target.value)}
                  style={{ width: '100%', appearance: 'none', WebkitAppearance: 'none' }}
                >
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} — {formatCurrency(p.price)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Years Horizon */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Investment Term</label>
                  <span style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 700 }}>{years} Years</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                />
              </div>

              {/* Annual Appreciation Rate */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Annual Capital Appreciation</label>
                  <span style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 700 }}>{appreciationRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  step="0.1"
                  value={appreciationRate} 
                  onChange={(e) => setAppreciationRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                />
              </div>

              {/* Annual Rental Yield Rate */}
              <div className="form-group" style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Annual Rental Yield</label>
                  <span style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 700 }}>{rentalYield}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="15" 
                  step="0.1"
                  value={rentalYield} 
                  onChange={(e) => setRentalYield(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                />
              </div>

              {/* Info Callout */}
              <button 
                type="button" 
                onClick={() => setShowExplanation(!showExplanation)}
                className="btn btn-secondary" 
                style={{ width: '100%', display: 'inline-flex', gap: '8px', fontSize: '0.8rem', padding: '10px' }}
              >
                <HelpCircle size={14} className="text-gold" /> {showExplanation ? 'Hide Calculation Details' : 'Show Calculation Details'}
              </button>
            </form>
          </div>

          {/* Right panel: Simulation Results */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '36px 32px', 
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '420px',
              position: 'relative'
            }}
          >
            {isSimulating ? (
              <div style={{ display: 'flex', flex1: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid rgba(212,175,55,0.1)', borderTopColor: 'var(--accent-gold)', animation: 'spin 1s linear infinite' }} />
                <span style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Computing projections...</span>
              </div>
            ) : results ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PROSPECTIVE NET ROI</span>
                      <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-headings)', fontWeight: 800, color: 'var(--accent-gold)', display: 'block', marginTop: '4px' }}>
                        {results.roiPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ArrowUpRight size={16} style={{ color: '#34d399', filter: 'drop-shadow(0 0 4px rgba(52, 211, 153, 0.4))' }} />
                      <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', textShadow: '0 0 10px rgba(52, 211, 153, 0.25)' }}>Forecast</span>
                    </div>
                  </div>

                  {/* Profit breakdown metrics */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '20px' }}>
                    <div className="premium-financial-row">
                      <span className="premium-financial-label">Future Asset Valuation:</span>
                      <span className="premium-financial-value neutral">{formatCurrency(results.finalValue)}</span>
                    </div>
                    <div className="premium-financial-row">
                      <span className="premium-financial-label">Gross Appreciation Gains:</span>
                      <span className="premium-financial-value positive">+{formatCurrency(results.grossAppreciation)}</span>
                    </div>
                    <div className="premium-financial-row">
                      <span className="premium-financial-label">Accumulated Rent Income:</span>
                      <span className="premium-financial-value positive">+{formatCurrency(results.cumulativeRent)}</span>
                    </div>
                    <div className="premium-financial-row">
                      <span className="premium-financial-label">Capital Gains Tax (15%):</span>
                      <span className="premium-financial-value negative">-{formatCurrency(results.capitalGainsTax)}</span>
                    </div>
                    <div className="premium-financial-row">
                      <span className="premium-financial-label">Overhead & Maintenance (20%):</span>
                      <span className="premium-financial-value negative">-{formatCurrency(results.maintenanceCost)}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ESTIMATED NET PROFIT</span>
                      <span className="premium-net-profit">
                        {formatCurrency(results.netProfit)}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      Term: {years} yrs
                    </span>
                  </div>
                </div>

                {/* Simulation explanation panel when visible */}
                {showExplanation && (
                  <div 
                    className="glass-panel animate-fade-in-up" 
                    style={{ 
                      position: 'absolute', 
                      top: '20px', 
                      left: '20px', 
                      right: '20px', 
                      bottom: '20px', 
                      borderRadius: '16px', 
                      padding: '24px', 
                      zIndex: 10,
                      background: 'rgba(10, 12, 16, 0.98)',
                      overflowY: 'auto',
                      border: '1px solid var(--border-color)',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Info size={16} className="text-gold" />
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Calculation Methodology</h4>
                      </div>
                      <button 
                        onClick={() => setShowExplanation(false)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <div>
                        <strong className="text-gold" style={{ display: 'block', marginBottom: '2px' }}>1. Compounding Capital Growth</strong>
                        Calculated year-over-year compounding on initial value:
                        <code style={{ display: 'block', padding: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', margin: '4px 0', fontFamily: 'monospace' }}>
                          V_t = Price * (1 + rate)^Years
                        </code>
                      </div>

                      <div>
                        <strong className="text-gold" style={{ display: 'block', marginBottom: '2px' }}>2. Accumulated Rental Yield</strong>
                        Calculated year-over-year based on the shifting valuation of the property:
                        <code style={{ display: 'block', padding: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', margin: '4px 0', fontFamily: 'monospace' }}>
                          Rent_t = V_t * YieldRate
                        </code>
                      </div>

                      <div>
                        <strong className="text-gold" style={{ display: 'block', marginBottom: '2px' }}>3. Tax & Overhead Allocations</strong>
                        - **Capital Gains Tax**: Assesses a flat 15% rate on the asset's raw growth.
                        - **Overhead Costs**: Deducts 20% from total gross rental income to account for maintenance, concierge service management, and occupancy insurance.
                      </div>

                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', display: 'flex', gap: '8px' }}>
                        <ShieldAlert size={28} className="text-gold" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          Disclaimer: The projections generated are for illustrative purposes and do not represent guaranteed cash flows.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flex1: 1, alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Select inputs to load projections.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

// Quick close button reference for inner modal details
function X({ size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
