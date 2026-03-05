import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { niftyStocks, sensexStocks, trendingStocks } from '../constants';
import '../styles/Home.css';
import { fetchQuote } from '../services/zerodha';

Chart.register(...registerables);

const Home = () => {

useEffect(() => {
  const loadData = async () => {
    try {
      const data = await fetchQuote('NIFTY 50');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  loadData();
}, []);


  // Mock data for line charts
  const chartData = {
    labels: ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
    datasets: [
      {
        label: 'Nifty 50',
        data: [17800, 17850, 17820, 17900, 17940, 17910, 17980, 18000, 17970, 18020, 18050, 18030],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.2,
        pointRadius: 2,
      },
    ],
  };

  const sensexData = {
    ...chartData,
    datasets: [{
      ...chartData.datasets[0],
      label: 'Sensex',
      data: [59800, 59900, 59850, 60000, 60100, 60050, 60200, 60300, 60250, 60400, 60380, 60500],
      borderColor: '#ffc107',
      backgroundColor: 'rgba(255, 193, 7, 0.1)',
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { color: '#2c2c3a' }, ticks: { color: '#b0b0b0' } },
      y: { grid: { color: '#2c2c3a' }, ticks: { color: '#b0b0b0' } },
    },
  };

  return (
    <div className="home-page">
      {/* Hero indices */}
      <div className="indices-grid">
        <div className="index-card">
          <h3>Nifty 50</h3>
          <div className="chart-container">
            <Line data={chartData} options={options} />
          </div>
          <div className="live-price">18,030.45 <span className="change positive">+0.3%</span></div>
        </div>
        <div className="index-card">
          <h3>Sensex</h3>
          <div className="chart-container">
            <Line data={sensexData} options={options} />
          </div>
          <div className="live-price">60,500.20 <span className="change positive">+0.5%</span></div>
        </div>
      </div>

      {/* Constituent stocks grid */}
      <section className="stocks-section">
        <h2>Nifty 50 Constituents</h2>
        <div className="stocks-grid">
          {niftyStocks.map(stock => (
            <div key={stock.symbol} className="stock-item">
              <span className="symbol">{stock.symbol}</span>
              <span className="price">₹{stock.price.toFixed(2)}</span>
              <span className={`change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                {stock.change > 0 ? '+' : ''}{stock.change}%
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="stocks-section">
        <h2>Sensex Constituents</h2>
        <div className="stocks-grid">
          {sensexStocks.map(stock => (
            <div key={stock.symbol} className="stock-item">
              <span className="symbol">{stock.symbol}</span>
              <span className="price">₹{stock.price.toFixed(2)}</span>
              <span className={`change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                {stock.change > 0 ? '+' : ''}{stock.change}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Trending stocks horizontal scroll */}
      <section className="trending-section">
        <h2>Trending Stocks</h2>
        <div className="trending-scroll">
          {trendingStocks.map(stock => (
            <div key={stock.symbol} className={`trending-card ${stock.isGainer ? 'gainer' : 'loser'}`}>
              <span className="symbol">{stock.symbol}</span>
              <span className="price">₹{stock.price.toFixed(2)}</span>
              <span className="change">{stock.change > 0 ? '+' : ''}{stock.change}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;