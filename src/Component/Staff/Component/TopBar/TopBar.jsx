import { Menu, MenuItem } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./topbar.css";

export default function Topbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };
  const Logout= ()=> {
    Cookies.remove("uid")
    window.location.href= window.location.origin
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Yummy</span>
        </div>
        <div style={{color: "#000"}}>
          <Sidebar />

        </div>
        <div className="topRight">
          <div onClick={handleClick} className="topbarIconContainer">
            <img src="https://thumbs.dreamstime.com/b/user-glyph-icon-web-mobile-admin-sign-vector-graphics-solid-pattern-white-background-eps-user-glyph-icon-web-mobile-103294421.jpg" alt="" className="topAvatar" />
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={()=> {
              handleClose()
              Logout()
            }}>Đăng xuất</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
