import "./sidebar.css";
import { NavLink as Link, NavLink, useNavigate } from "react-router-dom";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import EqualizerIcon from '@mui/icons-material/Equalizer';
// import Navigation from "../../../Navigation/Navigation";
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { ComponentNavigation } from "../../../Navigation/Navigation";
import Logo from "../../../Logo/Logo";
import User from "../../../User/User";
import { AppContext } from "../../../../App";
import { useContext } from "react";
import Category from "../../../Navigation/NavigationCategory";
import  {AiFillBook } from "react-icons/ai"

export default function Sidebar() {
  const { isOrderOnlyMenu }= useContext(AppContext)
  const navigate= useNavigate()
  
  return (
    <div className="aaa">
    <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 9%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          background: "#fff",
          borderBottom: "1px solid #e7e7e7",
        }}
      >
        <Logo />
        <div style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
            
            <NavLink to={"/"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
              <div onClick={()=> navigate("/")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
                <ComponentNavigation title={"Trang chủ"} icon={<HomeIcon />} />
              </div>
            </NavLink>
            {/* <div onClick={()=> navigate("/blog")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
              <ComponentNavigation title={"Bài viết"} icon={<BookIcon />} />
            </div> */}
            <NavLink to={"/order"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
              <div onClick={()=> navigate("/order")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
                <ComponentNavigation title={"Đặt bàn"} icon={<BorderAllIcon />} />
              </div>
            </NavLink>
            <Category is_staff={true} />
            {
              isOrderOnlyMenu=== false &&
              <NavLink to={"/banquet-hall"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
                <div onClick={()=> navigate("/banquet-hall")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
                  <ComponentNavigation title={"Đặt sảnh"} icon={<RoomServiceIcon />} />
                </div>
              </NavLink>
            }
            <NavLink to={"/staff/contact"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
              <div onClick={()=> navigate("/staff/contact")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
                <ComponentNavigation title={"Yêu cầu đặt tiệc"} icon={<AiFillBook />} />
              </div>
            </NavLink>
            <NavLink to={"/staff/payment"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
              <div onClick={()=> navigate("/staff/payment")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
                <ComponentNavigation icon={<EqualizerIcon style={{width: 20}} className="sidebarIcon" />} title={"Thanh toán"} />
              </div>
            </NavLink>
            <NavLink to={"/staff/info"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
              <div onClick={()=> navigate("/staff/info")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
                <ComponentNavigation icon={<LoyaltyIcon style={{width: 20}} className="sidebarIcon" />} title={"Thông tin cá nhân"} />
              </div>
            </NavLink>
        </div>
        <User />
      </div>
    </div>
  );
}
