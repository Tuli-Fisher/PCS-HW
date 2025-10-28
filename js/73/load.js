(async function(){
    `use strict`;

    const dropdownElem = document.querySelector(".dropdown-menu");
    const sidebarElem = document.querySelector("#right-sidebar");
    // const tileElem = document.querySelector(".video-tile");
    const videoElem = document.querySelector(".video");

    async function loadvideos(url){
        try {
            const musicResults = await fetch(url);

            if(!musicResults.ok){
                throw new Error(`${musicResults.status} - ${musicResults.statusText}`);
            }

            return musicResults.json();

        }catch(e){
            console.error(e);   
        }
    }


    async function createTiles(videoNames){

        videoNames.forEach(video  => {

            const videoLi = document.createElement("li");
            videoLi.innerHTML = ` ${video.name}`;
            videoLi.className = "dropdown-item";
              
            const videoTile = document.createElement("div");
            videoTile.innerHTML = ` <h4>${video.name}</h4>
                                     <img src="${video.pic}" > `;

            videoTile.className = "video-tile";

            dropdownElem.appendChild(videoLi); 
            sidebarElem.appendChild(videoTile);

            videoLi.addEventListener("click", () => {
                videoElem.src = video.url;
            });

            videoTile.addEventListener("click", () => {
                videoElem.src = video.url;
            });

        });
    }


    const videoNames = await loadvideos("videos.json");

    createTiles(videoNames);

}());