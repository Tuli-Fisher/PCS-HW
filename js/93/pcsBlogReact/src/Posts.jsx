import React, { useEffect, useState } from "react";
import { loader, loadUser } from "./laoders";
import { useNavigate, useParams, useOutletContext } from "react-router";
import "./Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const { searchVal, setLastReload, reloadSignal, setReloadSignal } =
    useOutletContext();

  const { userId } = useParams();

  useEffect(() => {
    async function fetchPosts(reload = false) {
      try {
        const { userData, loadTime } = await loader(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
          `posts-${userId}`,
          reload
        );
        setPosts(userData);
        setLastReload(loadTime);

        let user = await loadUser(userId);
        setUserInfo(user);

        setLoading(false);
      } catch (error) {
        console.error("error fetching posts:", error);
      }
    }

    if (userId) {
      if (reloadSignal) {
        fetchPosts(true);
        setReloadSignal(false);
      } else {
        fetchPosts();
      }
    }
  }, [userId, setLastReload, reloadSignal, setReloadSignal]);

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

  const { name, username, email } = userInfo;
  return (
    <>
      {loading && <h1>Loading... </h1>}
      {!loading && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Posts here</h2>
            <br />
            {userInfo && (
              <>
                <h2>{name}</h2>
                <h3>{username}</h3>
                <h3>{email}</h3>
              </>
            )}
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
      )}
    </>
  );
}
