import React from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

  const homeClick = () =>{
    navigate('/');
  };

  return (
    <div id="app">
      <header><span onClick={homeClick}>PCS BLOG</span></header>
      <aside id="left-aside"></aside>
      <div id="main-container">
        <Outlet />
      </div>
      <aside id="right-aside"></aside>
      <footer>Pcs 2025</footer>
    </div>
  );
}

export default App;
