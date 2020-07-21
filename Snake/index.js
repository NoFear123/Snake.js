window.onload = function () {
    canv = document.querySelector('#gameBoard');
    ctx = canv.getContext('2d');
    document.addEventListener("keydown", direction);
}

const snakePos = {
    x: 10,
    y: 10,
}

const tile = {
    x: 20,
    y: 20
}

const snake = {
    snakeSizeX: 20,
    snakeSizeY: 20,
    tail: 0,
}

const food = {
    foodSize: 20,
    foodX: 5,
    foodY: 5
}

const dir = {
    dirLeftX: -1,
    dirRightX: 1,
    dirUpY: 1,
    dirDownY: -1
}

const elements = {
    board: document.querySelector('#gameBoard'),
    over: document.querySelector('.game-over-container'),
    score: document.querySelector('.score-board'),
    btnOver: document.querySelector('.btn-game-over')
}

function game() {
    drawBoard();
    updateDir();
    drawSnakeAndFood();
    gameOver();
}

function updateDir() {
    if (checkDir == "LEFT") {
        snakePos.x += dir.dirLeftX;
    }
    if (checkDir == "RIGHT") {
        snakePos.x += dir.dirRightX;
    }
    if (checkDir == "UP") {
        snakePos.y -= dir.dirUpY;
    }
    if (checkDir == "DOWN") {
        snakePos.y -= dir.dirDownY;
    }
}

function Dead() {
    elements.board.classList.add('hide');
    elements.score.classList.add('hide');
    elements.over.classList.remove('hide');
}

function Again(){
    elements.board.classList.remove('hide');
    elements.score.classList.remove('hide');
    elements.over.classList.add('hide');
}

function gameOver() {
    if (snakePos.x >= tile.x - 1) {
        snakePos.x = tile.x - 2;
        clearInterval(set)
        Dead();
    }
    if (snakePos.x == 0) {
        snakePos.x += 1;
        clearInterval(set)
        Dead();
    }
    if (snakePos.y == tile.y - 1) {
        snakePos.y = tile.y - 2;
        clearInterval(set)
        Dead();
    }
    if (snakePos.y == 0) {
        snakePos.y += 1;
        clearInterval(set)
        Dead();
    }
    
}
elements.btnOver.addEventListener('click', Again)
function drawBoard() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canv.width, canv.height)
}


let snakePieces = [];

function drawSnakeAndFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.foodX * tile.x, food.foodY * tile.y, food.foodSize, food.foodSize)
    ctx.fillStyle = 'white';
    ctx.fillRect(snakePos.x * tile.x, snakePos.y * tile.y, snake.snakeSizeX, snake.snakeSizeY);
    for (let i = 0; i < snakePieces.length; i++) {
        ctx.fillStyle = 'lime';
        ctx.fillRect(snakePieces[i].x * tile.x, snakePieces[i].y * tile.y, snake.snakeSizeX - 1, snake.snakeSizeY - 1)
        if (snakePieces[i].x == snakePos.x && snakePieces[i].y == snakePos.y) {
            clearInterval(set)
            Dead();
        }
    }
    
    snakePieces.push({
        x: snakePos.x,
        y: snakePos.y
    });
    
    while (snakePieces.length > snake.tail) {
        snakePieces.shift();
    }
    
    if (food.foodX == snakePos.x && food.foodY == snakePos.y) {
        snake.tail++;
        food.foodX = Math.floor(Math.random() * tile.x);
        food.foodY = Math.floor(Math.random() * tile.y)
    }
    ctx.fillStyle = "red";
    ctx.fillRect(food.foodX * tile.x, food.foodY * tile.y, food.foodSize, food.foodSize);
    while (food.foodX == 19 || food.foodX == 0 || food.foodY == 19 || food.foodY == 0) {
        food.foodX = Math.floor(Math.random() * tile.x);
        food.foodY = Math.floor(Math.random() * tile.y)
    }
}

let checkDir;

function direction(event) {
    if (event.keyCode == 37 && checkDir != "RIGHT") {
        checkDir = "LEFT";
    } else if (event.keyCode == 39 && checkDir != "LEFT") {
        checkDir = "RIGHT";
    } else if (event.keyCode == 38 && checkDir != "DOWN") {
        checkDir = "UP"
    } else if (event.keyCode == 40 && checkDir != "UP") {
        checkDir = "DOWN"
    }
}
const set = setInterval(function(){
    game();
}, 1000 / 15);
