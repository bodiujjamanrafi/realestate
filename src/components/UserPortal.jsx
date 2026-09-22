import { useState, useEffect } from 'react';
import { 
  X, Heart, ClipboardList, Home, LogOut, MapPin, Trash2, 
  User, FileText, CheckCircle, Upload, Calendar, 
  MessageSquare, Key, Phone, Check
} from 'lucide-react';

const ASSET_TYPES = ['Waterfront', 'Penthouse', 'Historic Estate', 'Modern Villa', 'Alpine Chalet', 'Private Island'];
const LOCATIONS = ['Beverly Hills', 'Aspen', 'Palm Beach', 'Manhattan', 'Monaco', 'Côte d\'Azur', 'London', 'Dubai'];

export default function UserPortal({ 
  isOpen, 
  onClose, 
  user, 
  onLogout, 
  favorites, 
  properties, 
  offers, 
  myListings, 
  onRemoveFavorite,
  onSelectProperty,
  receivedOffers = [],
  onUpdateOfferStatus,
  messages = [],
  onSendMessage,
  onUpdateUserProfile
}) {
  const [activeTab, setActiveTab] = useState('preferences');
  const [selectedThreadKey, setSelectedThreadKey] = useState(null);
  const [typedMessage, setTypedMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+1 (310) 890-4211',
    residence: user?.residence || 'Manhattan, New York',
    targetTypes: user?.targetTypes || ['Waterfront', 'Penthouse', 'Historic Estate'],
    targetLocations: user?.targetLocations || ['Beverly Hills', 'Aspen', 'Monaco', 'Manhattan'],
    targetRange: user?.targetRange || '$15M – $30M',
    strategy: user?.strategy || 'Legacy Preservation',
    offMarketAlerts: user?.offMarketAlerts ?? true,
    liaisonSms: user?.liaisonSms ?? true,
    confidentialBidding: user?.confidentialBidding ?? true,
    quarterlyBrief: user?.quarterlyBrief ?? false
  });

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        residence: user.residence || prev.residence,
        targetTypes: user.targetTypes || prev.targetTypes,
        targetLocations: user.targetLocations || prev.targetLocations,
        targetRange: user.targetRange || prev.targetRange,
        strategy: user.strategy || prev.strategy,
        offMarketAlerts: user.offMarketAlerts ?? prev.offMarketAlerts,
        liaisonSms: user.liaisonSms ?? prev.liaisonSms,
        confidentialBidding: user.confidentialBidding ?? prev.confidentialBidding,
        quarterlyBrief: user.quarterlyBrief ?? prev.quarterlyBrief
      }));
    }
  }, [user]);

  const toggleAssetType = (type) => {
    setProfileData(prev => {
      const exists = prev.targetTypes.includes(type);
      return {
        ...prev,
        targetTypes: exists ? prev.targetTypes.filter(t => t !== type) : [...prev.targetTypes, type]
      };
    });
  };

  const toggleLocation = (loc) => {
    setProfileData(prev => {
      const exists = prev.targetLocations.includes(loc);
      return {
        ...prev,
        targetLocations: exists ? prev.targetLocations.filter(l => l !== loc) : [...prev.targetLocations, loc]
      };
    });
  };

  const handleSavePreferences = (e) => {
    if (e) e.preventDefault();
    if (onUpdateUserProfile) {
      onUpdateUserProfile({
        name: profileData.name,
        phone: profileData.phone,
        residence: profileData.residence,
        targetTypes: profileData.targetTypes,
        targetLocations: profileData.targetLocations,
        targetRange: profileData.targetRange,
        strategy: profileData.strategy,
        offMarketAlerts: profileData.offMarketAlerts,
        liaisonSms: profileData.liaisonSms,
        confidentialBidding: profileData.confidentialBidding,
        quarterlyBrief: profileData.quarterlyBrief
      });
    }
    setSaveStatus('Preferences saved');
    setTimeout(() => setSaveStatus(''), 2500);
  };

  const [vaultDocs, setVaultDocs] = useState([
    { id: 1, name: 'accredited_investor_cert_2026.pdf', size: '1.2 MB', date: '06/20/2026', verified: true },
    { id: 2, name: 'proof_of_funds_sterling_holdings.pdf', size: '3.4 MB', date: '06/21/2026', verified: true },
    { id: 3, name: 'non_disclosure_agreement_signed.pdf', size: '0.8 MB', date: '06/22/2026', verified: true },
    { id: 4, name: 'kyc_passport_verification.pdf', size: '2.1 MB', date: '06/22/2026', verified: true }
  ]);

  if (!isOpen || !user) return null;

  // Retrieve actual property objects for favorited IDs
  const favoritedProperties = properties.filter(p => favorites.includes(p.id));

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    setUploadMessage('');
    
    setTimeout(() => {
      setUploading(false);
      const newDoc = {
        id: Date.now(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        verified: false
      };
      setVaultDocs([newDoc, ...vaultDocs]);
      setUploadMessage('Document uploaded securely to encrypted vault.');
    }, 1500);
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Profile picture size must be under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (onUpdateUserProfile) {
        onUpdateUserProfile({ image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleStartChat = (otherEmail, propId) => {
    setSelectedThreadKey(`${otherEmail}_${propId}`);
    setActiveTab('messages');
  };

  const receivedMessagesCount = messages.filter(m => m.receiver_email === user.email).length;

  const getThreads = () => {
    const threadsMap = {};
    messages.forEach(msg => {
      const otherUser = msg.sender_email === user.email ? msg.receiver_email : msg.sender_email;
      const propId = msg.property_id;
      const key = `${otherUser}_${propId}`;
      if (!threadsMap[key]) {
        threadsMap[key] = {
          otherUser,
          propertyId: propId,
          messages: []
        };
      }
      threadsMap[key].messages.push(msg);
    });
    return Object.values(threadsMap);
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
        className="glass-panel animate-fade-in-up user-portal-container"
        style={{
          width: '100%',
          maxWidth: '1000px', // Wider layout for multi-section dashboard
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-premium), var(--glow-gold)',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '320px 1fr', // Clean split columns
          maxHeight: '90vh',
          minHeight: '620px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Membership Card Details */}
        <div 
          className="user-portal-sidebar"
          style={{
            padding: '40px 32px',
            backgroundColor: 'rgba(24, 30, 41, 0.5)',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: '28px' }}>
              <span style={{ 
                fontFamily: 'var(--font-headings)', 
                fontWeight: 800, 
                fontSize: '1rem', 
                letterSpacing: '0.22em', 
                color: 'var(--accent-gold)' 
              }}>
                AURA CLUB
              </span>
            </div>

            {/* Profile Detail */}
            <div style={{ marginBottom: '24px' }}>
              <div 
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px'
                }}
                onClick={() => document.getElementById('profile-image-input').click()}
              >
                {user.image ? (
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, var(--accent-gold) 0%, #FFFFFF 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: 'var(--bg-primary)'
                  }}>
                    {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'AE'}
                  </div>
                )}
                {/* Upload Overlay on Hover */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  color: '#fff'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                >
                  <Upload size={16} />
                </div>
              </div>
              <input 
                id="profile-image-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleProfileImageUpload}
              />
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-headings)', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>
                {user.name}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.04em' }}>
                {user.tier}
              </p>
            </div>

            {/* Club Information - Organized 2x2 Layout */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '10px', 
              borderTop: '1px solid var(--border-color)', 
              paddingTop: '20px' 
            }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '3px' }}>ID</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{user.membershipId}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '3px' }}>Joined</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>{user.joinedDate}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '3px' }}>Status</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#34d399' }} /> Verified
                </span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '3px' }}>Limit</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)' }}>$25.0M</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <button 
            onClick={() => { onLogout(); onClose(); }}
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', marginTop: '36px', gap: '8px' }}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        {/* Right Side: Tab Contents */}
        <div className="user-portal-content" style={{ padding: '36px 32px', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
          {/* Close button inside Right Panel */}
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

          {/* Title Header */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Member Portal</span>
            <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-headings)', marginTop: '2px' }}>Investment Hub</h2>
          </div>

          {/* Navigation Tabs (Clean Pill Design) */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            borderBottom: '1px solid var(--border-color)', 
            paddingBottom: '14px', 
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'preferences', label: 'Preferences' },
              { id: 'favorites', label: `Saved (${favoritedProperties.length})` },
              { id: 'offers', label: `My Offers (${offers.length})` },
              { id: 'listings', label: `My Listings (${myListings.length})` },
              { id: 'messages', label: `VIP Inbox (${receivedMessagesCount})` },
              { id: 'vault', label: 'Document Vault' },
              { id: 'concierge', label: 'VIP Liaison' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: isActive ? 'var(--accent-gold)' : 'rgba(24, 30, 41, 0.5)',
                    color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--accent-gold)' : 'var(--border-color)',
                    padding: '6px 14px',
                    borderRadius: '16px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                  onMouseEnter={(e) => {
                    if(!isActive) {
                      e.currentTarget.style.borderColor = 'var(--accent-gold)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if(!isActive) {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab View Container */}
          <div style={{ flex: 1, minHeight: 0 }}>
            
            {/* TAB 1: PREFERENCES */}
            {activeTab === 'preferences' && (
              <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {/* Header Action Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                    Profile & Preferences
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {saveStatus && (
                      <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Check size={13} /> {saveStatus}
                      </span>
                    )}
                    <button
                      onClick={handleSavePreferences}
                      className="btn btn-primary"
                      style={{ padding: '6px 16px', fontSize: '0.75rem', fontWeight: 700, borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* Section 1: Personal & Contact */}
                <div style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  background: 'rgba(255, 255, 255, 0.015)', 
                  border: '1px solid var(--border-color)' 
                }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '12px' }}>
                    Personal Details
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)', marginBottom: '5px', fontWeight: 600 }}>Full Name</label>
                      <input 
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(10, 12, 16, 0.6)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '0.8rem',
                          color: 'var(--text-primary)',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)', marginBottom: '5px', fontWeight: 600 }}>Email Address</label>
                      <input 
                        type="email"
                        value={profileData.email}
                        disabled
                        style={{
                          width: '100%',
                          background: 'rgba(10, 12, 16, 0.3)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          cursor: 'not-allowed'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)', marginBottom: '5px', fontWeight: 600 }}>Direct Phone</label>
                      <input 
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        placeholder="+1 (310) 000-0000"
                        style={{
                          width: '100%',
                          background: 'rgba(10, 12, 16, 0.6)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '0.8rem',
                          color: 'var(--text-primary)',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)', marginBottom: '5px', fontWeight: 600 }}>Primary Residence</label>
                      <input 
                        type="text"
                        value={profileData.residence}
                        onChange={(e) => setProfileData({ ...profileData, residence: e.target.value })}
                        placeholder="City, Country"
                        style={{
                          width: '100%',
                          background: 'rgba(10, 12, 16, 0.6)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '0.8rem',
                          color: 'var(--text-primary)',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Portfolio & Acquisition Criteria */}
                <div style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  background: 'rgba(255, 255, 255, 0.015)', 
                  border: '1px solid var(--border-color)' 
                }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '12px' }}>
                    Acquisition Criteria
                  </div>

                  {/* Target Asset Types */}
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)', marginBottom: '7px', fontWeight: 600 }}>
                      Target Asset Types
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                      {ASSET_TYPES.map((type) => {
                        const isSelected = profileData.targetTypes.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleAssetType(type)}
                            style={{
                              background: isSelected ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                              color: isSelected ? 'var(--accent-gold)' : 'var(--text-secondary)',
                              border: '1px solid',
                              borderColor: isSelected ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.08)',
                              padding: '5px 12px',
                              borderRadius: '6px',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'var(--transition-fast)'
                            }}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Target Markets */}
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)', marginBottom: '7px', fontWeight: 600 }}>
                      Target Markets
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                      {LOCATIONS.map((loc) => {
                        const isSelected = profileData.targetLocations.includes(loc);
                        return (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => toggleLocation(loc)}
                            style={{
                              background: isSelected ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                              color: isSelected ? 'var(--accent-gold)' : 'var(--text-secondary)',
                              border: '1px solid',
                              borderColor: isSelected ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.08)',
                              padding: '5px 12px',
                              borderRadius: '6px',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'var(--transition-fast)'
                            }}
                          >
                            {loc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Range & Strategy 2-Column */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)', marginBottom: '5px', fontWeight: 600 }}>Allocation Range</label>
                      <select
                        value={profileData.targetRange}
                        onChange={(e) => setProfileData({ ...profileData, targetRange: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(10, 12, 16, 0.6)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '0.78rem',
                          color: 'var(--text-primary)',
                          outline: 'none'
                        }}
                      >
                        <option value="$5M – $15M">$5M – $15M USD</option>
                        <option value="$15M – $30M">$15M – $30M USD</option>
                        <option value="$30M – $75M">$30M – $75M USD</option>
                        <option value="$75M+">$75M+ Ultra-High Net</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)', marginBottom: '5px', fontWeight: 600 }}>Investment Strategy</label>
                      <select
                        value={profileData.strategy}
                        onChange={(e) => setProfileData({ ...profileData, strategy: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(10, 12, 16, 0.6)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '0.78rem',
                          color: 'var(--text-primary)',
                          outline: 'none'
                        }}
                      >
                        <option value="Legacy Preservation">Legacy Preservation</option>
                        <option value="Capital Appreciation">Capital Appreciation</option>
                        <option value="Primary Residence">Primary Residence</option>
                        <option value="Seasonal Portfolio">Seasonal Portfolio</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Financial Allocation & Status */}
                <div style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  background: 'rgba(255, 255, 255, 0.015)', 
                  border: '1px solid var(--border-color)' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                      Financial Allocation
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700 }}>
                      Reg D Tier 1 Accredited
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ background: 'rgba(10, 12, 16, 0.4)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>Buying Power</span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(25000000)}</span>
                    </div>
                    <div style={{ background: 'rgba(10, 12, 16, 0.4)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>Utilized Capital</span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{formatCurrency(4250000)}</span>
                    </div>
                    <div style={{ background: 'rgba(10, 12, 16, 0.4)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>Available Credit</span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{formatCurrency(20750000)}</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div style={{ width: '17%', height: '100%', borderRadius: '2px', background: 'var(--accent-gold)' }} />
                  </div>
                </div>

                {/* Section 4: Privacy & Notifications */}
                <div style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  background: 'rgba(255, 255, 255, 0.015)', 
                  border: '1px solid var(--border-color)' 
                }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '12px' }}>
                    Privacy & Notifications
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(10, 12, 16, 0.4)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div>
                        <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>Off-Market Alerts</span>
                        <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>Private pocket listings</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={profileData.offMarketAlerts}
                        onChange={(e) => setProfileData({ ...profileData, offMarketAlerts: e.target.checked })}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(10, 12, 16, 0.4)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div>
                        <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>Direct Liaison SMS</span>
                        <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>Priority advisor line</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={profileData.liaisonSms}
                        onChange={(e) => setProfileData({ ...profileData, liaisonSms: e.target.checked })}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(10, 12, 16, 0.4)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div>
                        <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>Confidential Bidding</span>
                        <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>Mask identity on initial LOI</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={profileData.confidentialBidding}
                        onChange={(e) => setProfileData({ ...profileData, confidentialBidding: e.target.checked })}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(10, 12, 16, 0.4)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div>
                        <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>Quarterly Brief</span>
                        <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>Private market intelligence</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={profileData.quarterlyBrief}
                        onChange={(e) => setProfileData({ ...profileData, quarterlyBrief: e.target.checked })}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                      />
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: SAVED HOMES */}
            {activeTab === 'favorites' && (
              <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto' }}>
                {favoritedProperties.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                    <Heart size={28} style={{ strokeWidth: 1, marginBottom: '12px' }} />
                    <p style={{ fontSize: '0.85rem' }}>No properties bookmarked yet.</p>
                  </div>
                ) : (
                  favoritedProperties.map(prop => (
                    <div 
                      key={prop.id} 
                      className="glass-panel"
                      style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '12px',
                        borderRadius: '12px',
                        alignItems: 'center',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)'
                      }}
                      onClick={() => { onSelectProperty(prop); onClose(); }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                    >
                      <img 
                        src={prop.image} 
                        alt={prop.title} 
                        style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} 
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '0.85rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{prop.title}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700 }}>{formatCurrency(prop.price)}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFavorite(prop.id);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '8px',
                          transition: 'var(--transition-smooth)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#fb7185'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: PLACED OFFERS */}
            {activeTab === 'offers' && (
              <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto' }}>
                {offers.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                    <ClipboardList size={28} style={{ strokeWidth: 1, marginBottom: '12px' }} />
                    <p style={{ fontSize: '0.85rem' }}>No offers submitted yet.</p>
                  </div>
                ) : (
                  offers.map(offer => (
                    <div 
                      key={offer.id} 
                      className="glass-panel"
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255,255,255,0.01)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 700 }}>{offer.propertyTitle}</h4>
                        <span className="badge badge-gold" style={{ fontSize: '0.65rem', borderLeftWidth: '2px', padding: '4px 10px' }}>{offer.status}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        <span>Offer Placed: <strong style={{ color: 'var(--text-primary)' }}>{formatCurrency(offer.offerPrice)}</strong></span>
                        <span>{offer.date}</span>
                      </div>
                      <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '0.65rem', gap: '4px', cursor: 'pointer' }}
                          onClick={() => {
                            const prop = properties.find(p => p.id === offer.propertyId);
                            if (prop && prop.owner_email) {
                              handleStartChat(prop.owner_email, offer.propertyId);
                            } else {
                              handleStartChat('admin@aura-estate.com', offer.propertyId);
                            }
                          }}
                        >
                          <MessageSquare size={10} /> Message Seller
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 4: LISTINGS */}
            {activeTab === 'listings' && (
              <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto' }}>
                {myListings.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                    <Home size={28} style={{ strokeWidth: 1, marginBottom: '12px' }} />
                    <p style={{ fontSize: '0.85rem' }}>You have not listed any properties for sale.</p>
                  </div>
                ) : (
                  myListings.map(listing => (
                    <div 
                      key={listing.id} 
                      className="glass-panel"
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255,255,255,0.01)',
                        marginBottom: '12px'
                      }}
                    >
                      <div 
                        style={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => { onSelectProperty(listing); onClose(); }}
                      >
                        <img 
                          src={listing.image} 
                          alt={listing.title} 
                          style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} 
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '0.85rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{listing.title}</h4>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700 }}>{formatCurrency(listing.price)}</span>
                            <span className="badge badge-green" style={{ fontSize: '0.55rem', padding: '2px 6px' }}>Active</span>
                          </div>
                        </div>
                      </div>

                      {/* Offers received on this listing */}
                      <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                        <h5 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '8px' }}>Received Offers</h5>
                        {receivedOffers.filter(off => off.propertyId === listing.id).length === 0 ? (
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>No offers received yet.</p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {receivedOffers.filter(off => off.propertyId === listing.id).map(offer => (
                              <div key={offer.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                  <strong>{formatCurrency(offer.offerPrice)}</strong>
                                  <span style={{ 
                                    color: offer.status === 'Accepted' ? '#34d399' : offer.status === 'Declined' ? '#f87171' : 'var(--accent-gold)',
                                    fontWeight: 700
                                  }}>{offer.status}</span>
                                </div>
                                <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                  By {offer.buyerName} ({offer.buyerEmail} • {offer.buyerPhone})
                                  {offer.buyerNotes && <div style={{ marginTop: '4px', fontStyle: 'italic' }}>"{offer.buyerNotes}"</div>}
                                </div>
                                {offer.status === 'Pending' && (
                                  <div style={{ display: 'flex', gap: '6px' }}>
                                    <button 
                                      className="btn btn-primary" 
                                      style={{ padding: '4px 8px', fontSize: '0.65rem', cursor: 'pointer' }}
                                      onClick={() => onUpdateOfferStatus(offer.id, 'Accepted')}
                                    >
                                      Accept Offer
                                    </button>
                                    <button 
                                      className="btn btn-secondary" 
                                      style={{ padding: '4px 8px', fontSize: '0.65rem', cursor: 'pointer' }}
                                      onClick={() => onUpdateOfferStatus(offer.id, 'Declined')}
                                    >
                                      Decline Offer
                                    </button>
                                    <button 
                                      className="btn btn-secondary" 
                                      style={{ padding: '4px 8px', fontSize: '0.65rem', gap: '4px', cursor: 'pointer' }}
                                      onClick={() => handleStartChat(offer.buyerEmail, listing.id)}
                                    >
                                      <MessageSquare size={10} /> Message Buyer
                                    </button>
                                  </div>
                                )}
                                {offer.status !== 'Pending' && (
                                  <button 
                                    className="btn btn-secondary" 
                                    style={{ padding: '4px 8px', fontSize: '0.65rem', gap: '4px', cursor: 'pointer' }}
                                    onClick={() => handleStartChat(offer.buyerEmail, listing.id)}
                                  >
                                    <MessageSquare size={10} /> Message Buyer
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 5: SECURE VAULT */}
            {activeTab === 'vault' && (
              <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '6px', color: 'var(--text-primary)' }}>Encrypted Document Vault</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Sovereign assets require strict regulatory documentation. Upload and manage your encrypted KYC credentials, NDAs, and proof of funds here.
                  </p>
                </div>

                {/* Secure Vault List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
                  {vaultDocs.map(doc => (
                    <div 
                      key={doc.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.01)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FileText size={18} style={{ color: 'var(--accent-gold)' }} />
                        <div>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', color: 'var(--text-primary)' }}>{doc.name}</span>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{doc.size} • Uploaded {doc.date}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: doc.verified ? '#34d399' : 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {doc.verified ? (
                          <><CheckCircle size={12} /> Verified</>
                        ) : (
                          'Reviewing...'
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Upload Button */}
                <div>
                  <label 
                    className="btn btn-secondary" 
                    style={{ 
                      width: '100%', 
                      fontSize: '0.8rem', 
                      gap: '8px', 
                      cursor: 'pointer',
                      borderStyle: 'dashed',
                      borderColor: 'rgba(212,175,55,0.3)',
                      background: 'rgba(212,175,55,0.02)'
                    }}
                  >
                    <Upload size={16} className={uploading ? 'animate-pulse' : ''} />
                    {uploading ? 'Securing document tunnel...' : 'Upload Encrypted Document'}
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg" 
                      onChange={handleFileUpload} 
                      style={{ display: 'none' }} 
                      disabled={uploading} 
                    />
                  </label>
                  
                  {uploadMessage && (
                    <p style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '8px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <CheckCircle size={12} /> {uploadMessage}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* TAB 7: MESSAGES / VIP INBOX */}
            {activeTab === 'messages' && (
              <div className="animate-fade-in-up portal-messages-layout" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '16px', height: '420px' }}>
                {/* Threads Sidebar */}
                <div className="portal-messages-sidebar" style={{ borderRight: '1px solid var(--border-color)', paddingRight: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '8px' }}>Liaisons</h4>
                  {getThreads().length === 0 ? (
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '20px' }}>No active message threads.</p>
                  ) : (
                    getThreads().map(thread => {
                      const prop = properties.find(p => p.id === thread.propertyId);
                      const key = `${thread.otherUser}_${thread.propertyId}`;
                      const isActive = selectedThreadKey === key;
                      return (
                        <div 
                          key={key}
                          onClick={() => setSelectedThreadKey(key)}
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            background: isActive ? 'rgba(212,175,55,0.08)' : 'rgba(255,255,255,0.01)',
                            border: `1px solid ${isActive ? 'var(--accent-gold)' : 'var(--border-color)'}`,
                            cursor: 'pointer',
                            transition: 'var(--transition-smooth)'
                          }}
                        >
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>{thread.otherUser}</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{prop ? prop.title : `Property #${thread.propertyId}`}</span>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Chat Panel */}
                <div className="portal-messages-chat" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
                  {selectedThreadKey ? (() => {
                    const [otherEmail, propIdStr] = selectedThreadKey.split('_');
                    const propId = Number(propIdStr);
                    const prop = properties.find(p => p.id === propId);
                    const threadMessages = messages.filter(m => 
                      m.property_id === propId && 
                      ((m.sender_email === user.email && m.receiver_email === otherEmail) || 
                       (m.sender_email === otherEmail && m.receiver_email === user.email))
                    );

                    return (
                      <>
                        {/* Thread Header */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '10px' }}>
                          {prop && (
                            <img src={prop.image} alt={prop.title} style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} />
                          )}
                          <div>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: 700 }}>{prop ? prop.title : `Property #${propId}`}</h4>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Chatting with {otherEmail}</span>
                          </div>
                        </div>

                        {/* Messages Feed */}
                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '6px', marginBottom: '10px' }}>
                          {threadMessages.map(msg => {
                            const isMe = msg.sender_email === user.email;
                            return (
                              <div 
                                key={msg.id}
                                style={{
                                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                                  maxWidth: '75%',
                                  padding: '8px 12px',
                                  borderRadius: '12px',
                                  background: isMe ? 'var(--accent-gold)' : 'rgba(255,255,255,0.05)',
                                  color: isMe ? 'var(--bg-primary)' : 'var(--text-primary)',
                                  fontSize: '0.75rem',
                                  lineHeight: 1.4,
                                  boxShadow: isMe ? '0 0 10px rgba(212,175,55,0.1)' : 'none'
                                }}
                              >
                                {msg.content}
                              </div>
                            );
                          })}
                        </div>

                        {/* Input Area */}
                        <form 
                          onSubmit={async (e) => {
                            e.preventDefault();
                            if (!typedMessage.trim()) return;
                            if (onSendMessage) {
                              await onSendMessage(otherEmail, propId, typedMessage);
                            }
                            setTypedMessage('');
                          }}
                          style={{ display: 'flex', gap: '8px' }}
                        >
                          <input 
                            type="text"
                            placeholder="Type an encrypted message..."
                            value={typedMessage}
                            onChange={(e) => setTypedMessage(e.target.value)}
                            style={{
                              flex: 1,
                              background: 'rgba(0,0,0,0.3)',
                              border: '1px solid var(--border-color)',
                              borderRadius: '8px',
                              padding: '8px 12px',
                              fontSize: '0.75rem',
                              color: 'var(--text-primary)'
                            }}
                          />
                          <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.75rem', cursor: 'pointer' }}>Send</button>
                        </form>
                      </>
                    );
                  })() : (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      <MessageSquare size={36} style={{ strokeWidth: 1, marginBottom: '12px' }} />
                      <p style={{ fontSize: '0.8rem' }}>Select a VIP liaison thread from the sidebar to chat.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 6: CONCIERGE LIAISON */}
            {activeTab === 'concierge' && (
              <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '6px', color: 'var(--text-primary)' }}>Personal Liaison Specialist</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    As an Aura Club member, you have 24/7 priority access to a designated private wealth acquisition director.
                  </p>
                </div>

                {/* Liaison Card */}
                <div 
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.01) 100%)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'var(--accent-gold)',
                      color: 'var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      fontWeight: 800
                    }}
                  >
                    AS
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Alexander Sterling</h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>Acquisition Liaison Director</span>
                    <span style={{ fontSize: '0.65rem', color: '#34d399', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#34d399' }} /> Priority Direct Channel Active
                    </span>
                  </div>
                </div>

                {/* Liaison Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button 
                    onClick={() => alert('Encrypted secure liaison line opened. Call connecting shortly.')}
                    className="btn btn-secondary" 
                    style={{ fontSize: '0.75rem', gap: '6px', padding: '10px' }}
                  >
                    <Phone size={14} /> Call Secure Line
                  </button>
                  <button 
                    onClick={() => alert('VIP concierge chat window initiated.')}
                    className="btn btn-secondary" 
                    style={{ fontSize: '0.75rem', gap: '6px', padding: '10px' }}
                  >
                    <MessageSquare size={14} /> Encrypted Chat
                  </button>
                </div>

                {/* Upcoming Showings */}
                <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                    <Calendar size={12} /> Scheduled VIP Private Showings
                  </span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '6px' }}>
                      <span>Malibu Waterfront Duplex</span>
                      <strong style={{ color: 'var(--accent-gold)' }}>July 15, 2:00 PM</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Manhattan Penthouse Viewings</span>
                      <strong style={{ color: 'var(--accent-gold)' }}>July 22, 11:30 AM</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
