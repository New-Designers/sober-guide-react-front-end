import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleMaps from './components/Map/Map';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import NavBar from './components/NavBar/NavBar';
import './styles/Global.css';
import BackButton from './components/BackButton/BackButton';
import SGTitle from './components/SGTitle/SGTitle';

function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <Router>
      <div id="mobile-view">
        <div className="App">
          <header className="header">
            <BackButton />
            <SGTitle />
            <NavBar />
          </header>
          <main className="content">
            <Routes>
              <Route path="/" element={<GoogleMaps apiKey={apiKey} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;