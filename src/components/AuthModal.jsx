import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Compass } from 'lucide-react';
import LottieImport from 'lottie-react';
import googleAnimation from '../animation-original (4).json';
import { auth, googleProvider, signInWithPopup } from '../firebase';

const Lottie = LottieImport.default || LottieImport;

export default function AuthModal({ isOpen, onClose, onLogin, isMandatory = false }) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (activeTab === 'signup' && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      const cleanEmail = email.trim();
      const derivedName = name.trim() || cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const idSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();

      const authenticatedUser = {
        email: cleanEmail,
        name: derivedName,
        uid: 'user_' + idSuffix.toLowerCase(),
        membershipId: 'AE-' + idSuffix,
        tier: activeTab === 'signup' ? 'Aura Sovereign Club Member' : 'Aura Elite Club Member',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        image: null
      };

      setIsLoading(false);
      onLogin(authenticatedUser);
      if (onClose) onClose();
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred while entering. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result && result.user) {
        const u = result.user;
        const mappedUser = {
          email: u.email || '',
          name: u.displayName || (u.email ? u.email.split('@')[0] : 'Member'),
          uid: u.uid,
          membershipId: 'AE-' + u.uid.substring(0, 6).toUpperCase(),
          tier: 'Aura Sovereign Club Member',
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          image: u.photoURL || null
        };

        setIsLoading(false);
        onLogin(mappedUser);
        if (onClose) onClose();
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.error('Google Sign-in Error:', err);

      // Handle user cancellation gracefully
      if (
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request'
      ) {
        return;
      }

      if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized in Firebase. Please verify authorized domains.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Google sign-in popup was blocked by browser. Please allow popups for this site.');
      } else {
        setError(err.message || 'Unable to sign in with Google. Please try again.');
      }
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(5, 6, 8, 0.92)',
        backdropFilter: 'blur(16px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={isMandatory ? null : onClose}
    >
      <div 
        className="glass-panel animate-fade-in-up"
        style={{
          width: '100%',
          maxWidth: '460px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-premium), var(--glow-gold)',
          position: 'relative',
          padding: '40px 32px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {!isMandatory && onClose && (
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
        )}

        {/* Logo and Brand Heading */}
        <div style={{ textAlign: 'center', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Compass className="text-gold" size={32} />
            <span style={{ fontFamily: 'var(--font-headings)', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '0.1em' }} className="text-gold-gradient">
              AURA PORTAL
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Enter the private gateway to luxury real estate acquisitions.
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div 
          style={{
            display: 'flex',
            background: 'rgba(10, 12, 16, 0.5)',
            padding: '4px',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            marginBottom: '24px'
          }}
        >
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setError(''); }}
            style={{
              flex: 1,
              background: activeTab === 'login' ? 'var(--accent-gold)' : 'transparent',
              color: activeTab === 'login' ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('signup'); setError(''); }}
            style={{
              flex: 1,
              background: activeTab === 'signup' ? 'var(--accent-gold)' : 'transparent',
              color: activeTab === 'signup' ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          >
            Register
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div 
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '8px',
              color: '#fca5a5',
              fontSize: '0.85rem',
              marginBottom: '20px',
              textAlign: 'center'
            }}
          >
            {error}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit}>
          {activeTab === 'signup' && (
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={14} /> Full Name
              </label>
              <input
                type="text"
                placeholder="Alexander Mercer"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} /> Email Address
            </label>
            <input
              type="email"
              placeholder="alex@auraestates.com"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '28px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={14} /> Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                className="form-input"
                style={{ width: '100%', paddingRight: '44px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', height: '48px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Accessing Vault Portal...' : activeTab === 'login' ? 'Sign Into Vault Portal' : 'Register New Member'}
          </button>

          {/* Social Sign-in Icons Row */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'lowercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              or continue with
            </span>
            
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', width: '100%' }}>
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                style={{
                  width: '60px',
                  height: '60px',
                  padding: 0,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                disabled={isLoading}
                title="Sign in with Google"
              >
                <div style={{ width: '54px', height: '54px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lottie animationData={googleAnimation} loop={true} style={{ width: '100%', height: '100%' }} />
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
