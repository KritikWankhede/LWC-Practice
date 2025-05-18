import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BreakerBall extends LightningElement {
    canvas;
    ctx;
    ball;
    paddle = { height: 10, width: 75, x: 0 };
    rightPressed = false;
    leftPressed = false;
    bricks = [];
    brickRowCount = 3;
    brickColumnCount = 5;
    brickWidth = 75;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;
    intervalId;

    score = 0;
    level = 1;
    speed = 10;

    startButtonLabel = 'Start Game';
    isPaused = false;
    isGameRunning = false;
    showGameOverModal = false;
    gameOverMessage = '';

    connectedCallback() {
        window.addEventListener('keydown', this.keyDownHandler.bind(this));
        window.addEventListener('keyup', this.keyUpHandler.bind(this));
    }
    get isPauseButtonDisabled() {
        return !this.isGameRunning;
    }
    renderedCallback() {
        if (!this.canvas) {
            this.canvas = this.template.querySelector('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = 400;
            this.canvas.height = 300;
        }
    }
    get pauseButtonLabel() {
        return this.isPaused ? 'Resume' : 'Pause';
    }
    
    startOrRestartGame() {
        if (this.intervalId) clearInterval(this.intervalId);

        this.score = 0;
        this.level = 1;
        this.speed = 10;
        this.startButtonLabel = 'Restart Game';
        this.isPaused = false;
        this.isGameRunning = true;

        this.resetGame();
        this.intervalId = setInterval(() => this.draw(), this.speed);
    }

    togglePause() {
        if (!this.isGameRunning) return;

        if (this.isPaused) {
            this.intervalId = setInterval(() => this.draw(), this.speed);
        } else {
            clearInterval(this.intervalId);
        }
        this.isPaused = !this.isPaused;
    }

    resetGame() {
        this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 30,
            dx: 2,
            dy: -2,
            radius: 10
        };
        this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
        this.initBricks();
    }

    initBricks() {
        this.bricks = [];
    
        // Center the brick layout
        let totalBrickWidth = this.brickColumnCount * (this.brickWidth + this.brickPadding) - this.brickPadding;
        this.brickOffsetLeft = (this.canvas.width - totalBrickWidth) / 2;
    
        for (let c = 0; c < this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < this.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
    }
    
    
    handleButtonClick(event) {
        const direction = event.target.dataset.direction;
        if (direction === 'right') {
            this.rightPressed = true;
            console.log('Right arrow pressed');
        } else if (direction === 'left') {
            this.leftPressed = true;
            console.log('Left arrow pressed');
        }
    }

    handleButtonRelease(event) {
        const direction = event.target.dataset.direction;
        if (direction === 'right') {
            this.rightPressed = false;
            console.log('Right arrow released');
        } else if (direction === 'left') {
            this.leftPressed = false;
            console.log('Left arrow released');
        }
    }

    keyDownHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') this.rightPressed = true;
        else if (e.key === 'Left' || e.key === 'ArrowLeft') this.leftPressed = true;
    }
    
    keyUpHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') this.rightPressed = false;
        else if (e.key === 'Left' || e.key === 'ArrowLeft') this.leftPressed = false;
    }
    

    collisionDetection() {
        let allBricksCleared = true;
    
        // Loop through the bricks to check for collision
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                let b = this.bricks[c][r];
                if (b.status === 1) {
                    allBricksCleared = false;
                    // Check if the ball hits a brick
                    if (
                        this.ball.x + this.ball.radius > b.x &&
                        this.ball.x - this.ball.radius < b.x + this.brickWidth &&
                        this.ball.y + this.ball.radius > b.y &&
                        this.ball.y - this.ball.radius < b.y + this.brickHeight
                    ) {
                        this.ball.dy = -this.ball.dy; // Ball bounces off brick
                        b.status = 0; // Mark brick as hit
                        this.score++;
                    }
                }
            }
        }
    
        // If all bricks are cleared, go to next level
        if (allBricksCleared) {
            clearInterval(this.intervalId);
    
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'You Win!',
                    message: `Level ${this.level} cleared! Moving to Level ${this.level + 1}.`,
                    variant: 'success'
                })
            );
    
            this.level++;
            this.speed = Math.max(5, this.speed - 1); // Speed up
            this.resetGame();
            this.intervalId = setInterval(() => this.draw(), this.speed);
        }
    
        // Paddle collision detection
        if (
            this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius - this.paddle.height &&
            this.ball.x > this.paddle.x &&
            this.ball.x < this.paddle.x + this.paddle.width
        ) {
            // Ball hits the paddle
            this.ball.dy = -this.ball.dy; // Ball bounces off the paddle
    
            // Adjust ball direction based on where it hits the paddle
            let hitPoint = this.ball.x - (this.paddle.x + this.paddle.width / 2);
            let maxAngle = Math.PI / 3; // 60 degrees
            let angle = hitPoint / (this.paddle.width / 2) * maxAngle;
            
            // Keep speed consistent
            let speed = Math.sqrt(this.ball.dx ** 2 + this.ball.dy ** 2);
            this.ball.dx = speed * Math.sin(angle);
            this.ball.dy = -Math.abs(speed * Math.cos(angle));
            
        }
    
        // Ball falling below canvas (game over)
        // if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
        //     clearInterval(this.intervalId);
        //     this.isGameRunning = false;
        //     this.startButtonLabel = 'Start Game';
        //     alert("Game Over! Press Start to play again.");
        // }
    }
    

    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPaddle() {
        this.ctx.beginPath();
        this.ctx.rect(
            this.paddle.x,
            this.canvas.height - this.paddle.height,
            this.paddle.width,
            this.paddle.height
        );
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawBricks() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                if (this.bricks[c][r].status === 1) {
                    let brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                    let brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;
                    this.ctx.beginPath();
                    this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                    this.ctx.fillStyle = "#0095DD";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }
    closeModal() {
        this.showGameOverModal = false;
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBricks();
        this.drawBall();
        this.drawPaddle();
        this.collisionDetection();

        if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
            this.ball.dx = -this.ball.dx;
        }

        if (this.ball.y + this.ball.dy < this.ball.radius) {
            this.ball.dy = -this.ball.dy;
        } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
            if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
                this.ball.dy = -this.ball.dy;
            } else {
                clearInterval(this.intervalId);
                this.isGameRunning = false;
                this.startButtonLabel = 'Start Game';
        
                this.gameOverMessage = "Game Over! Press Start to play again.";
                this.showGameOverModal = true;
            }
        }

        if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
            this.paddle.x += 7;
        } else if (this.leftPressed && this.paddle.x > 0) {
            this.paddle.x -= 7;
        }

        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;
    }
}