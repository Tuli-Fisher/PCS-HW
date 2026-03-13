import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './Posts.css';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:8080/posts");
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const posts = await response.json();
        //console.log(posts);
        setPosts(posts);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
      <div>Posts</div>
      {posts.map((post) => (
        <div key={post._id} className="post-div">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <hr />
          <span>{` posted at: ${new Date(post.time)} by ${post.author}`}</span>
        </div>
      ))}
    </>
  );
}
