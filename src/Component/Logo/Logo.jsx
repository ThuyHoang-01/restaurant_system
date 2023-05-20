import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  const navigate= useNavigate()

  return (
    <div onClick={()=> navigate("/")} className={"c-flex-center"} style={{gap: 16, cursor: "pointer"}}>
      <img src="https://res.cloudinary.com/cockbook/image/upload/v1676558484/Screenshot_2023-02-16_213600_ou84ld.png" alt="" />
      <div style={{fontSize: 24, fontWeight: 600}}>Yummy</div>
    </div>
  )
}

export default Logo