import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Plus, Check, Image, Home, Info, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SellFormModal({ isOpen, onClose, onPropertyListed }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('Manhattan');
  const [type, setType] = useState('Villa');
  const [description, setDescription] = useState('');
  const [beds, setBeds] = useState(3);
  const [baths, setBaths] = useState(3.5);
  const [sqft, setSqft] = useState(5000);
  const [tag, setTag] = useState('Private Listing');
  const [image, setImage] = useState('');
  
  // Available premium amenities
  const availableAmenities = [
    'Private Helipad Access',
    'Infinity Glass-Sided Pool',
    'Zero-Edge Reflection Pools',
    '150-ft Yacht Docking Slip',
    'Professional Wellness Hammam',
    'Glass Elevator',
    'Subterranean Car Gallery',
    'Fully Integrated Smart Home',
    'Professional Cigar Humidor',
    'Private Cinema Room',
    'Eco-Friendly Geothermal HVAC'
  ];
  
  const [selectedAmenities, setSelectedAmenities] = useState([
    'Fully Integrated Smart Home',
    'Infinity Glass-Sided Pool'
  ]);

  if (!isOpen) return null;

  const toggleAmenity = (name) => {
    setSelectedAmenities(prev => 
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !description) return;

    // Use default premium stock image if empty
    const finalImage = image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

    const newProperty = {
      id: Date.now(), // timestamp ID
      title,
      price: Number(price),
      beds: Number(beds),
      baths: Number(baths),
      sqft: Number(sqft),
      location,
      type,
      image: finalImage,
      tag: tag || 'Newly Listed',
      description,
      amenities: selectedAmenities
    };

    if (onPropertyListed) {
      onPropertyListed(newProperty);
    }

    // Success Confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFFFFF', '#C5A85C']
    });

    // Reset Form
    setTitle('');
    setPrice('');
    setLocation('Manhattan');
    setType('Villa');
    setDescription('');
    setBeds(3);
    setBaths(3.5);
    setSqft(5000);
    setTag('Private Listing');
    setImage('');
    setSelectedAmenities(['Fully Integrated Smart Home', 'Infinity Glass-Sided Pool']);
    setStep(1);
    onClose();
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
          maxWidth: '700px',
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

        {/* Wizard Progress Bar */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span className="badge badge-gold">List New Property</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Step {step} of 4</span>
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', display: 'flex' }}>
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s} 
                style={{ 
                  flex: 1, 
                  height: '100%', 
                  background: s <= step ? 'var(--accent-gold)' : 'transparent',
                  transition: 'background-color 0.3s ease',
                  borderRadius: '2px'
                }} 
              />
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-headings)', marginBottom: '20px', color: 'var(--accent-gold)' }}>
                Step 1: Property Foundation
              </h3>
              
              <div className="form-group">
                <label className="form-label">Property Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. The Sapphire Crest Mansion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Listing Price ($ USD)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="12000000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Property Type</label>
                  <select 
                    className="form-input"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Villa">Villa & Estate</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Island">Private Island</option>
                    <option value="Iconic">Architectural Icon</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Location / City</label>
                <select 
                  className="form-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="Manhattan">Manhattan, NY</option>
                  <option value="Beverly Hills">Beverly Hills, CA</option>
                  <option value="Miami Beach">Miami Beach, FL</option>
                  <option value="Aspen">Aspen, CO</option>
                  <option value="Malibu">Malibu, CA</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description Summary</label>
                <textarea 
                  className="form-input" 
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  placeholder="Describe the architectural design, security details, and custom materials..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required 
                />
              </div>
            </div>
          )}

          {/* STEP 2: Building Specs */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-headings)', marginBottom: '20px', color: 'var(--accent-gold)' }}>
                Step 2: Structural Specifications
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Bedrooms</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={beds}
                    onChange={(e) => setBeds(Number(e.target.value))}
                    min={1} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Bathrooms</label>
                  <input 
                    type="number" 
                    step="0.5"
                    className="form-input" 
                    value={baths}
                    onChange={(e) => setBaths(Number(e.target.value))}
                    min={1} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Total Sq Ft</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    min={100} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Marketing Tagline Badge</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Masterpiece Villa, Deepwater Access"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Amenities & Media */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-headings)', marginBottom: '20px', color: 'var(--accent-gold)' }}>
                Step 3: Signature Amenities & Media
              </h3>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Showcase Image URL</label>
                <div style={{ position: 'relative' }}>
                  <Image size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="url" 
                    className="form-input" 
                    placeholder="https://images.unsplash.com/photo-..."
                    style={{ width: '100%', paddingLeft: '44px' }}
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Leave blank to auto-generate a premium, royalty-free luxury photograph.
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Select Elite Amenities</label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '12px',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  background: 'rgba(10, 12, 16, 0.4)',
                  border: '1px solid var(--border-color)',
                  padding: '16px',
                  borderRadius: '12px'
                }}>
                  {availableAmenities.map(name => {
                    const isChecked = selectedAmenities.includes(name);
                    return (
                      <div 
                        key={name}
                        onClick={() => toggleAmenity(name)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)'
                        }}
                      >
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: isChecked ? 'var(--accent-gold)' : 'var(--border-color)',
                          backgroundColor: isChecked ? 'var(--accent-gold)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {isChecked && <Check size={12} style={{ color: 'var(--bg-primary)' }} />}
                        </div>
                        {name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review and Submit */}
          {step === 4 && (
            <div className="animate-fade-in-up">
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-headings)', marginBottom: '20px', color: 'var(--accent-gold)' }}>
                Step 4: Escrow & Legal Verification
              </h3>

              <div 
                className="glass-panel"
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'rgba(24, 30, 41, 0.3)',
                  marginBottom: '24px'
                }}
              >
                <h4 style={{ fontSize: '1rem', marginBottom: '12px', fontFamily: 'var(--font-headings)' }}>{title || 'Untitled Residence'}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {description || 'No description provided.'}
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Location: </span>
                    <strong>{location}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Asking Price: </span>
                    <strong className="text-gold">${Number(price).toLocaleString()}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Structural Layout: </span>
                    <strong>{beds} Beds / {baths} Baths / {sqft.toLocaleString()} sqft</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Amenities Listed: </span>
                    <strong>{selectedAmenities.length} selected</strong>
                  </div>
                </div>
              </div>

              <div 
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(212, 175, 55, 0.04)',
                  border: '1px solid rgba(212, 175, 55, 0.1)',
                  marginBottom: '24px'
                }}
              >
                <ShieldCheck size={28} className="text-gold" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                  By clicking Publish, you confirm that you are the lawful legal representative or owner of this property estate and hold escrow clearance rights.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            {step > 1 ? (
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handlePrev}
                style={{ gap: '8px' }}
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <div /> // dummy space
            )}

            {step < 4 ? (
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleNext}
                style={{ gap: '8px' }}
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ gap: '8px' }}
              >
                Publish Listing <Check size={16} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
