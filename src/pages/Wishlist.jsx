import React, { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import '../styles/Wishlist.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    { symbol: 'RELIANCE', price: 2456.30, change: 1.2 },
    { symbol: 'TCS', price: 3567.80, change: -0.5 },
    { symbol: 'HDFC', price: 1678.90, change: 0.8 },
  ]);
  const [newSymbol, setNewSymbol] = useState('');

  const addStock = (e) => {
    e.preventDefault();
    if (!newSymbol.trim()) return;
    // Simulate adding a stock with mock price
    const mockPrice = (Math.random() * 2000 + 500).toFixed(2);
    const mockChange = (Math.random() * 10 - 5).toFixed(1);
    setWishlist([
      ...wishlist,
      { symbol: newSymbol.toUpperCase(), price: parseFloat(mockPrice), change: parseFloat(mockChange) }
    ]);
    setNewSymbol('');
  };

  const removeStock = (symbol) => {
    setWishlist(wishlist.filter(item => item.symbol !== symbol));
  };

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>

      <form onSubmit={addStock} className="add-stock-form">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., INFY)"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
        />
        <button type="submit"><FiPlus /> Add</button>
      </form>

      <div className="wishlist-table">
        <div className="table-header">
          <span>Symbol</span>
          <span>Price</span>
          <span>Change</span>
          <span>Action</span>
        </div>
        {wishlist.map(stock => (
          <div key={stock.symbol} className="table-row">
            <span className="symbol">{stock.symbol}</span>
            <span className="price">₹{stock.price.toFixed(2)}</span>
            <span className={`change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
              {stock.change > 0 ? '+' : ''}{stock.change}%
            </span>
            <button onClick={() => removeStock(stock.symbol)} className="remove-btn">
              <FiTrash2 />
            </button>
          </div>
        ))}
        {wishlist.length === 0 && (
          <div className="empty-message">Your wishlist is empty. Add some stocks!</div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;