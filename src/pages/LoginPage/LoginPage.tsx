import React, { useState } from 'react';
import { FaApple, FaGoogle, FaEnvelope } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', { username, password });
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url("/assets/images/sober.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: '"Courier New", Courier, monospace',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '414px',
        padding: '1.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '1rem',
        }}>
          <img src="/src/assets/sobericon.png" alt="Sober Guide Icon" style={{
            width: '80px',
            height: 'auto',
          }} />
          <h2 style={{
            marginTop: '0.5rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
          }}>Welcome Back</h2>
        </div>
        <form onSubmit={handleSubmit} style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '0.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1rem',
            }} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '0.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1rem',
            }} 
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="success" 
            fullWidth 
            style={{ marginTop: '0.5rem', padding: '0.75rem', fontSize: '1rem' }}
          >
            Login
          </Button>
        </form>
        <div style={{
          marginTop: '0.75rem',
          textAlign: 'center',
          width: '100%',
        }}>
          <Link to="/register" style={{ color: '#10B981', textDecoration: 'none', fontSize: '1rem' }}>Register</Link>
          <span style={{ margin: '0 0.75rem', color: 'white' }}>|</span>
          <Link to="/reset-password" style={{ color: '#10B981', textDecoration: 'none', fontSize: '1rem' }}>Forgot password?</Link>
        </div>
        <div style={{
          marginTop: '1rem',
          textAlign: 'center',
          width: '100%',
        }}>
          <p style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1rem' }}>Or continue with</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}>
            {['apple', 'google', 'envelope'].map((icon) => (
              <a key={icon} href="#" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40px',
                height: '40px',
                backgroundColor: 'white',
                borderRadius: '50%',
                color: '#4A5568',
                textDecoration: 'none',
                fontSize: '1.25rem',
              }}>
                {icon === 'apple' && <FaApple />}
                {icon === 'google' && <FaGoogle />}
                {icon === 'envelope' && <FaEnvelope />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;