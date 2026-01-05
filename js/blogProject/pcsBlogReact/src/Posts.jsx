import React, { useEffect, useState } from "react";
import { loader } from "./laoders";
import { useNavigate, useParams, Outlet, useLocation } from "react-router";
import "./Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    async function fetchPosts() {
      setPosts([]);
      try {
        const postResponse = await loader(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
          `posts-${userId}`
        );
        setPosts(postResponse);
      } catch (error) {
        console.error("error fetching posts:", error);
      }
    }
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  const location = useLocation();
  useEffect(() =>{
     async function backCheck() {
      if (location.pathname === `/users/${userId}/posts`) {
        setSelectedPost(null);
      }
    }
    backCheck();
  });

  const navigate = useNavigate();

  const postClick = (postId) => {
    setSelectedPost(postId);
    navigate(`${postId}/comments`);
  };

  return (
    <>
      {!selectedPost && (
        <>
          {" "}
          <div>Posts here</div>
          {posts?.map((post) => (
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
      )}

      <Outlet />
    </>
  );
}
