import React from 'react';
import './Gauge.css';

const Gauge = ({ value = 65, labels = ['Sell', 'Hold', 'Buy'] }) => {
  // value between 0 and 100
  const angle = (value / 100) * 180 - 90; // map to -90 to +90 degrees
  const pointerRotation = `rotate(${angle}deg)`;

  return (
    <div className="gauge-container">
      <svg viewBox="0 0 200 100" className="gauge-svg">
        {/* Background arc (slate) */}
        <path
          d="M20,80 A80,80 0 0,1 180,80"
          fill="none"
          stroke="#2c2c3a"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Colored arc (green to red gradient) */}
        <path
          d="M20,80 A80,80 0 0,1 180,80"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="251.2" /* circumference half */
          strokeDashoffset="125.6" /* start at midpoint (hold) */
          style={{ strokeDashoffset: 251.2 * (1 - value / 100) }}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f44336" />   {/* Sell - red */}
            <stop offset="50%" stopColor="#ffc107" />  {/* Hold - yellow */}
            <stop offset="100%" stopColor="#4caf50" /> {/* Buy - green */}
          </linearGradient>
        </defs>
        {/* Pointer */}
        <g transform={`translate(100,80) ${pointerRotation}`}>
          <line x1="0" y1="0" x2="0" y2="-60" stroke="#fff" strokeWidth="3" />
          <circle cx="0" cy="0" r="6" fill="#fff" />
        </g>
      </svg>
      <div className="gauge-labels">
        <span>{labels[0]}</span>
        <span>{labels[1]}</span>
        <span>{labels[2]}</span>
      </div>
    </div>
  );
};

export default Gauge;