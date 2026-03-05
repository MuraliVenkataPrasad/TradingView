import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import Gauge from '../components/Gauge';
import { newsFeed, peerStocks } from '../constants';
import '../styles/ai-analysis.css' ;

const AIAnalysis = () => {
  const [timeRange, setTimeRange] = useState('1D');

  // Stock chart data (same as Home, but we can make it dynamic)
  const chartData = {
    labels: ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
    datasets: [
      {
        label: 'RELIANCE',
        data: [2450, 2460, 2455, 2470, 2475, 2472, 2480, 2485, 2482, 2490, 2495, 2500],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: '#2c2c3a' }, ticks: { color: '#b0b0b0' } },
      y: { grid: { color: '#2c2c3a' }, ticks: { color: '#b0b0b0' } },
    },
  };

  // PE Ratio bar chart
  const peData = {
    labels: peerStocks.map(s => s.symbol),
    datasets: [
      {
        label: 'P/E Ratio',
        data: peerStocks.map(s => s.pe),
        backgroundColor: '#4caf50',
        borderRadius: 4,
      },
    ],
  };

  const peOptions = {
    ...options,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="ai-analysis-page">
      {/* Three columns */}
      <div className="analysis-grid">
        {/* Left column */}
        <div className="col-left">
          <div className="chart-card">
            <div className="chart-header">
              <h3>RELIANCE (1D)</h3>
              <div className="time-range">
                {['1D', '5D', '1M'].map(range => (
                  <button
                    key={range}
                    className={timeRange === range ? 'active' : ''}
                    onClick={() => setTimeRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="chart-container">
              <Line data={chartData} options={options} />
            </div>
          </div>

          <div className="stats-card">
            <h4>Statistics</h4>
            <table className="stats-table">
              <tbody>
                <tr><td>Open</td><td>₹2,450.30</td></tr>
                <tr><td>High</td><td>₹2,500.00</td></tr>
                <tr><td>Low</td><td>₹2,445.20</td></tr>
                <tr><td>Mkt Cap</td><td>₹16.2T</td></tr>
                <tr><td>Volume</td><td>2.3M</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Center column */}
        <div className="col-center">
          <div className="gauge-card">
            <h4>Analyst Rating</h4>
            <Gauge value={70} labels={['Sell', 'Hold', 'Buy']} />
          </div>

          <div className="news-card">
            <h4>Market Sentiment</h4>
            <div className="news-feed">
              {newsFeed.map(item => (
                <div key={item.id} className={`news-item ${item.sentiment}`}>
                  <span className="news-headline">{item.headline}</span>
                  <span className={`sentiment-tag ${item.sentiment}`}>
                    {item.sentiment}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-right">
          <div className="pe-card">
            <h4>P/E Comparison</h4>
            <div className="bar-chart-container">
              <Bar data={peData} options={peOptions} />
            </div>
          </div>

          <div className="peer-card">
            <h4>Peer Stocks</h4>
            <ul className="peer-list">
              {peerStocks.map(stock => (
                <li key={stock.symbol}>
                  <span>{stock.symbol}</span>
                  <span>P/E {stock.pe}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;