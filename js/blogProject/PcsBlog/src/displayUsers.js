import { loadMoreInfo } from "./laoder";
import { loadUsers } from "./laoder";

const usersContainer = document.querySelector(".users-container");
const postsContainer = document.querySelector(".posts-container");
const backButton = document.querySelector("#backButton");
const reloadButton = document.querySelector("#reload-button");
const sortButton = document.querySelector("#sort-select");
const searchButton = document.querySelector('#search-button');

let lastFunction = [];
let currentFunction;

export default async function displayUsers(reload = false) {
  currentFunction = displayUsers;

  let users = await loadUsers(
    "https://jsonplaceholder.typicode.com/users",
    reload
  );

  ///////check if this is empty
  // still needs work
  if (!users) {
    errorMessage("error loading users");
    return;
  }

  users = sortOutput(users);
  Array.isArray(users) || (users = [users]);

  backButton.classList.add("hide");
  sortButton.classList.remove('hide');
  usersContainer.classList.remove("hide");
  postsContainer.classList.add("hide");

  usersContainer.innerHTML = "";
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

async function displayPosts(userId, userName, reload) {
  currentFunction = () => displayPosts(userId);

  let posts = await loadMoreInfo("posts", userId, reload);
  if(!posts){
    errorMessage('error loading posts');
    return;
  }
  Array.isArray(posts) || (posts = [posts]);
  //posts = sortOutput(posts);

  //console.log("posts for user ", userId, posts);

  usersContainer.classList.add("hide");
  sortButton.classList.add('hide');
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

async function displayComments(postId, reload) {
  currentFunction = () => displayComments(postId);

  let posts = await loadMoreInfo("comments", postId, reload);
  if(!posts){
    errorMessage('error loading comments');
    return;
  }
  Array.isArray(posts) || (posts = [posts]);
  posts = sortOutput(posts);

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

reloadButton.addEventListener("click", async () => {
  currentFunction(true);
});

sortButton.addEventListener("change", async () => {
  currentFunction();
});

function errorMessage(message) {
  usersContainer.innerHTML = `<h2 style="color:red;">${message}</h2>`;
}

function sortOutput(data) {
  if (!Array.isArray(data)) return;

  const sorted = [...data];

  if (sortButton.value === "aToz") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortButton.value === "zToa") {
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  }
  return sorted;
}

searchButton.addEventListener('click', async () =>{
  let 
});