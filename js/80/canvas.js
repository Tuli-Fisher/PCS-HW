(function(){
    'use strict';

    const canvas = document.querySelector('#theCanvas');
    const context = canvas.getContext('2d');

    function canvasResize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize',canvasResize);

    canvasResize();

    const balls = [];

    let dx = 1;
    let dy = 2.5;


    

    document.querySelector('#createButton').addEventListener('click', ()=>{

        const RADIUS = Number(document.querySelector('#sizeInput').value);
        let x = RADIUS  + 1;
        let y = RADIUS + 1;
        const color = document.querySelector('#colorInput').value;

        const newone = {radius:RADIUS, x: x, y: y ,color: color};
        balls.push(newone);
        bounceBalls(balls);
    });

    function bounceBalls(a){
       
            setInterval(()=>{
                context.clearRect(0,0, canvas.width, canvas.height);
                context.beginPath();

                a.forEach(e => {
                    context.fillStyle = e.color;

                    e.x += dx;
                    e.y += dy;

                    if(e.x < e.radius || e.x >= (canvas.width - e.radius)){
                        dx = -dx;
                    }

                    if(e.y < e.radius || e.y >= (canvas.height - e.radius)){
                        dy = -dy;
                    }

                    context.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);
                    context.fill();
                });

            },1);
            
    }
    
    

}());