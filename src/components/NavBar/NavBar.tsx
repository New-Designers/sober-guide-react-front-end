import React, { useState } from 'react';
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

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 150 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <ButtonBase onClick={() => alert('Account clicked')}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ButtonBase>
        </ListItem>
        <ListItem>
          <ButtonBase onClick={() => alert('Map clicked')}>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary="Map" />
          </ButtonBase>
        </ListItem>
        <ListItem>
          <ButtonBase onClick={() => alert('Events clicked')}>
            <ListItemIcon>
              <EmojiEventsIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ButtonBase>
        </ListItem>
        <ListItem>
          <ButtonBase onClick={() => alert('Tips clicked')}>
            <ListItemIcon>
              <TipsAndUpdatesIcon />
            </ListItemIcon>
            <ListItemText primary="Tips" />
          </ButtonBase>
        </ListItem>
        <ListItem>
          <ButtonBase onClick={() => alert('Tour clicked')}>
            <ListItemIcon>
              <TourIcon />
            </ListItemIcon>
            <ListItemText primary="Tour" />
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
