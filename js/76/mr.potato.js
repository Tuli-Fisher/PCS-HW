(async function(){
    'use strict';

    const partsElem = document.querySelectorAll('.part');

    const buttonElem = document.querySelectorAll('.displayButton');
    const currentstate = JSON.parse(localStorage.getItem('savedState')) || {};
    
    buttonElem.forEach(elem =>{
        elem.addEventListener('click', e =>{

            const part = document.querySelector(`#${e.target.dataset.type}`);

            //part.style.display = part.style.display === 'block' ? 'none' : 'block';

            const currentDisplay = getComputedStyle(part).display;
            if( currentDisplay === 'none'){
                part.style.display = 'inline-block';
                elem.classList.add('active');
            }
            else{
                part.style.display = 'none';
                elem.classList.remove('active');
                delete currentstate[e.target.dataset.type];
                localStorage.setItem('savedState',JSON.stringify(currentstate));
            }

            
        });
    });

    let draggedPart = null;
    let offset;
   

   for(const key in currentstate){
        const partElem = document.querySelector(`#${key}`);
        partElem.style.display = 'block';
        partElem.style.position = 'absolute';
        partElem.style.left = currentstate[key].pageX;
        partElem.style.top = currentstate[key].pageY;

        document.querySelector(`[data-type='${key}']`).classList.add('active');
    };

    partsElem.forEach(elem =>{
        elem.addEventListener('mousedown', e =>{
            e.preventDefault();
            draggedPart = e.target;
            offset = { x: e.offsetX, y: e.offsetY };
        });
    });

    document.addEventListener('mousemove', e =>{
        
        if(draggedPart){
           
            draggedPart.style.position = 'absolute';
            draggedPart.style.left = `${e.pageX - offset.x}px`;
            draggedPart.style.top = `${e.pageY - offset.y}px`;
        }
    });

    document.addEventListener('mouseup', e =>{

        if(draggedPart){
            currentstate[draggedPart.id] = {
                pageX: draggedPart.style.left,
                pageY: draggedPart.style.top
            };

            console.log(currentstate);

            localStorage.setItem('savedState', JSON.stringify(currentstate));
        };

     
        console.log(currentstate);

        draggedPart = null;
        offset = null;
    });

    const backgroundButton = document.querySelectorAll('.otherButton')[0];
    const imgDiv = document.querySelector('.imgDiv');

    backgroundButton.addEventListener('click', () =>{
       
       imgDiv.style.display = imgDiv.style.display ==='block' ? 'none' : 'block';
    });

    imgDiv.addEventListener('click', e =>{

            document.body.style.backgroundImage = `url(${e.target.src})`;
       imgDiv.style.display = 'none';
    });
})();