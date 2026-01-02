import React from "react";
import { NavLink, Outlet } from "react-router";
import './Sell.css';

export default function Sell() {
  return (
    <div className="sell-class">
      <div>
        <h1>Are you looking to sell your home? </h1>
        <h2>Then you at the right place!</h2>
        <h2>1,000's of homes sold</h2>
        <NavLink to={"john"}> speak to john</NavLink> |{" "}
        <NavLink to={"jack"}> speak to jack</NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
