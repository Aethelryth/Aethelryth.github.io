let currentZIndex = 1000; // Starting z-index
var boxOffsetMultiplier = 50; // Every box opens this many pixels further down & rightwards
var boxInitialOffsetX = 150; // Initial box offset
var boxInitialOffsetY = 100; // Initial box offset

// Ensure the window is large enough (only checks on startup)
if (window.innerWidth < 800 || window.windowHeight < 500) {
    // Modify draggable div window size to be thinner
    boxInitialOffsetX = 10;
    boxInitialOffsetY = 10;
    boxOffsetMultiplier = 10;
}


class DraggableDiv {
    constructor(element) {
        this.elmnt = element;
        // Make only header draggable if it exists, otherwise whole div
        this.header = this.elmnt.querySelector(".draggable-header") || this.elmnt;
        this.pos1 = this.pos2 = this.pos3 = this.pos4 = 0;

        // Mouse events
        this.header.onmousedown = (e) => {
            this.bringToFront();
            this.dragMouseDown(e);
        };
        this.elmnt.onmousedown = (e) => {
            this.bringToFront();
        };

        // Touch events
        this.header.ontouchstart = (e) => {
            this.bringToFront();
            this.dragTouchStart(e);
        };
        this.elmnt.ontouchstart = (e) => {
            this.bringToFront();
        };
    }

    bringToFront() {
        currentZIndex += 1;
        this.elmnt.style.zIndex = currentZIndex;
    }

    // Mouse down and touch down
    dragMouseDown(e) {
        e.preventDefault();
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;

        document.onmouseup = this.closeDragElement.bind(this);
        document.onmousemove = this.elementDrag.bind(this);
    }

    dragTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.pos3 = touch.clientX;
        this.pos4 = touch.clientY;

        document.ontouchend = this.closeDragElement.bind(this);
        document.ontouchmove = this.elementTouchMove.bind(this);
    }

    // Dragging the element
    elementDrag(e) {
        e.preventDefault();
        this._dragTo(e.clientX, e.clientY);
    }

    elementTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this._dragTo(touch.clientX, touch.clientY);
    }

    _dragTo(clientX, clientY) {
        this.pos1 = this.pos3 - clientX;
        this.pos2 = this.pos4 - clientY;
        this.pos3 = clientX;
        this.pos4 = clientY;

        if (!(this.elmnt.offsetWidth + this.elmnt.offsetLeft - this.pos1 > window.innerWidth) && !(this.elmnt.offsetLeft - this.pos1 < 0)) {
            this.elmnt.style.left = (this.elmnt.offsetLeft - this.pos1) + "px";
        }
        if (!(this.elmnt.offsetHeight + this.elmnt.offsetTop - this.pos2 > window.innerHeight) && !(this.elmnt.offsetTop - this.pos2 < 0)) {
            this.elmnt.style.top = (this.elmnt.offsetTop - this.pos2) + "px";
        }
    }

    // End drag
    closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}


// Apply to all draggable elements
const draggableInstances = {};
document.querySelectorAll('.draggable').forEach(el => {
    draggableInstances[el.id] = new DraggableDiv(el);
});



let openBoxCount = 0;


document.querySelectorAll('.icon-bar button').forEach(button => {
    button.addEventListener('click', () => {
        if (!button.hasAttribute("opens")) return;
        const targetId = button.getAttribute('opens');
        const box = document.getElementById(targetId);

        if (box && box.style.display !== 'block') {
            const offset = openBoxCount * boxOffsetMultiplier;
            box.style.top = `${boxInitialOffsetY + offset}px`;
            box.style.left = `${boxInitialOffsetX + offset}px`;
            draggableInstances[targetId]?.bringToFront();
            box.style.display = 'block';
            openBoxCount = (openBoxCount + 1) % 10;
        }
    });
});


document.querySelectorAll('.Close').forEach(button => {
    button.addEventListener('click', function () {
        const box = this.closest('.draggable');
        if (box) {
            box.style.display = 'none';
            openBoxCount--;
        }
    });
});