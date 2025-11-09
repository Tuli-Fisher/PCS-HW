(function(){
    'use strict';

    let draggedPart;
    let offset;
    let zIndex = 1;
    let parts = [];

    document.addEventListener('mousedown', e =>{

        if(e.target.classList.contains('part')){
            e.preventDefault();

            if(e.target.parentNode.tagName === 'ASIDE'){
                const newPart = makeNewPart(e.target);
                newPart.style.left = `${e.pageX - e.offsetX}px`;
                newPart.style.top = `${e.pageY - e.offsetY}px`;

                draggedPart = newPart;
                offset = { x: e.offsetX, y: e.offsetY};
            }
            else{
                draggedPart = e.target;
                offset = { x: e.offsetX, y: e.offsetY};
            }
            draggedPart.style.zIndex = zIndex++;
        }
    });


    document.addEventListener('mousemove', e =>{
        if(draggedPart){
            draggedPart.style.left = `${e.pageX - offset.x}px`;
            draggedPart.style.top = `${e.pageY - offset.y}px`;
        }
    });

    document.addEventListener('mouseup', e =>{
        draggedPart = null;
        offset = null;
    });

    function makeNewPart(part){
        const newPart = document.createElement('img');
        newPart.src = part.src;
        newPart.className = part.className;
        newPart.style.position = 'absolute';

        document.body.append(newPart);

        parts.push(newPart);

        return newPart;
    };


    const messageBox = document.querySelector('.messagebox');
    const nameInput = document.querySelector('.nameInput');
    //const saveButton = document.querySelector('.saveButton');
    const loadSelect = document.querySelector('#loadSelect');
    const loadBox = document.querySelector('.load');
    const loadOk = document.querySelector('.loadButton');

    const contentBox = document.querySelector('.content');
    let userName;
    let loadName;

    document.querySelector('.saveSpan').addEventListener('click', () =>{
        messageBox.style.display = 'block';
        contentBox.innerHTML = `
         input name: <input type="text" class="nameInput">
         <button class="saveButton">OK</button>`;
        messageBox.style.zIndex = zIndex++;
    });

    document.body.addEventListener('click', e =>{
        if(e.target.classList.contains('saveButton')){
            messageBox.style.display = 'none';
            userName = nameInput.value;
            saveState(userName);
        }
    });

    document.querySelector('.loadSpan').addEventListener('click', e =>{

        if(localStorage.length === 0){
            contentBox.innerHTML = ' <H1> No saved data found </H1>';
            messageBox.style.display = 'block';
            messageBox.style.zIndex = zIndex++;
            return;
        }
        
        const loadSelect = document.createElement('select');
        contentBox.append(loadSelect);

        for(let i=0; i<localStorage.length; i++){
            
            const key = localStorage.key(i);
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            loadSelect.append(option);
        }
        messageBox.style.display = 'block';
        messageBox.style.zIndex = zIndex++;
    });

    loadOk.addEventListener('click', () =>{
        loadBox.style.display = 'none';
        loadName = loadSelect.value;
        loadState(loadName);
    });

    
    
    function saveState(name) {
        const partsData = parts.map(part => {
            return {
                src: part.src,
                top: part.style.top,
                left: part.style.left,
                className: part.className,
                zIndex: part.style.zIndex
            };
        });

        localStorage.setItem(`${name}`, JSON.stringify(partsData));
    }

    function loadState(name) {
        const partsData = JSON.parse(localStorage.getItem(`${name}`));

        partsData.forEach(data => {
            const p = makeNewPart(data);
            p.style.left = `${data.left}`;
            p.style.top = `${data.top}`;
            p.style.zIndex = data.zIndex;
        });

        if (partsData.length) {
            zIndex = Math.max(...partsData.map(p => p.zIndex));
        }
    }

    document.body.addEventListener("click", (e) => {
        if(e.target.tagName === "IMG" && e.target.parentElement.classList.contains("messagebox"))
        e.target.parentElement.style.display = "none";
    });
    

    document.querySelector('.deleteButton').addEventListener('click', () =>{
        const loadName = loadSelect.value;
        localStorage.removeItem(loadName);
        loadBox.style.display = 'none';
    });
}());