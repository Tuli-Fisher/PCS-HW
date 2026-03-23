import { useState } from "react";
import "./Authentication.css";
import Logout from "./logout";
import Login from "./Login";
import { useEffect } from "react";

export default function Authentication() {
  const [userName, setUserName] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8080/me", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserName(data.userName);
      } else {
        setUserName(null); // not logged in
      }
    })();
  }, []);

  return (
    <div id="authentication">
      {userName ? (
        <Logout setUserName={setUserName} userName={userName} />
      ) : (
        <Login setUserName={setUserName} />
      )}
    </div>
  );
}
