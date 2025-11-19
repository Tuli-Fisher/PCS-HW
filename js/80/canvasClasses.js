(function(){
    'use strict';

    const canvas = document.querySelector('#theCanvas');

    class Ball {

        constructor(rad,color){
            this.radius = rad;
            this.color = color;

            this.x = this.radius + 1;
            this.y = this.radius + 1;

            Ball.balls.push(this);
        };

        static balls = [];
        static dx = 1;
        static dy = 2.5;
        static gravity = 0;

       
    }

    function canvasResize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize',canvasResize);

    canvasResize();

    function bounceBalls(){
            //const canvas = document.querySelector('#theCanvas');
            const context = canvas.getContext('2d');
        
            context.clearRect(0,0, canvas.width, canvas.height);
           
            for(const b of Ball.balls){
                context.beginPath();
                context.fillStyle = b.color;

                b.x += Ball.dx;
                b.y += Ball.dy;

                if(b.x < b.radius || b.x >= (canvas.width - b.radius)){
                    Ball.dx = -Ball.dx;
                }

                if(b.y < (b.radius - Ball.gravity) ){
                    Ball.dy = -Ball.dy;
                }

                if(b.y >= (canvas.height  + b.radius)){
                    Ball.dy = -Ball.dy;
                    Ball.gravity += 5;
                }

                context.arc(b.x, b.y, b.radius, 0, 2 * Math.PI);
                context.fill();
            }

        requestAnimationFrame(bounceBalls);
    };

    bounceBalls();

    document.querySelector('#createButton').addEventListener('click', ()=>{

        const RADIUS = Number(document.querySelector('#sizeInput').value);
        const color = document.querySelector('#colorInput').value;

        new Ball(RADIUS,color);
        
    });

}());