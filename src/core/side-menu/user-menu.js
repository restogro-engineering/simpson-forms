import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, ListItemIcon } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import "./index.scss";
import {
  clearOfflineData,
  getOfflineData
} from "../../utils/offline-services";

const UserMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    let user = getOfflineData("user");
    setUserDetails(user);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    clearOfflineData("user");
    navigate("/login");
  };
  return (
    <div className='user-menu-container'>
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
      <Button
        type='small'
        variant='text'
        onClick={event => setAnchorEl(event.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <span
          style={{
            color: "#fff"
          }}
        >
          {userDetails.name}
        </span>
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
          <span>Logout</span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
