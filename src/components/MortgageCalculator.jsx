import { useState, useMemo } from 'react';
import { Calculator, ShieldCheck } from 'lucide-react';

export default function MortgageCalculator() {
  const [price, setPrice] = useState(15000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(30);

  // Computations
  const calculations = useMemo(() => {
    const downPaymentAmount = price * (downPaymentPercent / 100);
    const loanAmount = price - downPaymentAmount;
    
    const monthlyRate = (interestRate / 12) / 100;
    const totalPayments = loanTerm * 12;
    
    const principalAndInterest = monthlyRate === 0
      ? loanAmount / totalPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
        (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const monthlyTaxes = (price * 0.012) / 12; // 1.2% annual tax
    const monthlyInsurance = (price * 0.0015) / 12; // 0.15% annual insurance
    const monthlyHOA = 1250; // luxury flat HOA fee
    
    const totalMonthly = principalAndInterest + monthlyTaxes + monthlyInsurance + monthlyHOA;

    return {
      downPaymentAmount,
      loanAmount,
      principalAndInterest,
      monthlyTaxes,
      monthlyInsurance,
      monthlyHOA,
      totalMonthly
    };
  }, [price, downPaymentPercent, interestRate, loanTerm]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Percentages for breakdown bar
  const pniPercent = (calculations.principalAndInterest / calculations.totalMonthly) * 100;
  const taxPercent = (calculations.monthlyTaxes / calculations.totalMonthly) * 100;
  const insPercent = (calculations.monthlyInsurance / calculations.totalMonthly) * 100;
  const hoaPercent = (calculations.monthlyHOA / calculations.totalMonthly) * 100;

  return (
    <section 
      id="mortgage" 
      className="section-padding" 
      style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="container">
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Financial Planning</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '16px', fontFamily: 'var(--font-headings)' }}>
            Mortgage <span className="text-gold">Simulator</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Calculate your estimated monthly payments for luxury estates with customizable interest rates and terms.
          </p>
        </div>

        {/* Simulator Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '40px',
            alignItems: 'start'
          }}
        >
          {/* Sliders Panel */}
          <div 
            className="glass-panel" 
            style={{
              padding: '40px 32px',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              textAlign: 'left'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-headings)' }}>
              <Calculator className="text-gold" size={20} /> Parameters
            </h3>

            {/* Slider: Price */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Property Value</label>
                <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{formatCurrency(price)}</span>
              </div>
              <input
                type="range"
                min={1000000}
                max={50000000}
                step={500000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--accent-gold)',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>$1M</span>
                <span>$50M</span>
              </div>
            </div>

            {/* Slider: Down Payment */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Down Payment</label>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  {downPaymentPercent}% ({formatCurrency(calculations.downPaymentAmount)})
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                step={1}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--accent-gold)',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>5%</span>
                <span>60%</span>
              </div>
            </div>

            {/* Slider: Interest Rate */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Annual Interest Rate</label>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{interestRate}%</span>
              </div>
              <input
                type="range"
                min={2.0}
                max={12.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--accent-gold)',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>2%</span>
                <span>12%</span>
              </div>
            </div>

            {/* Selector: Loan Term */}
            <div>
              <label className="form-label" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '10px' }}>Loan Term</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[15, 30].map((term) => (
                  <button
                    key={term}
                    onClick={() => setLoanTerm(term)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '8px',
                      background: loanTerm === term ? 'var(--accent-gold)' : 'rgba(10, 12, 16, 0.4)',
                      color: loanTerm === term ? 'var(--bg-primary)' : 'var(--text-primary)',
                      border: '1px solid',
                      borderColor: loanTerm === term ? 'var(--accent-gold)' : 'var(--border-color)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    {term} Years Fixed
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results & Visual Breakdown */}
          <div 
            className="glass-panel" 
            style={{
              padding: '40px 32px',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              textAlign: 'left'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>ESTIMATED MONTHLY PAYMENT</span>
              <div 
                style={{ 
                  fontSize: '3rem', 
                  fontFamily: 'var(--font-headings)', 
                  fontWeight: 800, 
                  color: 'var(--accent-gold)', 
                  margin: '12px 0 24px' 
                }}
              >
                {formatCurrency(calculations.totalMonthly)}
              </div>
            </div>

            {/* Dynamic Segmented Chart Bar */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${pniPercent}%`, backgroundColor: 'var(--accent-gold)' }} title="P&I" />
                <div style={{ width: `${taxPercent}%`, backgroundColor: '#475569' }} title="Taxes" />
                <div style={{ width: `${insPercent}%`, backgroundColor: '#C5A85C' }} title="Insurance" />
                <div style={{ width: `${hoaPercent}%`, backgroundColor: '#1E293B' }} title="HOA" />
              </div>
            </div>

            {/* Calculations List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Principal & Interest */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Principal & Interest</span>
                </div>
                <span style={{ fontWeight: 700 }}>{formatCurrency(calculations.principalAndInterest)}</span>
              </div>

              {/* Taxes */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#475569' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Property Taxes (Est.)</span>
                </div>
                <span style={{ fontWeight: 700 }}>{formatCurrency(calculations.monthlyTaxes)}</span>
              </div>

              {/* Insurance */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#C5A85C' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Homeowners Insurance</span>
                </div>
                <span style={{ fontWeight: 700 }}>{formatCurrency(calculations.monthlyInsurance)}</span>
              </div>

              {/* HOA Fees */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#1E293B' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Luxury HOA Dues</span>
                </div>
                <span style={{ fontWeight: 700 }}>{formatCurrency(calculations.monthlyHOA)}</span>
              </div>
            </div>

            {/* Note banner */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.15)',
                padding: '16px',
                borderRadius: '12px',
                marginTop: '36px'
              }}
            >
              <ShieldCheck className="text-gold" size={24} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                This is a simulator tool. Rates and down payment values vary depending on institutional underwriters. Consult our financial ambassadors for structured portfolios.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
