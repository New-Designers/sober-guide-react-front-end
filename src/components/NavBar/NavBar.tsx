import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, ButtonBase } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import TourIcon from '@mui/icons-material/Tour';
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.module.css';

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
        <ListItem>
          <ButtonBase onClick={() => handleNavigation('/login')}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ButtonBase>
        </ListItem>
        <ListItem>
          <ButtonBase onClick={() => handleNavigation('/')}>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary="Map" />
          </ButtonBase>
        </ListItem>
        <ListItem>
          <ButtonBase onClick={() => handleNavigation('/reward')}>
            <ListItemIcon>
              <EmojiEventsIcon />
            </ListItemIcon>
            <ListItemText primary="Rewards" />
          </ButtonBase>
        </ListItem>
        <ListItem>
          <ButtonBase onClick={() => handleNavigation('/health-tips')}>
            <ListItemIcon>
              <TipsAndUpdatesIcon />
            </ListItemIcon>
            <ListItemText primary="Health Tips" />
          </ButtonBase>
        </ListItem>
        <ListItem>
          <ButtonBase onClick={() => handleNavigation('/tour')}>
            <ListItemIcon>
              <TourIcon />
            </ListItemIcon>
            <ListItemText primary="Places" />
          </ButtonBase>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="nav-bar">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
};

export default NavBar;