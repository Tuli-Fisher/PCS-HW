import React from "react";
import "./App.css";
import { useState } from "react";
import Users from "./Users.jsx";
import { Outlet } from "react-router";

function App() {
  return (
    <div id="app">
      <header>hello world</header>
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
