import React from 'react';
import { FaApple, FaGoogle, FaEnvelope } from 'react-icons/fa';
import './LoginPage.css'; // We'll create this file for LoginPage-specific styles
import Button from '@mui/material/Button';

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src="/src/assets/sobericon.png" alt="Sober Guide Icon" className="logo" />
          <h2 className="welcome-text">Welcome Back</h2>
        </div>

        <form className="login-form">
          <input type="text" placeholder="Username" className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <Button 
            type="submit" 
            variant="contained" 
            color="success" 
            fullWidth 
            className="login-button"
          >
            Login
          </Button>
        </form>

        <div className="login-links">
          <a href="#" className="login-link">Register</a>
          <span className="separator">|</span>
          <a href="#" className="login-link">Forgot password?</a>
        </div>

        <div className="social-login">
          <p className="social-text">Or continue with</p>
          <div className="social-icons">
            <a href="#" className="social-icon"><FaApple /></a>
            <a href="#" className="social-icon"><FaGoogle /></a>
            <a href="#" className="social-icon"><FaEnvelope /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;