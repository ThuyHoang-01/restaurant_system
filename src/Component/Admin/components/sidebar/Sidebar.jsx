import "./sidebar.css";
import {
  PermIdentity,
  // eslint-disable-next-line
  WorkOutline,
  // eslint-disable-next-line
} from "@material-ui/icons";
import { NavLink as Link } from "react-router-dom";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LiquorIcon from "@mui/icons-material/Liquor";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import swal from "sweetalert";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin/" className="link">
              {({ isActive }) => (
                <li
                  className={`sidebarListItem ${
                    isActive === true ? "active" : ""
                  }`}
                >
                  <EqualizerIcon className="sidebarIcon" />
                    Doanh thu
                </li>
              )}
            </Link>
            <Link to="/admin/news" className="link">
              {({ isActive }) => (
                <li
                  className={`sidebarListItem ${
                    isActive === true ? "active" : ""
                  }`}
                >
              <LoyaltyIcon className="sidebarIcon" />
              Khuyến mãi
                </li>
              )}
            </Link>
            
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý người dùng</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              {({ isActive }) => (
                <li
                  className={`sidebarListItem ${
                    isActive === true ? "active" : ""
                  }`}
                >
                  <PermIdentity className="sidebarIcon" />
                  Khách hàng
                </li>
              )}
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý nhà hàng</h3>
          <ul className="sidebarList">
            <Link to="/admin/banquet-hall" className="link">
              {({ isActive }) => (
                <li
                  className={`sidebarListItem ${
                    isActive === true ? "active" : ""
                  }`}
                >
                  <LiquorIcon className="sidebarIcon" />
                  Sảnh tiệc
                </li>
              )}
            </Link>
            <Link to="/admin/dish" className="link">
              {({ isActive }) => (
                <li
                  className={`sidebarListItem ${
                    isActive === true ? "active" : ""
                  }`}
                >
                  <FastfoodIcon className="sidebarIcon" />
                  Món ăn
                </li>
              )}
            </Link>
            <Link to="/admin/menu" className="link">
              {({ isActive }) => (
                <li
                  className={`sidebarListItem ${
                    isActive === true ? "active" : ""
                  }`}
                >
                  <RestaurantMenuIcon className="sidebarIcon" />
                  Menu
                </li>
              )}
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý nhân viên</h3>
          <ul className="sidebarList">
            <Link to="/admin/staff" className="link">
              {({ isActive }) => (
                <li
                  className={`sidebarListItem ${
                    isActive === true ? "active" : ""
                  }`}
                >
                  <WorkOutline className="sidebarIcon" />
                  Nhân viên
                </li>
              )}
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý kho</h3>
          <ul className="sidebarList">
            <Link onClick={(e)=> {
              e.preventDefault()
              swal("Thông báo", "Chức năng đang được xây dựng")
            }
            } to="/admin/warehouse" className="link">
              {({ isActive }) => (
                <li
                  className={`sidebarListItem ${
                    isActive === true ? "active" : ""
                  }`}
                >
                  <WorkOutline className="sidebarIcon" />
                  Kho
                </li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
