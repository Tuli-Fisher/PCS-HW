import React from "react";
import "./App.css";
import { Link, Outlet } from "react-router";
import AddDisplay from "./AddDisplay";

function App() {

  return (
    <div id="app">
      <header>
        <Link to={"/"}>PCS BLOG</Link>
      </header>
      <aside id="left-aside">
        MOCK ADDS
        <AddDisplay />
      </aside>
      <div id="main-container">
        <Outlet />
      </div>
      <aside id="right-aside"></aside>
      <footer>Pcs 2025</footer>
    </div>
  );
}

export default App;
