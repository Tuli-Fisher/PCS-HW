import React from "react";
import { NavLink } from "react-router";
import "./Home.css";

export default function Home() {
  return (
    <div id="home">
      <h1>Welcome to the PCS blog!</h1>
      <NavLink to="/users" className="btn">
        {" "}
        Click here to hear what people are saying
      </NavLink>
    </div>
  );
}
