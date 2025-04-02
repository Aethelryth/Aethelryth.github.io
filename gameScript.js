
// Simple Game code
//         document.getElementById("content").appendChild(this.canvas)


var gamePieces = [];
var numGamePieces = 10;

function startGame() {
    myGameArea.start();
    for (var i = 0; i < numGamePieces; i++) {
        gamePieces.push(new component(30, 30, "blue", Math.floor(Math.random() * 450), Math.floor(Math.random() * 240)));
    }
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.getElementById("content").appendChild(this.canvas)
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
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
    myGameArea.canvas.remove()
}