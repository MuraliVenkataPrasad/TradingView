import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AIAnalysis from './pages/AIAnalysis';
import Wishlist from './pages/Wishlist';
import './styles/global.css';

// Simple auth check (demo)
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/*"
          element={
            isAuthenticated() ? (
              <>
                <Header />
                <Navbar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/ai-analysis" element={<AIAnalysis />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </main>
              </>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;