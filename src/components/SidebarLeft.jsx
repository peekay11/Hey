import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarLeft.css';

const SidebarLeft = ({ isMobile }) => {
  if (isMobile) return null; // We will use a bottom nav for mobile instead

  return (
    <aside className="sidebar-left">
      <h1 className="brand-logo">Hey</h1>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} end>
          <span className="material-symbols-outlined">home</span>
          <span>Home</span>
        </NavLink>
        <NavLink to="/discover" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="material-symbols-outlined">explore</span>
          <span>Discover</span>
        </NavLink>
        <NavLink to="/alerts" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="material-symbols-outlined">notifications</span>
          <span>Alerts</span>
        </NavLink>
        <NavLink to="/saved" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="material-symbols-outlined">bookmark</span>
          <span>Saved</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="material-symbols-outlined">person</span>
          <span>Profile</span>
        </NavLink>
        <button className="btn-primary-compose">
          <span className="material-symbols-outlined">edit_square</span>
          Say Hey
        </button>
      </div>
    </aside>
  );
};

export default SidebarLeft;
