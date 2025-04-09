
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
    var newItem = randomFromArray(array_to_source);
    while (array_to_exclude.includes(newItem)) {
        newItem = randomFromArray(array_to_source);
    }
    return newItem
}


function startGame() {
    myGameArea.start();
    SCNComponentManager.start(2);
    SCNComponentManager.addShape();
    SCNComponentManager.addShape();
    SCNComponentManager.addShape();
    SCNComponentManager.addShape();
    SCNComponentManager.addShape();
    // TODO add SCNComponent manager start
    ting = new buttonRect(50, 50, "red", "hi", 50, 50);
}

// Game area canvas and initialiser
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = window.innerWidth * 0.80;
        this.canvas.height = window.innerHeight * 0.80;
        this.context = this.canvas.getContext("2d");
        this.canvas.style.marginBottom = "60px";
        var fontsize = this.canvas.width / 25;
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

// Helper class, used to create and manage each seen component with a shape, colour and number
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
            var ctx = myGameArea.context;
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
            var textWidth = ctx.measureText(this.number).width;
            ctx.strokeText(this.number, this.x + Math.floor(this.size / 2) - Math.floor(textWidth / 2), this.y + Math.floor(this.size * 0.9));
            ctx.fillText(this.number, this.x + Math.floor(this.size / 2) - Math.floor(textWidth / 2), this.y + Math.floor(this.size * 0.9));
        }
    }
}
// Manager of shapeColourNumber components
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
        var newShape = randomFromArrayExcludeArray(this.possibleShapes, this.usedShapes);
        newShape = "Triangle";
        var newNum = randomFromArrayExcludeArray(this.possibleNums, this.usedNums);
        var newShapeCol = randomFromArrayExcludeArray(this.possibleShapeCols, this.usedShapeCols);
        var newNumCol = randomFromArrayExcludeArray(this.possibleNumCols, this.usedNumCols);
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
        var increment = Math.floor(myGameArea.canvas.width * 0.70) / (this.shapes.length - 1);
        var leftMost = Math.floor(myGameArea.canvas.width * 0.15);
        var yPos = Math.floor(myGameArea.canvas.height * 0.45);
        for (var index = 0; index < this.shapes.length; index++) {
            this.shapes[index].move(leftMost + increment * index, yPos);
            this.shapes[index].update();
        }
    },
    clearSelf: function () {
        this.shapes = [];
        this.usedShapes = [];
        this.usedCols = [];
        this.usedNums = [];
        this.shapeSize = myGameArea.canvas.width / 20;
    }
}

// Clickable rectangle
class buttonRect {
    constructor(width, height, color, text, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.text = text;
        this.x = x;
        this.y = y;
        this.update = function () {
            var ctx = myGameArea.context;
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.numberColor;
            ctx.strokeStyle = "black";
            ctx.font = myGameArea.font;
            var textWidth = ctx.measureText(this.text).width;
            ctx.strokeText(this.text, this.x + Math.floor(this.width / 2) - Math.floor(textWidth / 2), this.y + Math.floor(this.height * 0.9));
            ctx.fillText(this.text, this.x + Math.floor(this.height / 2) - Math.floor(textWidth / 2), this.y + Math.floor(this.height * 0.9));
        };
        this.clicked = function () {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var clicked = true;
            if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
                clicked = false;
            }
            if (clicked == true){
                console.log("clicked");
            }
            return clicked;
        };
    }
}

// TODO make button manager
var buttonManager = {
    start: function () {

    }
}

// TODO create game state:
// Game states are start, end, showing colnums, asking for answer, reward. Score is always shown at the top.
// Start is a button in the middle of the screen, leads to showing colnums
// Showing colnums is self descriptive, either button or timeout to answer input
// Answer input goes to reward screen
// Reward screen shows correct/incorrect, goes to showing colnums or end screen (2 buttons)
var BTGame = {
    state: "Await",
}

function updateGameArea() {
    myGameArea.clear();
    SCNComponentManager.arrangeShapes();
    ting.update();
}

function endGame() {
    myGameArea.canvas.remove();
}