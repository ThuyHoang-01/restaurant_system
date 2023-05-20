import * as React from 'react';
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ComponentNavigation } from './Navigation';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { useState } from 'react';
import { useEffect } from 'react';
import get_category from '../../api/get_category';
import { useNavigate } from 'react-router-dom';
import FoodOnDemand from './FoodOnDemand';
import {AiOutlineMenu } from "react-icons/ai"

export default function Category() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData]= useState([])
  useEffect(()=> {
    (async ()=> {
        const result= await get_category()
        return setData(result)
    })()
  }, [])
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate= useNavigate()

  return (
    <div>
      <div onClick={handleClick} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
          <ComponentNavigation title={"Thực đơn"} icon={<AiOutlineMenu />} />
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
        <div style={{display: "flex"}}>
          <div>
            <MenuItem onClick={()=> {navigate("/menu");handleClose()}}>Tất cả món ăn</MenuItem>
            {
                data?.slice(0, 6)?.map((item, key)=> <MenuItem onClick={()=> {navigate("/menu/"+ item?.category_id); handleClose()}} key={key}>{item?.category_name}</MenuItem>)
            }
          </div>
          {/*  */}
          <div>
            <MenuItem onClick={()=> {navigate("/menu")}}>
              <FoodOnDemand handleClose={handleClose} />
            </MenuItem>
          </div>
        </div>
      </Menu>
    </div>
  );
}