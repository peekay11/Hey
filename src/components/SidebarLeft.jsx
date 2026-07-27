import React from 'react';
import './SidebarLeft.css';

const SidebarLeft = ({ isMobile }) => {
  if (isMobile) return null; // We will use a bottom nav for mobile instead

  return (
    <aside className="sidebar-left">
      <h1 className="brand-logo">Hey</h1>
      <div className="nav-links">
        <div className="nav-item active">
          <span className="material-symbols-outlined icon-filled">home</span>
          <span>Home</span>
        </div>
        <div className="nav-item">
          <span className="material-symbols-outlined">explore</span>
          <span>Discover</span>
        </div>
        <div className="nav-item">
          <span className="material-symbols-outlined">notifications</span>
          <span>Alerts</span>
        </div>
        <div className="nav-item">
          <span className="material-symbols-outlined">bookmark</span>
          <span>Saved</span>
        </div>
        <div className="nav-item">
          <span className="material-symbols-outlined">person</span>
          <span>Profile</span>
        </div>
        <button className="btn-primary-compose">
          <span className="material-symbols-outlined">edit_square</span>
          Say Hey
        </button>
      </div>
    </aside>
  );
};

export default SidebarLeft;
