const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x , y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let titleCount = 20;
let titleSize = canvas.width / titleCount -2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity= 0;
let yVelocity= 0;

let score = 0;

const gulpSound = new Audio("Swallow - QuickSounds.com.mp3");


function drawGame(){
    clearScreen();
    changeSnakePosition();
    let result = isGameover();
    if(result){
        return;
    }
    drawSnake();
    drawApple();
    drawScore();

    if(score > 2){
        speed = 9;
    }
    
    if(score > 4){
        speed = 11;
    }

    if(score > 6){
        speed = 13;
    }

    if(score > 10){
        speed = 20;
    }

    checkAppleCollision();
    setTimeout(drawGame, 1000/ speed);
} 

function isGameover(){
    let gameOver = false;
    
    if(yVelocity ===0 && xVelocity ===0){
        return false;
    }

    //walls
    if(headX < 0){
        gameOver = true;
    }
    
    else if(headX === titleCount){
        gameOver = true
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if(headY === titleCount){
        gameOver = true
    }

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }


    if (gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Comic Sans";

        if (gameOver){
            ctx.fillStyle = "white";
            ctx.font = "50px Comic San";
            var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
            gradient.addColorStop("0" , "orange");
            gradient.addColorStop("0.5" , "yellow");
            gradient.addColorStop("0.1" , "red");
            ctx.fillStyle = gradient;

            ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2)
        }
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2)
    }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana"
    ctx.fillText("Score" + score, canvas.width-50, 10);
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'yellow';
    ctx.fillRect(headX * titleCount , headY * titleCount, titleSize,titleSize)
    
    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * titleCount, part.y * titleCount , titleSize,titleSize)
    }

    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = 'yellow';
    ctx.fillRect(headX * titleCount , headY * titleCount, titleSize,titleSize)

}

function changeSnakePosition(){
   headX = headX + xVelocity;
   headY = headY + yVelocity;   
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * titleCount, appleY * titleCount, titleSize,titleSize)
}

function checkAppleCollision(){
    if(appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * titleCount);
        appleY = Math.floor(Math.random() * titleCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
           return;
        yVelocity = -1;
        xVelocity = 0;
    }
    
    //down
    if(event.keyCode == 40){
        if(yVelocity == -1)
          return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
         return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    if(event.keyCode == 39){
        if(xVelocity == -1)
         return;
        yVelocity = 0;
        xVelocity = 1;
    }
}


drawGame();