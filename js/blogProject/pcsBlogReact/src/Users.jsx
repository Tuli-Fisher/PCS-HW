import React from "react";
import { loadUsers } from "./loaders.js";
import { useState } from "react";
import { useEffect } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const userData = await loadUsers();
      setUsers(userData);
    })();
  }, []);

  return <div>Users</div>;
}
