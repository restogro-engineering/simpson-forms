/** @format */

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

export default function SideMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const onMenuClick = (text) => {
    if (text === 'My Work List') {
      navigate('/');
    } else {
      navigate('/form/create/1/0');
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={() => setOpen(!open)}
      onKeyDown={() => setOpen(!open)}
    >
      <List>
        <div className='side-menu-header'>
          <img src={require('../../resources/logo.png')} width='120' />
          <IconButton onClick={() => setOpen(!open)}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </div>
        {['My Work List', 'New Requests'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => onMenuClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <DashboardIcon /> : <SettingsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={() => setOpen(!open)}>
        {open ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
        {list('left')}
      </Drawer>
    </div>
  );
}
