import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grow, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import TourIcon from '@mui/icons-material/Tour';

interface NavItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const NavBar: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setChecked(false);
  };

  const navItems: NavItem[] = [
    { text: 'Account', icon: <AccountCircleIcon />, path: '/login' },
    { text: 'Map', icon: <MapIcon />, path: '/' },
    { text: 'Rewards', icon: <EmojiEventsIcon />, path: '/reward' },
    { text: 'Tips', icon: <TipsAndUpdatesIcon />, path: '/health-tips' },
    { text: 'Places', icon: <TourIcon />, path: '/tour' },
  ];

  return (
    <div>
      <Button variant="contained" onClick={toggleChecked}>
        {checked ? 'Hide Nav' : 'Show Nav'}
      </Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
        <List>
          {navItems.map((item, index) => (
            <Grow
              key={item.text}
              in={checked}
              style={{ transformOrigin: 'top' }}
              timeout={(index + 1) * 250}
            >
              <ListItemButton
                sx={{
                  padding: '12px 15px',
                  backgroundColor: '#2ED2B9',
                  color: 'white',
                  borderRadius: 3,
                  marginBottom: 1.5,
                  marginRight: 1,
                  '&:hover': {
                    backgroundColor: '#26A69A',
                  },
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon sx={{ minWidth: '40px', color: 'white' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ marginLeft: '16px' }}
                  primaryTypographyProps={{ style: { fontSize: '16px' } }}
                />
              </ListItemButton>
            </Grow>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default NavBar;