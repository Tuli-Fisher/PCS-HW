import { loadMoreInfo } from "./laoder";
import { loadUsers } from "./laoder";

const usersContainer = document.querySelector(".users-container");
const postsContainer = document.querySelector(".posts-container");
const backButton = document.querySelector("#backButton");

let lastFunction = [];

export default async function displayUsers() {
  let users = await loadUsers("https://jsonplaceholder.typicode.com/users");
  Array.isArray(users) || (users = [users]);

  ///////check if this is empty
  if(!users) {
    errorMessage('error loading users');
    return;
  };

  backButton.classList.add("hide");
  usersContainer.classList.remove("hide");
  postsContainer.classList.add("hide");

  users.forEach((user) => {
    //console.log(user.name);
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-card");
    userDiv.innerHTML = `
            <h2>${user.name}</h2>
            <h4>${user.username}</h4>
            <h4>${user.email}</h4>`;

    userDiv.addEventListener("click", () => {
      lastFunction.push([displayUsers]);
      displayPosts(user.id, user.name);
    });

    usersContainer.appendChild(userDiv);
  });
}

async function displayPosts(userId, userName) {
  let posts = await loadMoreInfo("posts", userId);
  Array.isArray(posts) || (posts = [posts]);

  //console.log("posts for user ", userId, posts);
  usersContainer.classList.add("hide");
  backButton.classList.remove("hide");
  postsContainer.classList.remove("hide");
  postsContainer.innerHTML = `<h1>Heres what ${userName} has to say   `;

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post-card");

    postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>`;

    postDiv.addEventListener("click", () => {
      lastFunction.push([displayPosts, [userId, userName]]);
      displayComments(post.id);
    });

    postsContainer.appendChild(postDiv);
  });
}

async function displayComments(postId) {
  let posts = await loadMoreInfo("comments", postId);
  Array.isArray(posts) || (posts = [posts]);

  postsContainer.innerHTML = `<h1>Heres what people think about post ${postId} -  `;

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post-card");

    postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>`;

    postsContainer.appendChild(postDiv);
  });

  //lastFunction.push(["displayComments", postId]);
}

backButton.addEventListener("click", () => {
  let last = lastFunction.pop();
  if (!last) {
    return;
  }
  last[0](...(last[1] || []));
});

function errorMessage(message){
    usersContainer.innerHTML = `<h2 style="color:red;">${message}</h2>`;
};