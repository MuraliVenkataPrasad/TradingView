import React from 'react';
import { FiSearch, FiSettings } from 'react-icons/fi';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <h1>StockView</h1>
      </div>
      <div className="header-right">
        <FiSearch className="header-icon" />
        <FiSettings className="header-icon" />
      </div>
    </header>
  );
};

export default Header;