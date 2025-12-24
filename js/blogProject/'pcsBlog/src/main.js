import './style.css';
//import {loadUsers} from './laoder.js';
import displayUsers from './displayUsers.js';

displayUsers();

document.getElementById("home").addEventListener("click", () => {
    displayUsers();
});

