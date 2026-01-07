import React from "react";
import { useState, useEffect } from "react";
import { loader } from "./laoders";
import "./Users.css";
import { useNavigate, Outlet, useLocation } from "react-router";
import SearchBar from "./SearchBar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  //const [selectedUser, setSelectedUser] = useState(null);

  //const location = useLocation();

  // useEffect(() => {
  //   async function fetchUsers() {
  //     setSelectedUser(null);
  //     try {
  //       const users = await loader(
  //         "https://jsonplaceholder.typicode.com/users",
  //         "users"
  //       );
  //       setUsers(users);
  //     } catch (error) {
  //       console.error("error fetching users:", error);
  //     }
  //   }
  //   fetchUsers();

  //    async function backCheck() {
  //     if (location.pathname === "/users") {
  //       setSelectedUser(null);
  //     }
  //   }
  //   backCheck();

  // }, [location.pathname]);

  useEffect(() => {
    async function fetchUsers() {
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

  const navigate = useNavigate();

  const userClick = (userId) => {
    //setSelectedUser(userId);
    navigate(`/${userId}/posts`);
  };


  let filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      user.username.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <>
      <h1>Users</h1>
      <SearchBar
        value={searchVal}
        onSearchChange={setSearchVal}
        clearSearch={() => setSearchVal("")}
      />
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
