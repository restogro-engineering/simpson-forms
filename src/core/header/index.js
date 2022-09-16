import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Drawer } from "@mui/material";
import "./index.scss";
import { clearOfflineData } from "../../utils/offline-services";
import SideMenu from "../side-menu";
import { MOBILE_MENU } from "../side-menu/config";

const Header = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const logout = () => {
    clearOfflineData("user");
    navigate("/login");
  };
  return (
    <div className='header-container'>
      <div>
        <IconButton onClick={() => setOpenMenu(true)}>
          <MenuIcon style={{ color: "white" }} />
        </IconButton>
        LOGO
      </div>
      <div>
        <IconButton onClick={logout}>
          <LogoutIcon style={{ color: "white" }} />
        </IconButton>
      </div>

      <Drawer open={openMenu} onClose={() => setOpenMenu(false)}>
        <SideMenu
          options={MOBILE_MENU}
          onMenuCLick={() => setOpenMenu(false)}
        />
      </Drawer>
    </div>
  );
};

export default Header;
