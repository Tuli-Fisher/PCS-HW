(function () {
  'use strict';

  const SNAKE_SIZE = 64;
  let score = 0;
  let speed = 500;
  const segaments = [{x:0,y:0}];
  
  let direction = 'ArrowRight';

  //const snake = { x: 0, y:0, };
  const apple = {x:0,y:0};

  const snakeHead = document.createElement('img');
  snakeHead.src = 'snakeHead.png';
  const appleImg = document.createElement('img');
  appleImg.src = 'apple.jpg';
  const tail = document.createElement('img');
  tail.src = 'tail.png';

  const theCanvas = document.querySelector('#theCanvas');
  const context = theCanvas.getContext('2d');

  function resizeCanvas() {
    theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
    theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
  }

  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();

  snakeHead.onload = () => {
    setTimeout(snakeMove,speed);
  };

  document.addEventListener('keydown', e => {
    console.log(e);
    switch(e.key) {
      case 'ArrowRight':
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'ArrowDown':
        direction = e.key;
        break;
      default:
        console.log(e.key, 'is not a supported key');
    }
    
  });

  function snakeMove(){
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    const middle = segaments.slice(1,-1);
    segaments[segaments.length - 1] = segaments[0];

    switch(direction) {
      case 'ArrowRight':
          segaments[0].x += SNAKE_SIZE;
          break;
      case 'ArrowLeft':
          segaments[0].x -= SNAKE_SIZE;
          break;
      case 'ArrowUp':
          segaments[0].y -= SNAKE_SIZE;
          break;
      case 'ArrowDown':
          segaments[0].y += SNAKE_SIZE;
          break;
    }

    if(segaments[0].x > theCanvas.width || segaments[0].x < 0 || segaments[0].y > theCanvas.height || segaments[0].y < 0 ){

      context.clearRect(0, 0, theCanvas.width, theCanvas.height);
      context.font = '60px Arial';
      context.fillText(` GAME OVER! YOUR SCORE IS:${score}`, 250, 250);

    }else{

      ateApple();
      
      context.font = '30px Arial';
      context.fillText(`Score: ${score}`, 250, 250);

      context.drawImage(snakeHead, segaments[0].x, segaments[0].y);

      if(segaments[1]){
        context.fillStyle = "green";

        middle?.forEach(element => {
          context.fillRect(element.x, element.y,64,64);
        });

        context.drawImage(tail, segaments[segaments.length - 1].x, segaments[segaments.length - 1].y);
      }
  
      context.drawImage(appleImg, apple.x, apple.y);

      setTimeout(snakeMove,speed);
    };
  }


  function placeApple(){
    const col = Math.floor(theCanvas.width / SNAKE_SIZE);
    const row = Math.floor(theCanvas.height / SNAKE_SIZE);
    apple.x = (Math.floor(Math.random() * col) * SNAKE_SIZE);
    apple.y = (Math.floor(Math.random() * row) * SNAKE_SIZE);

    if(apple.x === segaments[0].x && apple.y === segaments[0].y){
      placeApple();
    };
  };

  function ateApple(){

    if(segaments[0].x === apple.x && segaments[0].y === apple.y){
      score += 200;
      speed -= 25;
      placeApple();
      addSegament();
    }

  };

  function addSegament(){

    const newSeg = {x:(segaments[0].x ) ,y:segaments[0].y};

    switch(direction) {

      case 'ArrowRight':
          newSeg.x -= SNAKE_SIZE;
          break;
      case 'ArrowLeft':
          newSeg.x += SNAKE_SIZE;
          break;
      case 'ArrowUp':
          newSeg.y += SNAKE_SIZE;
          break;
      case 'ArrowDown':
          newSeg.y += SNAKE_SIZE;
          break;
    }

    segaments.push(newSeg);
  };


  placeApple();

}());
