import { Menu, MenuItem } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import "./topbar.css";
import InfoAdmin from "./InfoAdmin";

export default function Topbar(props) {
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
            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: 10}}>
            {
              props?.is_admin=== true && 
            <InfoAdmin {...props} />
            }
            <MenuItem onClick={()=> {
              handleClose()
              Logout()
            }}>Đăng xuất</MenuItem>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
}


