import React from 'react';
import { NavLink } from 'react-router-dom';
import './MobileNav.css';

const MobileNav = ({ isMobile }) => {
  if (!isMobile) return null;

  return (
    <nav className="mobile-bottom-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} end>
        <span className="material-symbols-outlined">home</span>
      </NavLink>
      <NavLink to="/discover" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <span className="material-symbols-outlined">explore</span>
      </NavLink>
      <div className="nav-item-compose">
        <button className="btn-mobile-compose">
          <span className="material-symbols-outlined">edit_square</span>
        </button>
      </div>
      <NavLink to="/alerts" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <span className="material-symbols-outlined">notifications</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <span className="material-symbols-outlined">person</span>
      </NavLink>
    </nav>
  );
};

export default MobileNav;
