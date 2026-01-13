import React, { useEffect, useState } from "react";
import { loader } from "./laoders";
import { useNavigate, useParams, useOutletContext } from "react-router";
import "./Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { searchVal, setLastReload } = useOutletContext();

  const { userId } = useParams();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { userData, loadTime } = await loader(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
          `posts-${userId}`
        );
        setPosts(userData);
        setLastReload(loadTime);
      } catch (error) {
        console.error("error fetching posts:", error);
      }
    }
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  const navigate = useNavigate();

  const postClick = (postId) => {
    //setSelectedPost(postId);
    navigate(`/${postId}/comments`);
  };

  let filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchVal.toLowerCase()) ||
      post.body.toLowerCase().includes(searchVal.toLowerCase())
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
        <h2>Posts here</h2>
      </div>
      {filteredPosts?.map((post) => (
        <div
          key={post.id}
          className="post-card"
          onClick={() => postClick(post.id)}
        >
          <h2>{post.title}</h2>
          <h4>{post.body}</h4>
        </div>
      ))}
    </>
  );
}
