import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import User from "../User/User";

const Header = () => {
  return (
    <>
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
        <Navigation />
        <User />
      </div>
      <div style={{ height: 129 }}></div>
    </>
  );
};

export default Header;
