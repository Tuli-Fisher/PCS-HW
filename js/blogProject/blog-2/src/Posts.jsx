import React from "react";
import { loadMoreInfo } from "./laoders";
import { useState } from "react";
import { useEffect } from "react";

export default function Users(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const userData = await loadMoreInfo("posts", props.userId);
      setPosts(userData);
    })();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      {posts?.map((post) => (
        <div className="user_card">
          <h4>{post.title}</h4>
          <h4>{post.body}</h4>
        </div>
      ))}
    </>
  );
}
