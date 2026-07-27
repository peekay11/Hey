import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/api';
import './SidebarRight.css';

const SidebarRight = ({ 
  isMobile,
  locationFilter,
  setLocationFilter,
  categoryFilter,
  setCategoryFilter
}) => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    let isMounted = true;
    ApiService.trending.getTrending().then(data => {
      if (isMounted) setTrending(data.slice(0, 4)); // Only show top 4 on sidebar
    });
    return () => { isMounted = false; };
  }, []);

  if (isMobile) return null; // Filters will go in a top bar or modal on mobile

  return (
    <aside className="sidebar-right">
      <div className="filters-widget" style={{ marginBottom: '1.5rem' }}>
        <h3>Filters</h3>
        
        <div className="filter-group">
          <label htmlFor="location-select">Location</label>
          <div className="select-wrapper">
            <select 
              id="location-select"
              className="filter-select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="All">All Locations</option>
              <option value="Soweto">Soweto</option>
              <option value="Braamfontein">Braamfontein</option>
            </select>
            <span className="material-symbols-outlined select-icon" aria-hidden="true">expand_more</span>
          </div>
          <button className="btn-follow">+ Follow Location</button>
        </div>
        
        <div className="filter-group">
          <label htmlFor="category-select">Category</label>
          <div className="select-wrapper">
            <select 
              id="category-select"
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Barber">Barber</option>
              <option value="Photographer">Photographer</option>
              <option value="Food">Food</option>
            </select>
            <span className="material-symbols-outlined select-icon" aria-hidden="true">expand_more</span>
          </div>
          <button className="btn-follow">+ Follow Category</button>
        </div>
      </div>

      <div className="card filters-widget" style={{ padding: '1.25rem 0', overflow: 'hidden' }}>
        <h3 style={{ padding: '0 1.25rem', marginBottom: '0.75rem', fontSize: '1.2rem', fontWeight: 800 }}>Trending</h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {trending.length > 0 ? trending.map((trend, index) => (
            <div 
              key={trend.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '0.75rem 1.25rem',
                cursor: 'pointer',
                borderBottom: index === trending.length - 1 ? 'none' : '1px solid var(--divider)',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--card-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{trend.category}</span>
                </div>
                <p style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', letterSpacing: '-0.3px' }}>{trend.topic}</p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '0.2rem' }}>
                  {trend.posts} posts
                </div>
              </div>
              <div style={{ alignSelf: 'flex-start' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>more_horiz</span>
              </div>
            </div>
          )) : (
            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SidebarRight;
