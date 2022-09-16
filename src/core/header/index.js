/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logout from '@mui/icons-material/Logout';
import './index.scss';
import {
  clearOffllineData,
  getOfflineData,
} from '../../utils/offline-services';
import SideMenu from './side-menu';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    let user = getOfflineData('user');
    setUserDetails(user);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    clearOffllineData('user');
    navigate('/login');
  };
  return (
    <div className='header-container'>
      <div className='r-c'>
        <SideMenu />
        <img src={require('../../resources/logo.png')} width='120' />
      </div>

      <div className='left-c'>
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
        <Button
          type='small'
          variant='text'
          onClick={(event) => setAnchorEl(event.currentTarget)}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {userDetails.name}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
