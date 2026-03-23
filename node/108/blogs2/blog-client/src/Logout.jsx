import React from "react";

export default function Logout(props) {
  const { setUserName, userName } = props;

  function handleClick() {
    setUserName(null);
    const response = fetch("http://localhost:8080/logout", {
      method: 'POST',
      credentials: "include",
    });
  }

  return (
    <div>
      logged in as {userName}
      <button onClick={() => handleClick()}>Logout</button>
    </div>
  );
}
