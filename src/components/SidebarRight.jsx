import React from 'react';
import './SidebarRight.css';

const SidebarRight = ({ 
  isMobile,
  locationFilter,
  setLocationFilter,
  categoryFilter,
  setCategoryFilter
}) => {
  if (isMobile) return null; // Filters will go in a top bar or modal on mobile

  return (
    <aside className="sidebar-right">
      <div className="filters-widget">
        <h3>Filters</h3>
        
        <div className="filter-group">
          <label>Location</label>
          <div className="select-wrapper">
            <select 
              className="filter-select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="All">All Locations</option>
              <option value="Soweto">Soweto</option>
              <option value="Braamfontein">Braamfontein</option>
            </select>
            <span className="material-symbols-outlined select-icon">expand_more</span>
          </div>
          <button className="btn-follow">+ Follow Location</button>
        </div>
        
        <div className="filter-group">
          <label>Category</label>
          <div className="select-wrapper">
            <select 
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Barber">Barber</option>
              <option value="Photographer">Photographer</option>
              <option value="Food">Food</option>
            </select>
            <span className="material-symbols-outlined select-icon">expand_more</span>
          </div>
          <button className="btn-follow">+ Follow Category</button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarRight;
