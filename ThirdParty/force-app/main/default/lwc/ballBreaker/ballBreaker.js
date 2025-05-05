import { LightningElement, track } from 'lwc';

export default class BallBreaker extends LightningElement {
    // Game properties
    @track LOC = [];
    @track BALL_RADIUS = 15;
    @track BALL_VX = 8;
    @track BALL_VY = 3;
    @track PADDLE_WIDTH = 150;
    @track PADDLE_HEIGHT = 10;
    @track PADDLE_SHIFT = this.PADDLE_WIDTH / 2;
    @track CANVAS_WIDTH = 0;
    @track CANVAS_HEIGHT = 0;
    @track OBSTACLE_ROW_COUNT = 6;
    @track OBSTACLE_COL_COUNT = 10;
    @track OBSTACLE_START_X = 2;
    @track OBSTACLE_START_Y = 2;
    @track OBSTACLE_PADDING = 5;
    @track OBSTACLE_HEIGHT = 30;
    @track CURRENT_SCORE = 0;
    @track HIGH_SCORE = 0;
    @track FLAG = 0;
    @track PLAYGAME = 0;
    @track OBSTACLE_WIDTH;

    playerName = "";

    // Lifecycle hook
    connectedCallback() {
        // Access the canvas element after the component is rendered
        const canvas1 = this.template.querySelector('.canvas1');
    
        if (window.screen.width < 800) {
            this.CANVAS_WIDTH = window.screen.width * 0.9;
            this.CANVAS_HEIGHT = window.screen.height * 0.6;
            this.OBSTACLE_ROW_COUNT = 6;
            this.OBSTACLE_COL_COUNT = 6;
            this.OBSTACLE_HEIGHT = 15;
            this.BALL_RADIUS = 10;
            this.PADDLE_WIDTH = 100;
    
            if (canvas1) {
                canvas1.style.display = "block";
                canvas1.width = window.screen.width * 0.95;
                canvas1.height = 50;
            }
    
            this.BALL_VX = 3;
            this.BALL_VY = 2;
        } else {
            this.CANVAS_WIDTH = 800;
            this.CANVAS_HEIGHT = 560;
        }
    }

    // Initialize canvas dimensions and properties
    initializeCanvas() {
        if (window.screen.width < 800) {
            this.CANVAS_WIDTH = window.screen.width * 0.9;
            this.CANVAS_HEIGHT = window.screen.height * 0.6;
            this.OBSTACLE_ROW_COUNT = 6;
            this.OBSTACLE_COL_COUNT = 6;
            this.OBSTACLE_HEIGHT = 15;
            this.BALL_RADIUS = 10;
            this.PADDLE_WIDTH = 100;
            canvas1.style.display = "block";
            canvas1.width = window.screen.width * 0.95;
            canvas1.height = 50;
            this.BALL_VX = 3;
            this.BALL_VY = 2;
        } else {
            this.CANVAS_WIDTH = 800;
            this.CANVAS_HEIGHT = 560;
        }
        canvas.width = this.CANVAS_WIDTH;
        canvas.height = this.CANVAS_HEIGHT;
        this.OBSTACLE_WIDTH = Math.floor(
            (this.CANVAS_WIDTH - this.OBSTACLE_COL_COUNT * 4) / this.OBSTACLE_COL_COUNT
        );
    }

    // Get player name
    getPlayerName() {
        const input = document.getElementById("playerName");
        this.playerName = input && input.value.trim() ? input.value.trim() : "Anonymous";
    }

    // Start the game
    startGame() {
        this.getPlayerName();
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("gameScreen").style.display = "block";
        this.Text.draw(`Hello, ${this.playerName}! Click to play!`);
        canvas.removeEventListener("click", this.startGame);
        canvas.addEventListener("click", this.x.bind(this));
        document.getElementById("startButton").addEventListener("click", this.startGame.bind(this));
    }

    // Clear the canvas
    clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Draw on canvas
    drawOnCanvas() {
        if (this.LOC.length === 0 || this.FLAG === 1) {
            this.resetGame();
        } else {
            this.clearCanvas();
            this.ball.draw();
            this.paddle.draw();
            this.obstacle.create();
            this.ball.move();
        }
    }

    // Reset the game
    resetGame() {
        this.FLAG = 0;
        this.LOC = [];
        this.ball.x = this.CANVAS_WIDTH / 2;
        this.ball.y = this.CANVAS_HEIGHT / 2;
        this.ball.vx = this.BALL_VX;
        this.ball.vy = this.BALL_VY;
        clearInterval(this.PLAYGAME);
        if (this.CURRENT_SCORE > this.HIGH_SCORE) {
            this.HIGH_SCORE = this.CURRENT_SCORE;
        }
        this.CURRENT_SCORE = 0;
        this.init();
    }

    // Initialize the game
    init() {
        this.clearCanvas();
        this.Text.draw();
        canvas.addEventListener("click", this.x.bind(this));
        document.getElementById("curr_score").innerText = `YOUR SCORE : ${this.CURRENT_SCORE}`;
        document.getElementById("high_score").innerText = `HIGH SCORE : ${this.HIGH_SCORE}`;
        this.ball.draw();
        this.paddle.draw();
        this.obstacle.createGrid();
        this.obstacle.create();
        if (window.screen.width < 800) {
            this.controller.draw();
        }
    }

    // Start the game loop
    x() {
        setTimeout(() => {
            this.PLAYGAME = setInterval(this.drawOnCanvas.bind(this), 10);
            setInterval(this.drawController.bind(this), 10);
        }, 3000);
        this.Text.draw("Game starts in 3 secs!");
        canvas.removeEventListener("click", this.x.bind(this));
        canvas.addEventListener("click", this.x.bind(this));
        canvas.addEventListener("mousemove", (e) => {
            this.paddle.move(e);
        });
    }

    // Draw controller
    drawController() {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        this.controller.draw();
        if (window.screen.width < 800) {
            canvas1.addEventListener("touchmove", (e) => {
                this.controller.move(e);
            });
        }
    }

    // Text object for drawing messages
    Text = {
        text: "Click to start Playing",
        draw: (str = "") => {
            ctx.clearRect(0, this.CANVAS_HEIGHT / 2 + 20, canvas.width, 100);
            ctx.font = "2em Roboto sans-serif";
            ctx.fillStyle = "#000000";
            const message = str || this.text;
            ctx.fillText(
                message,
                this.CANVAS_WIDTH / 2 - 150,
                this.CANVAS_HEIGHT / 2 + 60
            );
        },
    };

    // Controller object
    controller = {
        x: canvas1.width / 2,
        y: canvas1.height / 2,
        radius: this.BALL_RADIUS,
        draw: function () {
            ctx1.fillStyle = "#000000";
            ctx1.beginPath();
            ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx1.fill();
            ctx1.closePath();
        },
        move: function (e) {
            const touchX = e.touches[0].clientX;
            if (touchX < canvas1.width && touchX > 0) {
                this.x = touchX;
            } else if (touchX >= canvas1.width) {
                this.x = canvas1.width - 20 - this.radius;
            } else if (touchX <= 0) {
                this.x = 20 + this.radius;
            }
            paddle.move({ offsetX: this.x });
        },
    };

    // Obstacle object
    obstacle = {
        height: this.OBSTACLE_HEIGHT,
        width: this.OBSTACLE_WIDTH,
        x: this.OBSTACLE_START_X,
        y: this.OBSTACLE_START_Y,
        draw: function (x, y) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(x, y, this.width, this.height);
        },
        create: function () {
            for (let i = 0; i < this.LOC.length; i++) {
                this.draw(this.LOC[i][0], this.LOC[i][1]);
            }
        },
        destroy: function (x, y) {
            ctx.clearRect(x, y, this.width, this.height);
        },
        createGrid: function () {
            for (let i = 0; i < this.OBSTACLE_ROW_COUNT; i++) {
                this.x = this.OBSTACLE_START_X;
                for (let j = 0; j < this.OBSTACLE_COL_COUNT; j++) {
                    this.LOC.push([this.x, this.y]);
                    this.x += this.width + this.OBSTACLE_PADDING;
                }
                this.y += this.height + this.OBSTACLE_PADDING;
            }
            this.y = this.OBSTACLE_START_Y;
        },
    };

    // Ball object
    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: this.BALL_RADIUS,
        vx: this.BALL_VX,
        vy: this.BALL_VY,
        draw: function () {
            ctx.beginPath();
            ctx.fillStyle = "#000000";
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
        },
        move: function () {
            this.x += this.vx;
            this.y += this.vy;

            // Handle collisions with canvas edges
            if (this.x + this.radius >= this.CANVAS_WIDTH || this.x - this.radius <= 0) {
                this.vx = -this.vx;
            }

            // Update the velocity slightly to increase difficulty
            this.vx *= 1.005;
           }
        }
 }
                
            