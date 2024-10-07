import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grow, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import TourIcon from '@mui/icons-material/Tour';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import WidgetsIcon from '@mui/icons-material/Widgets';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import { keyframes, styled } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
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
    { text: 'Home', icon: <HomeIcon />, path: '/' }, // Add Home item
    { text: 'Account', icon: <AccountCircleIcon />, path: '/login' },
    { text: 'My Info', icon: <MedicalInformationOutlinedIcon />, path: '/my-info' },
    { text: 'Map', icon: <MapIcon />, path: '/' },
    { text: 'Rewards', icon: <EmojiEventsIcon />, path: '/reward' },
    { text: 'Tips', icon: <TipsAndUpdatesIcon />, path: '/' },
    { text: 'Places', icon: <TourIcon />, path: '/' },
    { text: 'Records', icon: <AccessTimeIcon />, path: '/time-tracking' },
  ];

  return (
    <Box sx={{ width: '100%' }} ref={navRef}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '0 2 2 0' }}>
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
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
        <List>
          {navItems.map((item, index) => (
            <Grow
              key={item.text}
              in={isNavOpen}
              style={{ transformOrigin: 'top' }}
              timeout={(index + 1) * 200}
            >
              <ListItemButton
                sx={{
                  padding: '12px 15px',
                  backgroundColor: '#2ED2B9',
                  color: 'white',
                  borderRadius: 4,
                  marginBottom: 1.5,
                  marginRight: 1,
                  '&:hover': {
                    backgroundColor: '#26A69A',
                  },
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
            </Grow>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default NavBar;