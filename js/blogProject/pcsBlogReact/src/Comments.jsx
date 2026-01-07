import React, { useEffect, useState } from "react";
import { loader } from "./laoders";
import { useLocation, useParams } from "react-router";

export default function Comments() {
  const [comments, setComments] = useState([]);

  const { postId } = useParams();
  //const location = useLocation();

  // useEffect(() => {
  //   async function fetchPosts() {
  //     try {
  //       const commentResponse = await loader(
  //         `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
  //         `comments-${postId}`
  //       );
  //       setComments(commentResponse);
  //     } catch (error) {
  //       console.error("error fetching comments:", error);
  //     }
  //   }
  //   if (postId) {
  //     fetchPosts();
  //   }
  // }, [location.pathname, postId]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const commentResponse = await loader(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
          `comments-${postId}`
        );
        setComments(commentResponse);
      } catch (error) {
        console.error("error fetching comments:", error);
      }
    }
    if (postId) {
      fetchPosts();
    }
  }, []);

  return (
    <>
      <div>comments here</div>
      {comments?.map((comment) => (
        <div key={comment.id} className="post-card">
          <h2>{comment.name}</h2>
          <h4>{comment.email}</h4>
          <h4>{comment.body}</h4>
        </div>
      ))}
    </>
  );
}
