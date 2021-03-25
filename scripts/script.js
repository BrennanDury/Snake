let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d");

let score = 0;
const SIZE = 10;
function drawSquare(x, y) {
    ctx.fillRect(x, y, SIZE, SIZE);
}

let food = nextFood();

function nextFood() {
    let xVal = Math.floor(Math.random() * canvas.width / SIZE) * SIZE;
    let yVal = Math.floor(Math.random() * canvas.height / SIZE) * SIZE;
    return [xVal, yVal];
}
console.log(food[0], food[1]);
drawSquare(food[0], food[1]);

let snake = new Array();

function addToSnake(xVal, yVal) {
    snake.push([xVal, yVal]);
}

function initializeSnake() {
    snake = new Array();
    addToSnake(0, 0);
    addToSnake(SIZE, 0);
    addToSnake(SIZE * 2, 0);
}

initializeSnake();

function drawSnake() {
    for (coordinate of snake) {
        drawSquare(coordinate[0], coordinate[1]);
    }
}

drawSnake();

const LEFT = 1;
const UP = 2;
const RIGHT = 3;
const DOWN = 4;
let direction = 3;

function shift() {
    let removed;
    if (direction == LEFT) {
        let x = (snake[snake.length - 1][0] - SIZE + canvas.width) % canvas.width;
        let y = snake[snake.length - 1][1];
        snake.push([x, y]);
        removed = snake.shift();
    }
    if (direction == RIGHT) {
        let x = (snake[snake.length - 1][0] + SIZE + canvas.width) % canvas.width;
        let y = snake[snake.length - 1][1];
        snake.push([x, y]);
        removed = snake.shift();
    }
    if (direction == UP) {
        let x = snake[snake.length - 1][0];
        let y = (snake[snake.length - 1][1] - SIZE + canvas.height) % canvas.height;
        snake.push([x, y]);
        removed = snake.shift();
    }
    if (direction == DOWN) {
        let x = snake[snake.length - 1][0];
        let y = (snake[snake.length - 1][1] + SIZE + canvas.height) % canvas.height;
        snake.push([x, y]);
        removed = snake.shift();
    }
    let headX = snake[snake.length - 1][0];
    let headY = snake[snake.length - 1][1];
    if (headX == food[0] &&  headY == food[1]) {
        snake.unshift(removed);
        HTMLFormElement.in
        food = nextFood();
        let points = document.getElementsByTagName("p")[0];
        score++;
        points.innerHTML = "Points : " + score;
    }
    for (let i = 0; i < snake.length - 1; i++) {
        if (headX == snake[i][0] &&  headY == snake[i][1]) {
            alert("Game Over");
            initializeSnake();
            let points = document.getElementsByTagName("p")[0];
            score = 0;
            points.innerHTML = "Points : " + score;
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawSquare(food[0], food[1]);
}

let timer = setInterval(shift, 40);

window.addEventListener("keydown", keys);

function keys(e) {
    if (e.keyCode == 37) {
        if (direction != RIGHT) {
            direction = LEFT;
        }
    } else if (e.keyCode == 38) {
        if (direction != DOWN) {
            direction = UP;
        }
    } else if (e.keyCode == 39) {
        if (direction != LEFT) {
            direction = RIGHT;
        }
    } else if (e.keyCode == 40) {
        if (direction != UP) {
            direction = DOWN;
        }
    }
}
