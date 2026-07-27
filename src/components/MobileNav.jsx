import React from 'react';
import './MobileNav.css';

const MobileNav = ({ isMobile }) => {
  if (!isMobile) return null;

  return (
    <nav className="mobile-bottom-nav">
      <div className="nav-item active">
        <span className="material-symbols-outlined icon-filled">home</span>
      </div>
      <div className="nav-item">
        <span className="material-symbols-outlined">explore</span>
      </div>
      <div className="nav-item-compose">
        <button className="btn-mobile-compose">
          <span className="material-symbols-outlined">edit_square</span>
        </button>
      </div>
      <div className="nav-item">
        <span className="material-symbols-outlined">notifications</span>
      </div>
      <div className="nav-item">
        <span className="material-symbols-outlined">person</span>
      </div>
    </nav>
  );
};

export default MobileNav;
