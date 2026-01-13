import React, { useEffect, useState } from "react";
import { loader } from "./laoders";
import { useOutletContext, useParams } from "react-router";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const {searchVal, setLastReload} = useOutletContext();

  const { postId } = useParams();
 

  useEffect(() => {
    async function fetchPosts() {
      try {
        const {userData, loadTime} = await loader(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
          `comments-${postId}`
        );
        setComments(userData);
        setLastReload(loadTime);
      } catch (error) {
        console.error("error fetching comments:", error);
      }
    }
    if (postId) {
      fetchPosts();
    }
  }, [postId]);

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
