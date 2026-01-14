import React from "react";
import { useState, useEffect } from "react";
import { loader } from "./laoders";
import "./Users.css";
import { useNavigate, useOutletContext } from "react-router";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { searchVal, setLastReload, reloadSignal, setReloadSignal } = useOutletContext();

  useEffect(() => {
    async function fetchUsers(reload = false) {
      try {
        const { userData, loadTime } = await loader(
          "https://jsonplaceholder.typicode.com/users",
          "users",
          reload
        );
        setUsers(userData);
        setLastReload(loadTime);
      } catch (error) {
        console.error("error fetching users:", error);
      }
    }
    if(reloadSignal){
      fetchUsers(true);
      setReloadSignal(false)
    }else{
      fetchUsers();
    }
    
  }, [setLastReload, reloadSignal, setReloadSignal]);

  const navigate = useNavigate();

  const userClick = (userId) => {
    navigate(`/${userId}/posts`);
  };

  let filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      user.username.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h1>Users</h1>
      </div>
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className="user-card"
          onClick={() => userClick(user.id)}
        >
          <h2>{user.name}</h2>
          <h4>{user.username}</h4>
          <h4>{user.email}</h4>
        </div>
      ))}
    </>
  );
}
