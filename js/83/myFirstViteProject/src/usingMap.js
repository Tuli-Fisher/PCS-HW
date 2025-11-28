   import {mapMaker} from './map.js';
   import filteredData from './main.js';

   const switchElem = document.getElementById("viewSwitch");
    const tiles = document.getElementById("tiles");
    const map = document.getElementById("map");

    switchElem.addEventListener("click", () => {
        const isActive = switchElem.classList.toggle("active");

        if (isActive) {
          map.style.display = "block";
          tiles.classList.add('hidden');
          //mapMaker(filteredData);
        } else {
          map.style.display = "none";
          tiles.classList.remove('hidden');
        }
    });