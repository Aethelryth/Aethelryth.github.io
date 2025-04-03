
// Useful helper function
function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function randomFromArrayExcludeArray(array_to_source, array_to_exclude) {
    // Error check and quit if fatal
    if (array_to_source.every(r => array_to_exclude.includes(r))) {
        console.log("FATAL: FOUND ALL OF ", array_to_source, " IN ", array_to_exclude);
        endGame();
    }
    let newItem = randomFromArray(array_to_source);
    while (array_to_exclude.includes(newItem)) {
        newItem = randomFromArray(array_to_source);
    }
    return newItem
}

var gamePieces = [];
var numGamePieces = 10;
var trianglePiece;

function startGame() {
    myGameArea.start();
    SCNComponentManager.start(2);
    SCNComponentManager.addShape();
    SCNComponentManager.addShape();
    SCNComponentManager.addShape();
    SCNComponentManager.addShape();
    SCNComponentManager.addShape();
    // TODO add SCNComponent manager start
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = window.innerWidth * 0.80;
        this.canvas.height = window.innerHeight * 0.80;
        this.context = this.canvas.getContext("2d");
        this.canvas.style.marginBottom = "60px";
        let fontsize = this.canvas.width / 25;
        this.font = fontsize + "px Verdana";
        document.getElementById("content").appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
        this.canvas.style.background = "silver";
    },
    clear: function () {
        this.canvas.width = window.innerWidth * 0.80;
        this.canvas.height = window.innerHeight * 0.80;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


class shapeColourNumberComponent {
    constructor(shape, shapeColor, number, numberColor, x, y, size) {
        this.shape = shape;
        this.shapeColor = shapeColor;
        this.number = number;
        this.numberColor = numberColor;
        this.x = x;
        this.y = y;
        this.size = size;
        this.move = function (x, y) {
            this.x = x;
            this.y = y;
        }
        this.update = function () {
            let ctx = myGameArea.context;
            ctx.fillStyle = this.shapeColor;
            // Draw the shape, TODO all shapes
            ctx.beginPath();
            if (shape === "Triangle") {
                ctx.moveTo(this.x + Math.floor(this.size / 2), this.y);
                ctx.lineTo(this.x, this.y + this.size);
                ctx.lineTo(this.x + this.size, this.y + this.size);
                ctx.lineTo(this.x + Math.floor(this.size / 2), this.y);
                ctx.strokeStyle = this.shapeColor;
                ctx.fill();
            }
            ctx.fillStyle = this.numberColor;
            ctx.strokeStyle = "black";
            ctx.font = myGameArea.font;
            let textWidth = ctx.measureText(this.number).width;
            ctx.strokeText(this.number, this.x + Math.floor(this.size / 2) - Math.floor(textWidth / 2), this.y + Math.floor(this.size * 0.9));
            ctx.fillText(this.number, this.x + Math.floor(this.size / 2) - Math.floor(textWidth / 2), this.y + Math.floor(this.size * 0.9));
        }
    }
}

var SCNComponentManager = {
    start: function (number_of_starting_shapes) {
        this.num_shapes = number_of_starting_shapes;
        // Sizes shapes based on canvas width
        this.shapeSize = myGameArea.canvas.width / 20;
        // Possible things to choose from
        this.possibleShapes = ["Triangle", "Circle", "Square", "Trapezoid", "Diamond", "Pentagon", "Hexagon", "Heart"];
        this.possibleShapeCols = ["aqua", "blue", "fuchsia", "green", "maroon", "navy", "olive"];
        this.possibleNumCols = ["lime", "purple", "red", "teal", "yellow", "gray"];
        this.possibleNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this.maximumShapes = Math.min(this.possibleShapes.length, this.possibleShapeCols.length, this.possibleNumCols.length, this.possibleNums.length);
        console.log("Maximum shapes: ", this.maximumShapes);
        // possibleNums are 0-9, could be expanded to hexadecimal and/or letters in the future
        // Add shapes, tracking used possibilities
        this.shapes = [];
        this.usedShapes = [];
        this.usedCols = [];
        this.usedShapeCols = [];
        this.usedNumCols = [];
        this.usedNums = [];
    },

    addShape: function () {
        if (this.shapes.length == this.maximumShapes) {
            console.log("Shapes limit exceeded, exiting...");
            endGame();
        }
        let newShape = randomFromArrayExcludeArray(this.possibleShapes, this.usedShapes);
        newShape = "Triangle";
        let newNum = randomFromArrayExcludeArray(this.possibleNums, this.usedNums);
        let newShapeCol = randomFromArrayExcludeArray(this.possibleShapeCols, this.usedShapeCols);
        let newNumCol = randomFromArrayExcludeArray(this.possibleNumCols, this.usedNumCols);
        this.shapes.push(new shapeColourNumberComponent(newShape, newShapeCol, newNum, newNumCol, 0, 0, this.shapeSize));
        this.usedShapes.push(newShape);
        this.usedShapeCols.push(newShapeCol);
        this.usedNumCols.push(newNumCol);
        this.usedNums.push(newNum);
    },
    arrangeShapes: function () {
        // Shapes are x-positioned by the following rules:
        // 10% of the canvas on each side is blank (total 20%)
        // the rest of the space is divided into 80% / maximumShapes
        let increment = Math.floor(myGameArea.canvas.width * 0.70) / (this.shapes.length-1);
        let leftMost = Math.floor(myGameArea.canvas.width * 0.15);
        let yPos = Math.floor(myGameArea.canvas.height * 0.45);
        for (let index = 0; index < this.shapes.length; index++) {
            this.shapes[index].move(leftMost + increment * index, yPos);
            this.shapes[index].update();
        }
    },
    removeShapes: function () {
        this.shapes = [];
        this.usedShapes = [];
        this.usedCols = [];
        this.usedNums = [];
        this.shapeSize = myGameArea.canvas.width / 20;
    }
}

function updateGameArea() {
    myGameArea.clear();
    SCNComponentManager.arrangeShapes();
}

function endGame() {
    myGameArea.canvas.remove();
}