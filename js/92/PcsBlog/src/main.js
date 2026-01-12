import "./style.css";
//import { loadUsers, loadMoreInfo } from "./laoder.js";
import { loadAndDisplayUsers } from "./displayFunctions.js";

document.getElementById("home").addEventListener("click", () => {
  loadAndDisplayUsers();
});

const loginElem = document.querySelector("#login-button");
const userNameElem = document.querySelector("#userName");
const passwordElem = document.querySelector("#password");

loginElem.addEventListener("click", () => {
  if (userNameElem.value === "testUser" && passwordElem.value === '123') {
    document.querySelector('#auth-section').classList.add('hide');
    document.querySelector('#blog-section').classList.remove('hide');
    loadAndDisplayUsers();
  }
});

//loadAndDisplayUsers();
