import React, { useState } from "react";
import "./AddPost.css";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [success, setSuccess] = useState(false);

  async function submitLogic(e) {
    e.preventDefault();

    const post = {
      title,
      body,
    };
    try {
      const response = await fetch("http://localhost:8080/addPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      console.log(response);

      if (response.ok) {
        setSuccess(true);
      }

      setTitle("");
      setBody("");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div>AddPost</div>

      <div>
        {success && <div className="succes-div">Post added successfully!</div>}

        <form onSubmit={submitLogic}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Body:
            <textarea
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </label>
          <button type="submit">Add Post</button>
        </form>
      </div>
    </>
  );
}
