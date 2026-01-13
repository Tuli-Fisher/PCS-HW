import React from "react";
import { NavLink, useNavigate } from "react-router";
import "./Home.css";
import { useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleClick = () =>{
     if (userName === "testUser" && password === '123') {
      navigate('/users')
      }
  };
  return (
    <div id="home">
      <div id="login-div">
        <h2>Welcome to the PCS Blog</h2>
        <h2>Please Log In Below</h2>
        <label>
          UserName:
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="text"  value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleClick}>LOGIN</button>

        <div>Username: testUser | Password: 123</div>
      </div>
    </div>
  );
}
