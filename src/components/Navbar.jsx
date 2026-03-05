import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="main-nav">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>
      <NavLink to="/ai-analysis" className={({ isActive }) => (isActive ? 'active' : '')}>AI Analysis</NavLink>
      <NavLink to="/wishlist" className={({ isActive }) => (isActive ? 'active' : '')}>Wishlist</NavLink>
    </nav>
  );
};

export default Navbar;