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

                document.body.append(newPart);

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

        parts.push(newPart);

        return newPart;
    };


    const messageBox = document.querySelector('.messagebox');
    const nameInput = document.querySelector('.nameInput');
    const saveButton = document.querySelector('.saveButton');
    const loadSelect = document.querySelector('#loadSelect');
    const loadBox = document.querySelector('.load');
    const loadOk = document.querySelector('.loadButton');
    let userName;
    let loadName;

    document.querySelector('.saveSpan').addEventListener('click', () =>{
        messageBox.style.display = 'block';
        messageBox.style.zIndex = zIndex++;
    });

    saveButton.addEventListener('click', () =>{
        messageBox.style.display = 'none';
        userName = nameInput.value;
        saveState(userName);
    });

    document.querySelector('.loadSpan').addEventListener('click', e =>{

        loadSelect.innerHTML = '';
        for(let i=0; i<localStorage.length; i++){
            const key = localStorage.key(i);
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            loadSelect.append(option);
        }
        loadBox.style.display = 'block';
        loadBox.style.zIndex = zIndex++;
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

}());