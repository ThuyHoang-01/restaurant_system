// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Signup from './Component/Signup/Signup';
import { createContext, useEffect, useState } from 'react';
import authUser from './api/auth';
import Cart from './Component/Cart/Cart';
import Admin from './Component/Admin/Admin';
import Staff from './Component/Staff/Staff';
import Order from './Component/Order/Order';
import Menu from './Component/Menu/Menu';
import BanquetHall from './Component/BanquetHall/BanquetHall';
import { SnackbarProvider } from 'notistack';
import NotFound from './Component/NotFound/NotFound';
import AboutUs from './Component/Home/AboutUs/AboutUs';
import News from './Component/News/News';
import DetailNew from './Component/DetailNew/DetailNew';

export const AppContext= createContext()
function App() {
  const [auth, setAuth]= useState()
  const [user, setUser]= useState()
  const [change, setChange]= useState(false)
  const [orderId, setOrderId]= useState()
  const [isOrderOnlyMenu, setIsOrderOnlyMenu]= useState(false)
  useEffect(()=> {
    (async ()=> {
      const result= await authUser()
      if(result.auth=== true) {
        // console.log(result)
        setAuth(()=> true)
        setUser(()=> result)
      }
      else {
        setAuth(()=> false)
      }
    })()
  }, [change])
  return (
    <SnackbarProvider autoHideDuration={3000} maxSnack={3}>
      <AppContext.Provider value={{auth, user, setChange, setOrderId, orderId, isOrderOnlyMenu, setIsOrderOnlyMenu}}>
        <Router>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path={"/admin/*"} element={<Admin />} />
            <Route path={"/staff/*"} element={<Staff />} />
            <Route path={"/order/:category_id"} element={<Order />} /> 
            <Route path={"/order/"} element={<Order />} /> 
            <Route path={"/menu/*"} element={<Menu />} />
            <Route path={"/menu/:category_id"} element={<Menu />} />
            <Route path={"/banquet-hall/*"} element={<BanquetHall />} />
            <Route path={"*"} element={<Navigate replace={true} to={"/404"} />} />
            <Route path={"/about"} element={<AboutUs />} />
            <Route path={"/news"} element={<News />} />
            <Route path={"/news/:new_id"} element={<DetailNew />} />
            <Route path={"/404"} element={<NotFound />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </SnackbarProvider>
  );
}

export default App;
