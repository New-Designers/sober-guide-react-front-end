import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import TourIcon from '@mui/icons-material/Tour';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './NavBar.module.css';

// 使用 styled API 创建自定义的 Drawer 组件
const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: '#2ED2B9',
    color: 'white',
  },
}));

const NavBar: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const list = () => (
    <Box
      sx={{ width: 190 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          { text: 'Account', icon: <AccountCircleIcon />, path: '/login' },
          { text: 'Map', icon: <MapIcon />, path: '/' },
          { text: 'Rewards', icon: <EmojiEventsIcon />, path: '/reward' },
          { text: 'Health Tips', icon: <TipsAndUpdatesIcon />, path: '/health-tips' },
          { text: 'Places', icon: <TourIcon />, path: '/tour' },
        ].map((item) => (
          <ListItem 
            key={item.text} 
            onClick={() => handleNavigation(item.path)}
            sx={{ padding: '16px 24px' }}
          >
            <ListItemIcon sx={{ minWidth: '40px', color: 'white' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ marginLeft: '16px', color: 'white' }}
              primaryTypographyProps={{ style: { fontSize: '16px' } }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="nav-bar">
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ color: '#2ED2B9' }}
      >
        <MenuIcon />
      </IconButton>
      <CustomDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </CustomDrawer>
    </div>
  );
};

export default NavBar;