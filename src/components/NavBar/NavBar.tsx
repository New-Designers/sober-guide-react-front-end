import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import TourIcon from '@mui/icons-material/Tour';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import WidgetsIcon from '@mui/icons-material/Widgets';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { keyframes, styled } from '@mui/system';

interface NavItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const shakeAnimation = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  50% { transform: rotate(0eg); }
  75% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
`;

const AnimatedIconButton = styled(IconButton)(() => ({
  color: '#2ED2B9',
  '&.active': {
    color: '#2ED2B9',
  },
}));

const NavBar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const toggleNav = () => {
    triggerAnimation();
    setIsNavOpen((prev) => !prev);
  };

  const closeNav = () => {
    if (isNavOpen) {
      triggerAnimation();
      setIsNavOpen(false);
    }
  };

  const handleNavigation = (path: string) => {
    closeNav();
    navigate(path);
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node) && isNavOpen) {
      closeNav();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isNavOpen]);

  const navItems: NavItem[] = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Account', icon: <AccountCircleIcon />, path: '/login' },
    { text: 'My Info', icon: <MedicalInformationOutlinedIcon />, path: '/my-info' },
    { text: 'Map', icon: <MapIcon />, path: '/map' },
    { text: 'Rewards', icon: <EmojiEventsIcon />, path: '/reward' },
    { text: 'Tips', icon: <TipsAndUpdatesIcon />, path: '/tips' },
    { text: 'Records', icon: <TourIcon />, path: '/time-tracking' },
  ];

  return (
    <Box sx={{ width: '100%' }} ref={navRef}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '0 2px 2px 0' }}>
        <AnimatedIconButton
          onClick={toggleNav}
          className={isNavOpen ? 'active' : ''}
          sx={{ 
            animation: isAnimating ? `${shakeAnimation} 0.3s ease-in-out` : 'none',
            '&:focus': {
              outline: 'none',
              boxShadow: 'none',
            },
          }}
        >
          {isNavOpen ? (
            <WidgetsIcon sx={{ fontSize: 28 }} />
          ) : (
            <WidgetsOutlinedIcon sx={{ fontSize: 28 }} />
          )}
        </AnimatedIconButton>
      </Box>
      <Box 
        sx={{ 
          opacity: isNavOpen ? 1 : 0,
          visibility: isNavOpen ? 'visible' : 'hidden',
          transition: 'opacity 300ms, visibility 300ms',
          position: 'absolute',
          right: 0,
          top: '40px',
          borderRadius: '0 0 0 10px',
          padding: '10px',
          zIndex: 1000,
          pointerEvents: isNavOpen ? 'auto' : 'none',
        }}
      >
        <List>
          {navItems.map((item, index) => (
            <ListItemButton
              key={item.text}
              sx={{
                padding: '11px 13px',
                backgroundColor: '#01344A',
                color: 'white',
                borderRadius: 4.5,
                border: 'solid 1.3px white',
                marginBottom: 1.1,
                marginRight: 0,
                boxShadow: `rgba(0, 0, 0, 0.25) 0px 14px 28px, 
                rgba(0, 0, 0, 0.22) 0px 10px 10px`,
                '&:hover': {
                  backgroundColor: '#26A69A',
                },
                opacity: isNavOpen ? 1 : 0,
                transform: `translateY(${isNavOpen ? 0 : '20px'})`,
                transition: `opacity 300ms ${index * 60}ms, transform 200ms ${index * 50}ms`,
              }}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon sx={{ minWidth: '30px', color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  marginLeft: '16px',
                  '& .MuiListItemText-primary': {
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '17px',
                    fontWeight: 'bold',
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default NavBar;