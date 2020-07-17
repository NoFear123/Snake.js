'use strict'
const canvas = document.querySelector('#canvasGame')
const ctx = canvas.getContext('2d');

class Gameplay {
    constructor(snakeSize) {
        this.snakeSize = snakeSize;
        canvas.width = 1000;
        canvas.height = 600;
        this.x = canvas.width;
        this.y = canvas.height
        this.snakePosX = this.x / 2 - this.snakeSize;
        this.snakePosY = this.y / 2 - this.snakeSize;
        this.snakeSpeedX = 2;
        this.snakeSpeedY = 1;
    }

    drawGameBoard() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.x, this.y);
        console.log(ctx.fillStyle);
    }

    snakeInit(snakeSize) {
        ctx.fillStyle = 'tomato';
        ctx.fillRect(this.snakePosX, this.snakePosY, snakeSize, snakeSize);
    }

    snakeBody(snakeSize) {
        let newBody = 25
        ctx.fillStyle = 'lime';
        for (let i = 0; i < 3; i++) {
            ctx.fillRect(this.snakePosX - newBody, this.snakePosY, snakeSize, snakeSize);
            newBody += 25;
        }
    }

    snakeMoveRight(snakeSize) {
            this.snakePosX += this.snakeSpeedX;
            if(this.snakePosX === this.x - snakeSize){
                console.log('Koniec');
                clearInterval(setGame);         
            }
    }

    snakeMoveLeft() {
        this.snakePosX -= this.snakeSpeedX;
        if(this.snakePosX <= 0){
            console.log('Koniec');
            clearInterval(setGame);         
        }
    }

    snakeMoveUp() {
        this.snakePosY -= this.snakeSpeedY;
        if(this.snakePosY === 0){
            console.log('Koniec');
            clearInterval(setGame);         
        }
    }

    snakeMoveDown(snakeSize) {
        this.snakePosY += this.snakeSpeedY;
        if(this.snakePosY >= this.y - snakeSize){
            console.log('Koniec');
            clearInterval(setGame);         
        }
    }
    game() {
        this.drawGameBoard();
        this.snakeInit(25);
        this.snakeMoveRight(25);
    }
}
const newGameBoard = new Gameplay(25);

function Paint() {
    newGameBoard.game();
}


const setGame = setInterval(function(){
    Paint();
},1000/60);

// const setPosition = setInterval(function(){
//     document.addEventListener('keydown', Moves);
// },1000/60)