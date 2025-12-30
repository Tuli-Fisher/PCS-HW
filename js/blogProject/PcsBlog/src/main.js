import "./style.css";
//import { loadUsers, loadMoreInfo } from "./laoder.js";
import {loadAndDisplayUsers} from "./displayFunctions.js";





document.getElementById("home").addEventListener("click", () => {
  loadAndDisplayUsers();
});


////////action ////////

loadAndDisplayUsers();