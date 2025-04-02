
// Simple Game code
//         document.getElementById("content").appendChild(this.canvas)


var gamePieces = [];
var numGamePieces = 10;

function startGame() {
    myGameArea.start();
    for (var i = 0; i < numGamePieces; i++) {
        gamePieces.push(new component(30, 30, "blue", Math.floor(Math.random() * myGameArea.canvas.width-30), Math.floor(Math.random() * myGameArea.canvas.height-30)));
    }
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = window.innerWidth * 0.80;
        this.canvas.height = window.innerHeight * 0.80;
        this.context = this.canvas.getContext("2d");
        document.getElementById("content").appendChild(this.canvas);
        this.canvas.style.marginBottom = "60px";
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.canvas.width = window.innerWidth * 0.80;
        this.canvas.height = window.innerHeight * 0.80;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class component {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.update = function () {
            let ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
    }
}

function updateGameArea() {
    myGameArea.clear();
    for (var i = 0; i < numGamePieces; i++) {
        gamePieces[i].update();
    }
}

function endGame() {
    myGameArea.canvas.remove();
}