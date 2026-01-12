import React, { useEffect, useState } from "react";
import { loader } from "./laoders";
import { useLocation, useParams } from "react-router";
import SearchBar from "./SearchBar";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [searchVal, setSearchVal] = useState('');

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
        const {userData} = await loader(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
          `comments-${postId}`
        );
        setComments(userData);
      } catch (error) {
        console.error("error fetching comments:", error);
      }
    }
    if (postId) {
      fetchPosts();
    }
  }, []);

  let filteredComments = comments.filter(
    (comment) =>
      comment.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      comment.body.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <>
      <div>comments here</div>
      <SearchBar value={searchVal} onSearchChange={setSearchVal} />
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
