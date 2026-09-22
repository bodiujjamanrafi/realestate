import { useState, useMemo } from 'react';
import { Bed, Bath, Maximize2, MapPin, SlidersHorizontal, Heart } from 'lucide-react';

export default function PropertyGrid({ properties, onSelectProperty, searchCriteria, favorites = [], onToggleFavorite }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // 'price-asc', 'price-desc', 'featured'

  const categories = ['All', 'Villa', 'Penthouse', 'Island', 'Iconic'];

  // Apply filters and search criteria
  const filteredAndSortedProperties = useMemo(() => {
    let result = [...properties];

    // 1. Search Criteria from Hero Section
    if (searchCriteria) {
      const { location, type, price } = searchCriteria;
      
      if (location) {
        result = result.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
      }
      if (type) {
        result = result.filter(p => p.type.toLowerCase() === type.toLowerCase());
      }
      if (price) {
        if (price === 'under-5m') {
          result = result.filter(p => p.price < 5000000);
        } else if (price === '5m-15m') {
          result = result.filter(p => p.price >= 5000000 && p.price <= 15000000);
        } else if (price === '15m-30m') {
          result = result.filter(p => p.price >= 15000000 && p.price <= 30000000);
        } else if (price === 'above-30m') {
          result = result.filter(p => p.price > 30000000);
        }
      }
    }

    // 2. Tab Filter
    if (activeFilter !== 'All') {
      result = result.filter(p => p.type.toLowerCase() === activeFilter.toLowerCase());
    }

    // 3. Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [properties, activeFilter, sortBy, searchCriteria]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section 
      id="properties" 
      className="section-padding" 
      style={{ backgroundColor: 'var(--bg-secondary)', position: 'relative' }}
    >
      <div className="container">
        {/* Header Block */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
              Curated Selection
            </span>
            <h2 
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                marginBottom: '12px',
                fontFamily: 'var(--font-headings)'
              }}
            >
              Featured <span className="text-gold">Residences</span>
            </h2>
            <p style={{ maxWidth: '480px' }}>
              Explore our handpicked collection of properties designed for those who appreciate fine architecture and ultimate privacy.
            </p>
          </div>

          {/* Sort Controller */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(10, 12, 16, 0.4)',
              border: '1px solid var(--border-color)',
              padding: '6px 16px',
              borderRadius: '12px'
            }}
          >
            <SlidersHorizontal size={14} className="text-gold" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="featured">Exclusive Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div 
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '36px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                background: activeFilter === cat ? 'var(--accent-gold)' : 'rgba(24, 30, 41, 0.5)',
                color: activeFilter === cat ? 'var(--bg-primary)' : 'var(--text-primary)',
                border: '1px solid',
                borderColor: activeFilter === cat ? 'var(--accent-gold)' : 'var(--border-color)',
                padding: '8px 20px',
                borderRadius: '99px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== cat) e.target.style.borderColor = 'var(--accent-gold)';
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== cat) e.target.style.borderColor = 'var(--border-color)';
              }}
            >
              {cat === 'All' ? 'All Properties' : cat}
            </button>
          ))}
        </div>

        {/* Property Cards Grid */}
        {filteredAndSortedProperties.length === 0 ? (
          <div 
            className="glass-panel"
            style={{
              padding: '60px 24px',
              borderRadius: '16px',
              textAlign: 'center'
            }}
          >
            <h3 style={{ marginBottom: '12px', color: 'var(--accent-gold)' }}>No Listings Match Your Search</h3>
            <p style={{ maxWidth: '400px', margin: '0 auto' }}>
              We currently don't have listings fitting those exact parameters. Please try adjusting your filters or resetting the search.
            </p>
            <button 
              className="btn btn-secondary" 
              onClick={() => { setActiveFilter('All'); setSortBy('featured'); }}
              style={{ marginTop: '24px' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '30px'
            }}
          >
            {filteredAndSortedProperties.map((prop) => (
              <div 
                key={prop.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  textAlign: 'left'
                }}
              >
                {/* Image Container with Hover zoom */}
                <div 
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '240px',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src={prop.image} 
                    alt={prop.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  {/* Status Badges */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      display: 'flex',
                      gap: '8px'
                    }}
                  >
                    <span className="badge badge-gold">
                      {prop.tag || 'Exclusive'}
                    </span>
                  </div>

                  {/* Heart Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleFavorite) onToggleFavorite(prop.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(10, 12, 16, 0.7)',
                      border: '1px solid var(--border-color)',
                      color: favorites.includes(prop.id) ? 'var(--accent-gold)' : 'var(--text-secondary)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 5,
                      transition: 'var(--transition-smooth)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                  >
                    <Heart size={16} fill={favorites.includes(prop.id) ? 'var(--accent-gold)' : 'transparent'} />
                  </button>

                  {/* Category Type Badge */}
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px'
                    }}
                  >
                    <span 
                      style={{
                        background: 'rgba(10, 12, 16, 0.8)',
                        backdropFilter: 'blur(4px)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: 'var(--text-primary)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {prop.type}
                    </span>
                  </div>
                </div>

                {/* Info Container */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  {/* Location */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <MapPin size={14} className="text-gold" />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      {prop.location}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '12px',
                      color: 'var(--text-primary)',
                      lineHeight: '1.3'
                    }}
                  >
                    {prop.title}
                  </h3>

                  {/* Price */}
                  <div 
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: 'var(--accent-gold)',
                      marginBottom: '16px',
                      fontFamily: 'var(--font-headings)'
                    }}
                  >
                    {formatPrice(prop.price)}
                  </div>

                  {/* Specs */}
                  <div 
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '16px',
                      marginTop: 'auto',
                      marginBottom: '20px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Bed size={16} style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{prop.beds} Beds</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Bath size={16} style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{prop.baths} Baths</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Maximize2 size={16} style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{prop.sqft.toLocaleString()} Sq Ft</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    className="btn btn-secondary"
                    onClick={() => onSelectProperty(prop)}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      fontSize: '0.85rem'
                    }}
                  >
                    View Premium Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
