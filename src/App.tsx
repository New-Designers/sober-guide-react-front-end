import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleMaps from './pages/Map/Map';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import RewardsPage from './pages/RewardsPage/RewardsPage';
import './styles/Global.css';
import BackButton from './components/BackButton/BackButton';
import SGTitle from './components/SGTitle/SGTitle';
import NavBar from './components/NavBar/NavBar';

function App() {
  const apiKey = 'AIzaSyA3L4eTGBZiSi5bagL1kmhRwRVYa3RNxP0';

  return (
    <Router>
      <div id="mobile-view">
        <div className="App">
          <header className="header">
            <BackButton />
            <SGTitle />
            <div className="nav-bar">
              <NavBar />
            </div>
          </header>
          <main className="content">
            <Routes>
              <Route path="/" element={<GoogleMaps apiKey={apiKey} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reward" element={<RewardsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;