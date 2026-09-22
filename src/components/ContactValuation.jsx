import { useState } from 'react';
import { Sparkles, Calculator, Send, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactValuation() {
  // Valuation State
  const [valLocation, setValLocation] = useState('Beverly Hills');
  const [valSqft, setValSqft] = useState(5000);
  const [valBeds, setValBeds] = useState(4);
  const [valPool, setValPool] = useState(false);
  const [valSmart, setValSmart] = useState(false);
  const [valHeli, setValHeli] = useState(false);
  const [valBeach, setValBeach] = useState(false);
  const [valWine, setValWine] = useState(false);
  const [estimatedValuation, setEstimatedValuation] = useState(null);

  // General Inquiry State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactInterest, setContactInterest] = useState('Buy');
  const [contactMsg, setContactMsg] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Valuation math
  const handleCalculateValuation = (e) => {
    e.preventDefault();
    
    // Rates per sqft
    const rates = {
      'Beverly Hills': 2400,
      'Miami Beach': 2100,
      'Aspen': 2900,
      'Malibu': 3100,
      'Manhattan': 2750
    };

    const baseRate = rates[valLocation] || 2000;
    let computedValue = baseRate * valSqft;

    // Bed addition
    computedValue += valBeds * 150000;

    // Upgrades
    if (valPool) computedValue += 600000;
    if (valSmart) computedValue += 250000;
    if (valWine) computedValue += 400000;
    if (valHeli) computedValue += 2200000;
    if (valBeach) computedValue += 4500000;

    // Confetti celebration
    confetti({
      particleCount: 160,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#FFFFFF', '#C5A85C']
    });

    setEstimatedValuation(computedValue);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;

    confetti({
      particleCount: 100,
      spread: 50,
      origin: { y: 0.85 },
      colors: ['#D4AF37', '#FFFFFF']
    });

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'testsmtp590@gmail.com',
          subject: 'New Inquiry - Aura Estates',
          text: `You have received a new inquiry on Aura Estates:\n\nName: ${contactName}\nEmail: ${contactEmail}\nInterest: ${contactInterest}\nMessage/Details: ${contactMsg}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #D4AF37; border-radius: 8px;">
              <h2 style="color: #D4AF37; border-bottom: 1px solid #D4AF37; padding-bottom: 10px;">New Client Inquiry - Aura Estates</h2>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${contactName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${contactEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Interest Type:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${contactInterest}</td>
                </tr>
              </table>
              <p><strong>Message / Request Details:</strong></p>
              <blockquote style="background: #f9f9f9; border-left: 5px solid #D4AF37; padding: 10px 15px; margin: 15px 0; font-style: italic;">
                ${contactMsg || 'No message provided.'}
              </blockquote>
              <p style="font-size: 0.85em; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
                This inquiry was submitted via the Aura Estates Ambassador Contact & Valuation Form.
              </p>
            </div>
          `
        })
      });
    } catch (err) {
      console.error('Error sending contact inquiry email:', err);
    }

    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }, 6000);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section 
      id="contact" 
      className="section-padding" 
      style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', position: 'relative' }}
    >
      <div className="container">
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Clearance & Valuations</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '16px', fontFamily: 'var(--font-headings)' }}>
            Ambassador <span className="text-gold">Valuation & Contact</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Request an instant digital valuation of your luxury assets, or schedule a physical private flight clearance tour.
          </p>
        </div>

        {/* Dynamic Forms Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '40px',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Valuation Estimator */}
          <div 
            className="glass-panel"
            style={{
              padding: '40px 32px',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              textAlign: 'left'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-headings)' }}>
              <Calculator className="text-gold" size={20} /> Instant Digital Valuation
            </h3>

            {estimatedValuation !== null ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  ESTIMATED LIQUID ASSET VALUE
                </span>
                
                <div 
                  style={{ 
                    fontSize: '2.5rem', 
                    fontFamily: 'var(--font-headings)', 
                    fontWeight: 800, 
                    color: 'var(--accent-gold)', 
                    margin: '12px 0 20px' 
                  }}
                >
                  {formatCurrency(estimatedValuation)}
                </div>

                <div 
                  style={{ 
                    background: 'rgba(212,175,55,0.04)', 
                    border: '1px solid rgba(212,175,55,0.12)', 
                    padding: '16px', 
                    borderRadius: '12px', 
                    fontSize: '0.8rem', 
                    color: 'var(--text-secondary)', 
                    marginBottom: '24px',
                    textAlign: 'left',
                    lineHeight: '1.5'
                  }}
                >
                  This calculation leverages a dynamic luxury-index algorithm based on prime coastal/metro sales. To compile a formal, institutional prospectus, please secure an onsite physical audit.
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      setContactInterest('Joint Venture / Sale');
                      setContactMsg(`Requesting official ambassador audit for property located in ${valLocation}. Estimated initial valuation: ${formatCurrency(estimatedValuation)}.`);
                      // Scroll to contact form if mobile, or just let them look at the right side
                      const rightForm = document.getElementById('contact-form-section');
                      if (rightForm) rightForm.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ flex: 1, fontSize: '0.8rem' }}
                  >
                    Request Physical Audit
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => setEstimatedValuation(null)}
                    style={{ flex: 1, fontSize: '0.8rem' }}
                  >
                    Recalculate Value
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCalculateValuation}>
                {/* Location Select */}
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Asset Location</label>
                  <select 
                    className="form-input" 
                    value={valLocation}
                    onChange={(e) => setValLocation(e.target.value)}
                    style={{ appearance: 'none', WebkitAppearance: 'none' }}
                  >
                    <option value="Beverly Hills">Beverly Hills, CA</option>
                    <option value="Miami Beach">Miami Beach, FL</option>
                    <option value="Aspen">Aspen, CO</option>
                    <option value="Malibu">Malibu, CA</option>
                    <option value="Manhattan">Manhattan, NY</option>
                  </select>
                </div>

                {/* Size inputs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Interior Size (Sq Ft)</label>
                    <input
                      type="number"
                      required
                      min={1000}
                      max={80000}
                      className="form-input"
                      value={valSqft}
                      onChange={(e) => setValSqft(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Bedrooms</label>
                    <select 
                      className="form-input" 
                      value={valBeds}
                      onChange={(e) => setValBeds(Number(e.target.value))}
                      style={{ appearance: 'none', WebkitAppearance: 'none' }}
                    >
                      {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={n}>{n} Bedrooms</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Checklist options */}
                <div style={{ margin: '20px 0' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '12px', fontSize: '0.75rem' }}>Luxury Specifications</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input 
                        type="checkbox" 
                        checked={valPool}
                        onChange={(e) => setValPool(e.target.checked)}
                        style={{ accentColor: 'var(--accent-gold)', width: '16px', height: '16px' }}
                      />
                      Infinity Pool / Water Canopy (+$600k)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input 
                        type="checkbox" 
                        checked={valSmart} 
                        onChange={(e) => setValSmart(e.target.checked)}
                        style={{ accentColor: 'var(--accent-gold)', width: '16px', height: '16px' }}
                      />
                      Military-Grade Cyber Security & Automation (+$250k)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input 
                        type="checkbox" 
                        checked={valWine} 
                        onChange={(e) => setValWine(e.target.checked)}
                        style={{ accentColor: 'var(--accent-gold)', width: '16px', height: '16px' }}
                      />
                      Sommelier Cellar & Cigar Vault (+$400k)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input 
                        type="checkbox" 
                        checked={valHeli} 
                        onChange={(e) => setValHeli(e.target.checked)}
                        style={{ accentColor: 'var(--accent-gold)', width: '16px', height: '16px' }}
                      />
                      Helipad Clearance Landing Zone (+$2.2M)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input 
                        type="checkbox" 
                        checked={valBeach} 
                        onChange={(e) => setValBeach(e.target.checked)}
                        style={{ accentColor: 'var(--accent-gold)', width: '16px', height: '16px' }}
                      />
                      Direct Beachfront / Coast Access (+$4.5M)
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                >
                  <Sparkles size={16} />
                  Calculate Valuation
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div 
            id="contact-form-section"
            className="glass-panel"
            style={{
              padding: '40px 32px',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              textAlign: 'left'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-headings)' }}>
              <Send className="text-gold" size={20} /> Ambassador Consultation
            </h3>

            {inquirySubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 55, 0.12)',
                    border: '2px solid var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}
                >
                  <Award size={28} className="text-gold" />
                </div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '10px', fontFamily: 'var(--font-headings)' }}>Clearance Submitted</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Thank you, <strong>{contactName}</strong>. Your profile portfolio request is queued. An advisor will contact you to establish secure communication.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sterling Archer"
                      className="form-input"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sterling@isis.org"
                      className="form-input"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Primary Interest</label>
                  <select 
                    className="form-input"
                    value={contactInterest}
                    onChange={(e) => setContactInterest(e.target.value)}
                    style={{ appearance: 'none', WebkitAppearance: 'none' }}
                  >
                    <option value="Buy">Acquiring Luxury Residences</option>
                    <option value="Rent">Leasing Premium Estates</option>
                    <option value="Joint Venture / Sale">Liquidation / Joint Ventures</option>
                    <option value="Private Placement">Private Placement Inquiries</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Message Details</label>
                  <textarea
                    rows={4}
                    placeholder="Provide details about your scheduling timeline, portfolio preferences, or NDA requirements."
                    className="form-input"
                    style={{ resize: 'none', fontFamily: 'var(--font-body)' }}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                >
                  <Send size={16} />
                  Initiate Secure Clearance
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
