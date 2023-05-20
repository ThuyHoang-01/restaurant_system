import { Checkbox, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import numberWithCommas from '../../util/numberThousandSeparator'

const MenuDish = (props) => {
  const [checked, setChecked]= useState(false)
  
  useEffect(()=> {
    if(props?.selectMenu=== true) {
      setChecked(()=> true)
    }
    else if(props?.selectMenu=== false ) {
      setChecked(()=> false)
      
    }
  }, [props?.selectMenu])
  const handleSelect= (e)=> {
    if(e.target.checked=== true ) {
      setChecked(true)
    }
    else {
      setChecked(false)
    }
  }
  return (
    <Grid xs={12}>
        <div style={{width: '100%', display: "flex", height: 50, justifyContent: "space-between", alignItems: "center"}}>
            <div style={{fontSize: 18, fontWeight: 600}}>{props?.item?.dish_name}</div>
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{display: "flex", alignItems: "center", color: "#f00", fontSize: 18, fontWeight: 600}}>
                    {numberWithCommas(parseInt(props?.item?.price))} VNĐ
                </div>
                {/* <Checkbox onChange={handleSelect} checked={checked} placeholder={"Chọn món này"} /> */}
            </div>
        </div>
    </Grid>
  )
}

export default MenuDish