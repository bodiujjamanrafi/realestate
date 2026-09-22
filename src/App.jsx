import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyGrid from './components/PropertyGrid';
import PropertyModal from './components/PropertyModal';
import InteractiveMap from './components/InteractiveMap';
import VirtualTour from './components/VirtualTour';
import MortgageCalculator from './components/MortgageCalculator';
import Agents from './components/Agents';
import ContactValuation from './components/ContactValuation';
import Footer from './components/Footer';

import { Compass } from 'lucide-react';

// New active components
import AuthModal from './components/AuthModal';
import BuyModal from './components/BuyModal';
import SellFormModal from './components/SellFormModal';
import UserPortal from './components/UserPortal';
import MarketTrends from './components/MarketTrends';
import Testimonials from './components/Testimonials';
import InvestmentSimulator from './components/InvestmentSimulator';

import { auth, onAuthStateChanged, signOut } from './firebase';
import { supabase } from './supabaseClient';

// Seed Database of Premium Properties
const PROPERTIES_DB = [
  {
    id: 1,
    title: 'The Overlook Penthouse',
    price: 18500000,
    beds: 4,
    baths: 4.5,
    sqft: 6200,
    location: 'Manhattan',
    type: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tag: 'Exclusive Listing',
    description: 'Perched above Manhattan, this trophy duplex penthouse offers uninterrupted 360-degree views of the skyline. Designed with custom Arabescato marble floors, dual primary wings, a custom structural steel staircase, and access to a private resident rooftop helipad clearance zone.',
    amenities: [
      'Private Helipad Access',
      'Glass Elevator',
      'Dual Primary Suite Wings',
      'Arabescato Marble Floors',
      '1,200 sqft Sunset Terrace',
      '24/7 White-Glove Concierge'
    ]
  },
  {
    id: 2,
    title: 'Villa Mirage',
    price: 24000000,
    beds: 6,
    baths: 8,
    sqft: 12400,
    location: 'Beverly Hills',
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    tag: 'New Masterpiece',
    description: 'A structural feat of modern glass and raw concrete nestled in Beverly Hills. Features a double-height entryway, a subterranean car gallery for up to 12 vehicles, a state-of-the-art wellness facility with hammam, and an eighty-foot glass-sided infinity pool cascading over the canyon below.',
    amenities: [
      'Subterranean 12-Car Gallery',
      'Infinity Glass-Sided Pool',
      'Professional Wellness Hammam',
      'Double-Height Glass Vaults',
      'Commercial Chef\'s Kitchen',
      'Private Cinema Room'
    ]
  },
  {
    id: 3,
    title: 'Coral Cove Sanctuary',
    price: 14200000,
    beds: 5,
    baths: 6,
    sqft: 8900,
    location: 'Miami Beach',
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    tag: 'Private Waterfront',
    description: 'Offering 150 feet of direct prime Miami Beach deepwater access, this architectural estate features a custom-engineered private yacht dock, an outdoor glass dining pavilion, custom oak wall paneling, automated smart systems, and floor-to-ceiling retractable impact glass facades.',
    amenities: [
      '150-ft Yacht Docking Slip',
      'Glass Outdoor Pavilion',
      'Retractable Impact Glass Facades',
      'Zero-Edge Reflection Pools',
      'Professional Cigar Humidor',
      'Fully Integrated Smart Home'
    ]
  },
  {
    id: 4,
    title: 'The Obsidian Ridge',
    price: 28500000,
    beds: 7,
    baths: 9,
    sqft: 14800,
    location: 'Aspen',
    type: 'Iconic',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    tag: 'Alpine Luxury',
    description: 'The premier ski-in ski-out estate in Aspen, constructed of local mountain stone, dark timber, and black steel highlights. Includes a heated outdoor terrace lounge, wine cellar with sommelier prep tables, private ski locker room, and a massive floor-to-ceiling hand-carved fireplace.',
    amenities: [
      'Private Ski-In Ski-Out Access',
      'Heated Outdoor Terrace Lounge',
      'Custom Wine Sommelier Cellar',
      'Hand-Carved Onyx Fireplace',
      'Thermodynamic Steam Shower',
      'Separate Staff Residences'
    ]
  },
  {
    id: 5,
    title: 'Elysian Isle Retreat',
    price: 32000000,
    beds: 5,
    baths: 5.5,
    sqft: 9200,
    location: 'Malibu',
    type: 'Island',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    tag: 'Ultra Premium',
    description: 'Poised on a private cove of Malibu Beach, this estate is a sanctuary of absolute tranquility. Architected to follow the natural contours of the coastline, it features a glass-wrapped fitness studio, organic limestone bathrooms, automated louvered screens, and private security access lanes.',
    amenities: [
      'Private Sand Beach Cove',
      'Organic Limestone Finishes',
      'Glass Fitness & Yoga Studio',
      'Automated Louvered Privacy Screens',
      'Eco-Friendly Geothermal HVAC',
      '24/7 Perimeter Cyber-Security'
    ]
  },
  {
    id: 6,
    title: 'The Zenith Pavilion',
    price: 19500000,
    beds: 4,
    baths: 5,
    sqft: 7800,
    location: 'Malibu',
    type: 'Iconic',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    tag: 'Architectural Icon',
    description: 'A masterpiece of modernist architecture featuring cantilevered pavilions suspended above the coastal bluffs. Boasts absolute minimalist interior layouts, an Olympic-length single lane lap pool, smart automation systems, and an integrated private gallery for fine art installations.',
    amenities: [
      'Cantilevered Bluff Structure',
      'Olympic-Length Single Lane Pool',
      'Integrated Art Installation Gallery',
      'Smart Automations Suite',
      'Organic Living Green Roof',
      'Private Sunset Observation Deck'
    ]
  }
];

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Modal visibilities
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showUserPortal, setShowUserPortal] = useState(false);

  // Focus Property items
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyToAcquire, setPropertyToAcquire] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Core synchronized application state (localStorage persistence)
  const [properties, setProperties] = useState(PROPERTIES_DB);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [favorites, setFavorites] = useState([]);
  const [offers, setOffers] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [myListings, setMyListings] = useState([]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('aura_user', JSON.stringify(user));
    }
    setShowAuthModal(false);
  };

  // Firebase Authentication State Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const mappedUser = {
          email: firebaseUser.email || 'vip.member@auraestates.com',
          name: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Sovereign Member'),
          uid: firebaseUser.uid,
          membershipId: 'AE-' + firebaseUser.uid.substring(0, 6).toUpperCase(),
          tier: 'Aura Sovereign Club Member',
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          image: firebaseUser.photoURL || null
        };
        handleLogin(mappedUser);
      }
    });
    return () => unsubscribe();
  }, []);

  // Load and Listen to properties from Supabase (with fallback to PROPERTIES_DB)
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('id', { ascending: true });
          
        if (!error && data && data.length > 0) {
          setProperties(data);
        }
      } catch (err) {
        console.warn('Using default luxury properties list:', err);
      }
    };

    fetchProperties();
    
    const channel = supabase
      .channel('properties_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'properties' },
        () => {
          fetchProperties();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Load and Listen to user's favorites from Supabase
  useEffect(() => {
    if (!currentUser) {
      setFavorites([]);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('property_id')
          .eq('user_id', currentUser.uid);

        if (error) throw error;
        setFavorites(data.map(fav => Number(fav.property_id)));
      } catch (err) {
        console.error('Failed to fetch favorites from Supabase:', err);
      }
    };

    fetchFavorites();

    const channel = supabase
      .channel('favorites_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'favorites', filter: `user_id=eq.${currentUser.uid}` },
        () => {
          fetchFavorites();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  // Load and Listen to ALL offers from Supabase
  useEffect(() => {
    if (!currentUser) {
      setAllOffers([]);
      setOffers([]);
      return;
    }

    const fetchAllOffers = async () => {
      try {
        const { data, error } = await supabase
          .from('offers')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        const mappedOffers = (data || []).map(offer => ({
          id: offer.id,
          propertyId: Number(offer.property_id),
          propertyTitle: offer.property_title,
          offerPrice: Number(offer.price),
          buyerName: offer.name,
          buyerPhone: offer.phone,
          buyerNotes: offer.notes,
          buyerEmail: offer.email,
          status: offer.status,
          date: new Date(offer.created_at).toLocaleDateString()
        }));
        setAllOffers(mappedOffers);
        
        // Filter user's placed offers
        setOffers(mappedOffers.filter(offer => offer.buyerEmail === currentUser.email));
      } catch (err) {
        console.error('Failed to fetch all offers from Supabase:', err);
      }
    };

    fetchAllOffers();

    const channel = supabase
      .channel('all_offers_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'offers' },
        () => {
          fetchAllOffers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  // Load and Listen to VIP messages from Supabase
  useEffect(() => {
    if (!currentUser) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .or(`sender_email.eq.${currentUser.email},receiver_email.eq.${currentUser.email}`)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);
      } catch (err) {
        console.error('Failed to fetch messages from Supabase:', err);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  // Derive myListings from properties where owner_email == currentUser.email
  useEffect(() => {
    if (!currentUser) {
      setMyListings([]);
      return;
    }
    const userListings = properties.filter(prop => prop.owner_email === currentUser.email);
    setMyListings(userListings);
  }, [properties, currentUser]);

  // Section scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'properties', 'map', 'tour', 'mortgage', 'trends', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200; // offset for nav

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleSearch = (criteria) => {
    // If user selected "sell" tab, trigger the property creation workflow
    if (criteria.tab === 'sell') {
      if (!currentUser) {
        setShowAuthModal(true);
      } else {
        setShowSellModal(true);
      }
      return;
    }
    
    setSearchCriteria(criteria);
    handleNavigate('properties');
  };

  // State manipulation callbacks
  const handleToggleFavorite = async (id) => {
    if (!currentUser) return;
    const isFav = favorites.includes(id);
    const updatedFavorites = isFav 
      ? favorites.filter(fId => fId !== id) 
      : [...favorites, id];
    
    setFavorites(updatedFavorites);
    try {
      if (isFav) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', currentUser.uid)
          .eq('property_id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: currentUser.uid,
            property_id: id
          });
        if (error) throw error;
      }
    } catch (error) {
      console.error('Failed to update favorite in Supabase:', error);
    }
  };

  const handleRemoveFavorite = async (id) => {
    if (!currentUser) return;
    const updatedFavorites = favorites.filter(fId => fId !== id);
    setFavorites(updatedFavorites);
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', currentUser.uid)
        .eq('property_id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Failed to remove favorite in Supabase:', error);
    }
  };

  const handlePropertyListed = async (newProp) => {
    if (!currentUser) return;
    try {
      const { error } = await supabase
        .from('properties')
        .insert({
          title: newProp.title,
          price: newProp.price,
          beds: newProp.beds,
          baths: newProp.baths,
          sqft: newProp.sqft,
          location: newProp.location,
          type: newProp.type,
          image: newProp.image,
          tag: newProp.tag,
          description: newProp.description,
          amenities: newProp.amenities,
          owner_email: currentUser.email
        });
      if (error) throw error;
      setShowSellModal(false);
    } catch (error) {
      console.error('Failed to list property in Supabase:', error);
    }
  };

  const handleOfferPlaced = async (newOffer) => {
    if (!currentUser) return;
    try {
      const { error } = await supabase
        .from('offers')
        .insert({
          property_id: newOffer.propertyId || newOffer.property_id,
          property_title: newOffer.propertyTitle || newOffer.property_title,
          price: newOffer.offerPrice || newOffer.price,
          name: newOffer.buyerName || newOffer.name,
          email: currentUser.email,
          phone: newOffer.buyerPhone || newOffer.phone,
          notes: newOffer.buyerNotes || newOffer.notes,
          status: 'Pending'
        });
      if (error) throw error;
      setShowBuyModal(false);
    } catch (error) {
      console.error('Failed to place offer in Supabase:', error);
    }
  };

  const handleUpdateUserProfile = async (updatedData) => {
    if (!currentUser) return;
    try {
      const { error } = await supabase
        .from('users')
        .update(updatedData)
        .eq('id', currentUser.uid);
      if (error) console.warn('Supabase profile update warning:', error);
    } catch (err) {
      console.warn('Supabase sync skipped, maintaining local profile:', err);
    }
    
    setCurrentUser(prev => {
      const updated = { ...prev, ...updatedData };
      try {
        localStorage.setItem('aura_user', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save to localStorage:', e);
      }
      return updated;
    });
  };

  const handleSendMessage = async (receiverEmail, propertyId, content) => {
    if (!currentUser) return;
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_email: currentUser.email,
          receiver_email: receiverEmail,
          property_id: propertyId,
          content: content
        });
      if (error) throw error;
    } catch (err) {
      console.error('Failed to send message in Supabase:', err);
    }
  };

  const handleUpdateOfferStatus = async (offerId, newStatus) => {
    if (!currentUser) return;
    try {
      const { error } = await supabase
        .from('offers')
        .update({ status: newStatus })
        .eq('id', offerId);
      if (error) throw error;
    } catch (err) {
      console.error('Failed to update offer status in Supabase:', err);
    }
  };

  const handleAcquireTrigger = (prop) => {
    // If not signed in, prompt authentication modal
    if (!currentUser) {
      setSelectedProperty(null); // close detail modal
      setShowAuthModal(true);
    } else {
      setPropertyToAcquire(prop);
      setShowBuyModal(true);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setCurrentUser(null);
      setFavorites([]);
      setOffers([]);
      setMyListings([]);
      sessionStorage.removeItem('aura_verified');
      localStorage.removeItem('aura_user');
      localStorage.removeItem('aura_favorites');
      localStorage.removeItem('aura_offers');
      localStorage.removeItem('aura_listings');
    }).catch((err) => {
      console.error('Firebase sign out error:', err);
    });
  };

  if (loading) {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#0A0C10',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}
      >
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div 
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '2px solid rgba(212, 175, 55, 0.1)',
              borderTop: '2px solid var(--accent-gold)',
              animation: 'spin 1.5s linear infinite',
              position: 'absolute',
              top: '-15px',
              left: '50%',
              marginLeft: '-50px'
            }}
          />
          <Compass 
            size={70} 
            className="text-gold" 
            style={{ 
              strokeWidth: 1.2,
              animation: 'pulseCompass 2s ease-in-out infinite' 
            }} 
          />
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1 
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: 800,
                fontSize: '2.5rem',
                letterSpacing: '0.2em',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                margin: 0,
                animation: 'fadeInText 1.5s ease-out'
              }}
            >
              Aura
            </h1>
            <span 
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '1rem',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                display: 'block',
                marginTop: '4px',
                color: 'var(--text-secondary)',
                opacity: 0.8,
                animation: 'fadeInSubtext 2s ease-out'
              }}
            >
              Estates
            </span>
          </div>
        </div>
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulseCompass {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(212,175,55,0.2)); }
            50% { transform: scale(1.08); filter: drop-shadow(0 0 25px rgba(212,175,55,0.6)); }
          }
          @keyframes fadeInText {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInSubtext {
            0% { opacity: 0; letter-spacing: 0.1em; }
            100% { opacity: 0.8; letter-spacing: 0.45em; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {/* Navigation sticky header */}
      <Navbar 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
        currentUser={currentUser}
        onAuthTrigger={() => setShowAuthModal(true)}
        onPortalTrigger={() => setShowUserPortal(true)}
        onSellTrigger={() => setShowSellModal(true)}
      />

      {/* Hero Section */}
      <div id="hero">
        <Hero onSearch={handleSearch} />
      </div>

      {/* Properties Grid Section */}
      <PropertyGrid 
        properties={properties} 
        onSelectProperty={setSelectedProperty}
        searchCriteria={searchCriteria}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Interactive Blueprint Map Section */}
      <InteractiveMap />

      {/* Virtual Tour section */}
      <VirtualTour />

      {/* Mortgage Simulator Section */}
      <MortgageCalculator />

      {/* Wealth Yield Simulator Section */}
      <InvestmentSimulator properties={properties} />

      {/* Market Trends Analytics Section */}
      <MarketTrends />

      {/* Agents Showcase Section */}
      <Agents />

      {/* Success Stories Testimonials Slider */}
      <Testimonials />

      {/* Contact & Valuation section */}
      <ContactValuation />

      {/* Footer component */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Overlays */}
      
      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
          onAcquireProperty={handleAcquireTrigger}
        />
      )}

      {/* Auth Portal Modal */}
      <AuthModal 
        isOpen={!currentUser || showAuthModal}
        onClose={!currentUser ? null : () => setShowAuthModal(false)}
        onLogin={handleLogin}
        isMandatory={!currentUser}
      />

      {/* Buy / Offer Submission Modal */}
      <BuyModal 
        isOpen={showBuyModal}
        property={propertyToAcquire}
        onClose={() => setShowBuyModal(false)}
        onOfferPlaced={handleOfferPlaced}
      />

      {/* Property Selling / Listing Form Modal */}
      <SellFormModal 
        isOpen={showSellModal}
        onClose={() => setShowSellModal(false)}
        onPropertyListed={handlePropertyListed}
      />

      {/* User Dashboard Club Portal */}
      <UserPortal 
        isOpen={showUserPortal}
        onClose={() => setShowUserPortal(false)}
        user={currentUser}
        onLogout={handleLogout}
        favorites={favorites}
        properties={properties}
        offers={offers}
        myListings={myListings}
        onRemoveFavorite={handleRemoveFavorite}
        onSelectProperty={setSelectedProperty}
        receivedOffers={allOffers.filter(offer => {
          const prop = properties.find(p => p.id === offer.propertyId);
          return prop && prop.owner_email === currentUser.email;
        })}
        onUpdateOfferStatus={handleUpdateOfferStatus}
        messages={messages}
        onSendMessage={handleSendMessage}
        onUpdateUserProfile={handleUpdateUserProfile}
      />
    </>
  );
}

export default App;
