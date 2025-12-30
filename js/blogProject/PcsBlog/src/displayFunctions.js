import { loadMoreInfo } from "./laoder";
import { loadUsers } from "./laoder";

const usersContainer = document.querySelector(".users-container");
const postsContainer = document.querySelector(".posts-container");
const backButton = document.querySelector("#backButton");
const reloadButton = document.querySelector("#reload-button");
const sortButton = document.querySelector("#sort-select");
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");

let lastFunction = [];
let currentFunction;

export async function loadAndDisplayUsers(reload = false) {
  let users = await loadUsers(
    "https://jsonplaceholder.typicode.com/users",
    reload
  );

  ///////check if this is empty
  if (Array.isArray(users) && users.length === 0) {
    errorMessage("error loading users");
    return;
  }
  if (searchInput.value.trim() !== "") {
    users = searchResults(users);
  }

  users = sortOutput(users);

  displayUsers(users);
}

async function loadAndDisplayPosts(userId, userName, reload = false) {
  let posts = await loadMoreInfo("posts", userId, reload);

  if (Array.isArray(posts) && posts.length === 0) {
    errorMessage("error loading posts");
    return;
  }
  if (searchInput.value.trim() !== "") {
    posts = searchResults(posts);
  }
  displayPosts(posts, userName);
}

async function loadAndDisplayComments(postId, reload = false) {
  let comments = await loadMoreInfo("comments", postId, reload);

  if (Array.isArray(comments) && comments.length === 0) {
    errorMessage("error loading comments");
    return;
  }
  if (searchInput.value.trim() !== "") {
    comments = searchResults(comments);
  }
  displayComments(postId, comments);
}


export async function displayUsers(users) {
  currentFunction = (reload) => loadAndDisplayUsers(reload);

  if (!users) {
    errorMessage("error loading users");
    return;
  }

  Array.isArray(users) || (users = [users]);

  backButton.classList.add("hide");
  sortButton.classList.remove("hide");
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
      lastFunction.push(() => loadAndDisplayUsers());
      loadAndDisplayPosts(user.id, user.name);
    });

    usersContainer.appendChild(userDiv);
  });
}

export async function displayPosts(posts, userName) {
  currentFunction = (reload) => loadAndDisplayPosts(posts, userName, reload);

  //let posts = await loadMoreInfo("posts", userId, reload);

  if (!posts) {
    errorMessage("error loading posts");
    return;
  }
  Array.isArray(posts) || (posts = [posts]);

  //console.log("posts for user ", userId, posts);

  usersContainer.classList.add("hide");
  sortButton.classList.add("hide");
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
      lastFunction.push(() => loadAndDisplayPosts(posts, userName));
      loadAndDisplayComments(post.id);
    });

    postsContainer.appendChild(postDiv);
  });
}

export async function displayComments(postId, comments) {
  currentFunction = (reload) => loadAndDisplayComments(postId, comments, reload);

  Array.isArray(comments) || (comments = [comments]);

  postsContainer.innerHTML = `<h1>Heres what people think about post ${postId} -  `;

  comments.forEach((comments) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post-card");

    postDiv.innerHTML = `
            <h2>${comments.name}</h2>
            <h4>${comments.email}</h4>
            <p>${comments.body}</p>`;

    postsContainer.appendChild(postDiv);
  });

  //lastFunction.push(["displayComments", postId]);
}

backButton.addEventListener("click", () => {
  let last = lastFunction.pop();
  
  last?.();
});

reloadButton.addEventListener("click", async () => currentFunction(true));

sortButton.addEventListener("change", async () => currentFunction());

searchButton.addEventListener("click", async () => currentFunction());

export function errorMessage(message) {
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

function searchResults(data) {
  const searchVal = searchInput.value.toLowerCase();
  const filteredData = data.filter((item) =>
    item.name
      ? item.name.toLowerCase().includes(searchVal)
      : item.body.toLowerCase().includes(searchVal)
  );
  return filteredData;
}
