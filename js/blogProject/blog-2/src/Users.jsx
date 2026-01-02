import React from "react";
import { loadUsers } from "./laoders";
import { useState } from "react";
import { useEffect } from "react";
import './Users.css';

export default function Users(props) {
  const [users, setUsers] = useState([]);

  useEffect(() =>{
    (async () =>{
        const userData = await loadUsers();
        setUsers(userData);
    })();
  },[]);

  return(
    <>
      <h1>Users</h1>
      { users?.map( (user) =>
        <div className="user_card" onClick={() => props.setUserId(user.id)}  key={user.id}>
            <h2>{user.name.toUpperCase()}</h2>
            <h4>{user.username}</h4>
            <h4>{user.email}</h4>
        </div>
    )}
    </>
  );
}
