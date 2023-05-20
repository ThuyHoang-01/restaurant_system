import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
// import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import { Box } from '@mui/system';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { AppContext } from '../../App';
import Sidebar from '../Staff/Component/Sidebar/Sidebar';
import Category from './NavigationCategory';
import  {GrContact } from "react-icons/gr"
import { IoIosBrowsers } from "react-icons/io"
import {BiNews } from "react-icons/bi"

const Navigation = () => {

  const navigate= useNavigate()
  const {user }= useContext(AppContext)
  return (
    <>
      {
        user?.isEmployee=== true ? <Sidebar /> : 
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
            <Category />
            <NavLink to={"/banquet-hall"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
              <div onClick={()=> navigate("/banquet-hall")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
                <ComponentNavigation title={"Đặt sảnh"} icon={<RoomServiceIcon />} />
              </div>
            </NavLink>
            <NavLink to={"/about"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
              <div onClick={()=> navigate("/about")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
                <ComponentNavigation title={"Liên hệ đặt tiệc"} icon={<GrContact />} />
              </div>
            </NavLink>
            <NavLink to={"/news"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
              <div onClick={()=> navigate("/news")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
                <ComponentNavigation title={"Tin tức"} icon={<BiNews />} />
              </div>
            </NavLink>
        </div>
      }
    </>
  )
}

export const ComponentNavigation= (props)=> {
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: 1}}>
      {props?.icon}
      <div>{props?.title}</div>
    </Box>
  )
}

export default Navigation