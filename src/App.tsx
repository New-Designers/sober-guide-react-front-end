import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GoogleMaps from './pages/Map/Map';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import RewardsPage from './pages/RewardsPage/RewardsPage';
import './App.css';
import './styles/global.css';
import NavBar from './components/NavBar/NavBar';

function App() {
  const apiKey = 'AIzaSyA3L4eTGBZiSi5bagL1kmhRwRVYa3RNxP0'; // Replace with your actual API key

  return (
    <Router>
      <div className="App" id="mobile-view">
        <NavBar />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/reward">Reward</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<GoogleMaps apiKey={apiKey} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reward" element={<RewardsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;