import React from 'react';
import { FaApple, FaGoogle, FaEnvelope } from 'react-icons/fa';
import Button from '@mui/material/Button';

const LoginPage: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url("/assets/images/sober.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: '"Courier New", Courier, monospace',
    }}>
      <div style={{
        width: '90%',
        maxWidth: '400px',
        padding: '2rem',
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
          marginBottom: '2rem',
        }}>
          <img src="/src/assets/sobericon.png" alt="Sober Guide Icon" style={{
            width: '80px',
            height: 'auto',
          }} />
          <h2 style={{
            marginTop: '1rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
          }}>Welcome Back</h2>
        </div>

        <form style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <input type="text" placeholder="Username" style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '0.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
          }} />
          <input type="password" placeholder="Password" style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '0.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
          }} />
          <Button 
            type="submit" 
            variant="contained" 
            color="success" 
            fullWidth 
            style={{ marginTop: '1rem' }}
          >
            Login
          </Button>
        </form>

        <div style={{
          marginTop: '1rem',
          textAlign: 'center',
        }}>
          <a href="#" style={{ color: '#10B981', textDecoration: 'none' }}>Register</a>
          <span style={{ margin: '0 0.5rem', color: 'white' }}>|</span>
          <a href="#" style={{ color: '#10B981', textDecoration: 'none' }}>Forgot password?</a>
        </div>

        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          width: '100%',
        }}>
          <p style={{ color: 'white', marginBottom: '1rem' }}>Or continue with</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}>
            {['apple', 'google', 'envelope'].map((icon, index) => (
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