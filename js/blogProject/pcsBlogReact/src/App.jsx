import React from "react";
import "./App.css";
import { Link, Outlet, useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

  return (
    <div id="app">
      <header>
        <Link to={"/"}>PCS BLOG</Link>
      </header>
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
