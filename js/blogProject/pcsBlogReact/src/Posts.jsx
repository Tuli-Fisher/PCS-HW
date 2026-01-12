import React, { useEffect, useState } from "react";
import { loader } from "./laoders";
import { useNavigate, useParams, Outlet, useLocation } from "react-router";
import "./Posts.css";
import SearchBar from "./SearchBar";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  //const [selectedPost, setSelectedPost] = useState(null);

  const { userId } = useParams();
  //const location = useLocation();

  // useEffect(() => {
  //   async function fetchPosts() {
  //     setPosts([]);
  //     try {
  //       const postResponse = await loader(
  //         `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  //         `posts-${userId}`
  //       );
  //       setPosts(postResponse);
  //     } catch (error) {
  //       console.error("error fetching posts:", error);
  //     }
  //   }
  //   if (userId) {
  //     fetchPosts();
  //   }

  //   async function backCheck() {
  //     if (location.pathname === `/users/${userId}/posts`) {
  //       setSelectedPost(null);
  //     }
  //   }
  //   backCheck();
  // }, [location.pathname, userId]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const {userData, loadTime} = await loader(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
          `posts-${userId}`
        );
        setPosts(userData);
      } catch (error) {
        console.error("error fetching posts:", error);
      }
    }
    if (userId) {
      fetchPosts();
    }
  }, []);

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
      {/* {!selectedPost && (
        <>
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

      <Outlet /> */}

      <div>Posts here</div>
      <SearchBar
        value={searchVal}
        onSearchChange={setSearchVal}
        //clearSearch={() => setSearchVal("")}
      />
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
