import React, { useEffect, useState } from "react";
import { loader } from "./laoders";
import { useOutletContext, useParams } from "react-router";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const { searchVal, setLastReload, reloadSignal, setReloadSignal } =
    useOutletContext();

  const { postId } = useParams();

  useEffect(() => {
    async function fetchPosts(reload = false) {
      try {
        const { userData, loadTime } = await loader(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
          `comments-${postId}`,
          reload
        );
        setComments(userData);
        setLastReload(loadTime);
      } catch (error) {
        console.error("error fetching comments:", error);
      }
    }
    if (postId) {
      if (reloadSignal) {
        fetchPosts(true);
        setReloadSignal(false);
      } else {
        fetchPosts();
      }
    }
  }, [postId, setLastReload, reloadSignal, setReloadSignal]);

  let filteredComments = comments.filter(
    (comment) =>
      comment.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      comment.body.toLowerCase().includes(searchVal.toLowerCase())
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
        <h2>Comments here</h2>
      </div>

      {filteredComments?.map((comment) => (
        <div key={comment.id} className="post-card">
          <h2>{comment.name}</h2>
          <h4>{comment.email}</h4>
          <h4>{comment.body}</h4>
        </div>
      ))}
    </>
  );
}
