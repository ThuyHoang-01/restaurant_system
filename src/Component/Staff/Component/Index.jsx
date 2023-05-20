import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Home from '../../Admin/pages/home/Home'
import Info from './Infomation/Info'
// import Sidebar from './Sidebar/Sidebar'
import Topbar from './TopBar/TopBar'
import Payment from './Payment/Payment'
import Contact from './Contact/Contact'
import Home from '../../Home/Home'

const Index = () => {
  return (
    <>
      <Topbar />
      <div className="container-admin">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={"/info"} element={<Info />} />
          <Route path={"/payment"} element={<Payment />} />
          <Route path={"/contact"} element={<Contact />} />
        </Routes>
      </div>
    </>
  )
}

export default Index