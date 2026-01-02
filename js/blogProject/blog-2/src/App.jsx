import { useState } from "react";
import "./App.css";
import Users from "./Users";
import Posts from "./Posts";

function App() {
  const [userId , setUserId] = useState();


  return (
    <div className="app">
      <header>Pcs Blog</header>
      <div id="main-container">
        <Users userSelected={setUserId}/>
        <Posts userId={userId}/>
      </div>
      <footer>Pcs 2025</footer>
    </div>
  );
}

export default App;
