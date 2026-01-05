import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { loader } from "./laoders";
import "./Users.css";
import { useNavigate, Outlet, useLocation } from "react-router";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const location = useLocation();

  useEffect(() => {
    async function fetchUsers() {
      setSelectedUser(null);
      try {
        const users = await loader(
          "https://jsonplaceholder.typicode.com/users",
          "users"
        );
        setUsers(users);
      } catch (error) {
        console.error("error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    async function backCheck() {
      if (location.pathname === "/users") {
        setSelectedUser(null);
      }
    }
    backCheck();
  }, [location.pathname]);

  const navigate = useNavigate();

  const userClick = (userId) => {
    setSelectedUser(userId);
    navigate(`${userId}/posts`);
  };

  return (
    <>
      {!selectedUser && (
        <>
          <h1>Users here</h1>
          {users.map((user) => (
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
      )}

      <Outlet />
    </>
  );
}
