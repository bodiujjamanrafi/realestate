import { useState, useEffect } from 'react';
import { X, DollarSign, ShieldCheck, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BuyModal({ isOpen, property, onClose, onOfferPlaced }) {
  const [offerPrice, setOfferPrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('mortgage'); // 'mortgage' | 'cash'
  const [interestRate, setInterestRate] = useState(5.5); // standard mock luxury rate %
  const [loanTerm, setLoanTerm] = useState(30); // years
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (property) {
      setOfferPrice(property.price);
      setDownPayment(Math.round(property.price * 0.20)); // 20% default down payment
    }
  }, [property]);

  if (!isOpen || !property) return null;

  // Calculate mortgage values
  const loanAmount = Math.max(0, offerPrice - downPayment);
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = loanTerm * 12;
  
  let monthlyPayment = 0;
  if (paymentMethod === 'mortgage' && loanAmount > 0 && monthlyRate > 0) {
    monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                     (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (offerPrice <= 0) return;

    setIsSubmitting(true);

    // Simulate luxury legal clearing
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);

      // Confetti celebration!
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#FFFFFF', '#C5A85C', '#181E29']
      });

      const newOffer = {
        id: 'OF-' + Math.floor(100000 + Math.random() * 900000),
        propertyId: property.id,
        propertyTitle: property.title,
        propertyImage: property.image,
        propertyPrice: property.price,
        location: property.location,
        offerAmount: offerPrice,
        paymentMethod,
        downPayment: paymentMethod === 'mortgage' ? downPayment : offerPrice,
        status: 'Under Review',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      if (onOfferPlaced) {
        onOfferPlaced(newOffer);
      }
    }, 1500);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(5, 6, 8, 0.95)',
        backdropFilter: 'blur(16px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        className="glass-panel animate-fade-in-up"
        style={{
          width: '100%',
          maxWidth: '650px',
          borderRadius: '24px',
          overflowY: 'auto',
          maxHeight: '90vh',
          boxShadow: 'var(--shadow-premium), var(--glow-gold)',
          position: 'relative',
          padding: '40px 32px'
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
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '50%',
            transition: 'var(--transition-smooth)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <X size={20} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div 
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}
            >
              <CheckCircle2 size={36} className="text-gold" />
            </div>
            <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-headings)', marginBottom: '16px' }} className="text-gold-gradient">
              Offer Registered
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 24px', fontSize: '0.95rem' }}>
              Your formal acquisition request for <strong>{property.title}</strong> has been transmitted to our escrow partner and the property trustees.
            </p>
            <div 
              className="glass-panel" 
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(24, 30, 41, 0.3)',
                maxWidth: '400px',
                margin: '0 auto 32px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Offer Amount</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{formatCurrency(offerPrice)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Funding Type</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'capitalize' }}>{paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Escrow Clearing</span>
                <span style={{ fontSize: '0.9rem', color: '#4ade80', fontWeight: 600 }}>Under Review</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={onClose} style={{ minWidth: '160px' }}>
              Back to Showroom
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <span className="badge badge-gold" style={{ marginBottom: '10px' }}>Acquisition Portal</span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-headings)' }}>
                Place Acquisition Offer
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Submit a premium purchasing proposal for <strong>{property.title}</strong>.
              </p>
            </div>

            {/* Price Offer Input */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Your Offer Amount ($ USD)</label>
              <div style={{ position: 'relative' }}>
                <DollarSign size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }} />
                <input
                  type="number"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '44px', fontWeight: 700, color: 'var(--accent-gold)' }}
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value))}
                  min={Math.round(property.price * 0.7)} // minimum 70% of list price
                  required
                />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                List Price: {formatCurrency(property.price)} (Offers below 70% are automatically screened out)
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Payment Structure</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mortgage')}
                  style={{
                    flex: 1,
                    background: paymentMethod === 'mortgage' ? 'rgba(212, 175, 55, 0.12)' : 'rgba(10, 12, 16, 0.3)',
                    border: '1px solid',
                    borderColor: paymentMethod === 'mortgage' ? 'var(--accent-gold)' : 'var(--border-color)',
                    color: paymentMethod === 'mortgage' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    padding: '12px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  Conventional Financing
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  style={{
                    flex: 1,
                    background: paymentMethod === 'cash' ? 'rgba(212, 175, 55, 0.12)' : 'rgba(10, 12, 16, 0.3)',
                    border: '1px solid',
                    borderColor: paymentMethod === 'cash' ? 'var(--accent-gold)' : 'var(--border-color)',
                    color: paymentMethod === 'cash' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    padding: '12px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  All-Cash / Liquidation Transfer
                </button>
              </div>
            </div>

            {/* Mortgage Calculator Panel */}
            {paymentMethod === 'mortgage' && (
              <div 
                className="glass-panel"
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'rgba(10, 12, 16, 0.4)',
                  marginBottom: '24px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Calculator size={16} className="text-gold" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Financing Breakdown
                  </span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.7rem' }}>Down Payment ($)</label>
                    <input
                      type="number"
                      className="form-input"
                      style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      max={offerPrice}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.7rem' }}>Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-input"
                      style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Principal Loan Amount:</span>
                    <span style={{ fontWeight: 600 }}>{formatCurrency(loanAmount)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Term Length:</span>
                    <span style={{ fontWeight: 600 }}>{loanTerm} Years (Fixed)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', borderTop: '1px dashed rgba(212,175,55,0.2)', paddingTop: '8px', marginTop: '4px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>Est. Monthly Payment:</span>
                    <span style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>{formatCurrency(monthlyPayment)}/mo</span>
                  </div>
                </div>
              </div>
            )}

            {/* Note to Trustees */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Message to Trustees / Seller (Optional)</label>
              <textarea
                className="form-input"
                style={{ width: '100%', minHeight: '80px', resize: 'vertical' }}
                placeholder="Include proof of funds statements or specific custom requests..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* Guarantee and Submit */}
            <div 
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(212,175,55,0.04)',
                border: '1px solid rgba(212,175,55,0.1)',
                marginBottom: '24px'
              }}
            >
              <ShieldCheck size={28} className="text-gold" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                By submitting this proposal, you authorize Aura Estates' designated escrow agent to file a purchase reservation note. This represents a binding request.
              </p>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', height: '50px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Transmitting Escrow Request...' : 'Lock Purchase Offer'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
