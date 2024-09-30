import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GoogleMaps from './components/Map/Map';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import './App.css';

function App() {
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key

  return (
    <Router>
      <div className="App">
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
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<GoogleMaps apiKey={apiKey} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;