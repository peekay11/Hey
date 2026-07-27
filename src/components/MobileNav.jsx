import React from 'react';
import { NavLink } from 'react-router-dom';
import './MobileNav.css';

const MobileNav = ({ isMobile, onComposeClick }) => {
  if (!isMobile) return null;

  return (
    <nav className="mobile-bottom-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} end aria-label="Home">
        <span className="material-symbols-outlined" aria-hidden="true">home</span>
      </NavLink>
      <NavLink to="/discover" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} aria-label="Discover">
        <span className="material-symbols-outlined" aria-hidden="true">explore</span>
      </NavLink>
      <div className="nav-item-compose">
        <button className="btn-mobile-compose" onClick={onComposeClick} aria-label="Compose new post">
          <span className="material-symbols-outlined" aria-hidden="true">edit_square</span>
        </button>
      </div>
      <NavLink to="/alerts" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} aria-label="Alerts">
        <span className="material-symbols-outlined" aria-hidden="true">notifications</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} aria-label="Profile">
        <span className="material-symbols-outlined" aria-hidden="true">person</span>
      </NavLink>
    </nav>
  );
};

export default MobileNav;
