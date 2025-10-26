(async function(){
    `use strict`;

    const dropdownElem = document.querySelector(".dropdown-menu");
    const sidebarElem = document.querySelector("#right-sidebar");
    // const tileElem = document.querySelector(".video-tile");
    const videoElem = document.querySelector(".video");

    try {
        const r = await fetch("coding.json");

        if(!r.ok){
            throw new Error(`${r.status} - ${r.statusText}`);
        }
        const videoNames = await r.json();

        videoNames.forEach(v  => {
            dropdownElem.innerHTML += `<li><a class="dropdown-item" data-url="${v.url}" >${v.name}</a></li>`;

            sidebarElem.innerHTML += `<div class="video-tile" data-url="${v.url}">
                                             <h4>${v.name}</h4>
                                         <img src="${v.pic}" alt="">
                                    </div>`;
        });

        sidebarElem.addEventListener("click", async (e) => {
            const data = e.target.closest(".video-tile");
            console.log(data.dataset.url);
            videoElem.src= data.dataset.url; 
            // videoElem.play();
        });

    }catch(e){
        console.error(e);   
    }


}());