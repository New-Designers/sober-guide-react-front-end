import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GoogleMaps from './components/Map/Map';
import LoginPage from './components/LoginPage/LoginPage';
import './App.css';

function App() {
  const apiKey = 'AIzaSyA3L4eTGBZiSi5bagL1kmhRwRVYa3RNxP0'; // Replace with your actual API key

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home (Google Maps)</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Route for the Google Maps page */}
          <Route path="/" element={<GoogleMaps apiKey={apiKey} />} />

          {/* Route for the Login page */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
