import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Users from "./Users.jsx";
import Home from "./Home.jsx";
import Posts from "./Posts.jsx";
import Comments from "./Comments.jsx";
import SearchBar from "./SearchBar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          {/* <Route path="users" element={<Users />}>
            <Route path=":userId/posts" element={<Posts />}>
              <Route path=":postId/comments" element={<Comments />}>
              </Route>
            </Route>
          </Route> */}
          <Route element={<SearchBar />} >
            <Route path="users" element={<Users />} />
            <Route path=":userId/posts" element={<Posts />} />
            <Route path=":postId/comments" element={<Comments />} />
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
