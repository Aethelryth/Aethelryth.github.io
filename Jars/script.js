
function drawJar(canvas, fillPercent) {
    canvas.width = 100;
    canvas.height = 130;
    ctx = canvas.getContext('2d');
    // Dimensions of the jar
    const centerX = 50;         // Canvas center X
    const topY = 20;            // Top of lid
    const bottomNeckY = 30;     // Bottom of the lid
    const radiusX = 30;         // Horizontal radius for ellipse
    const radiusY = 10;         // Vertical radius for ellipse
    const bottomY = 110;        // Bottom of the jar
    const width = 5;            // Widening factor of the jar
    const jarneck = 10;         // Length of the jar neck

    ctx.strokeStyle = '#00000';
    ctx.fillStyle = '#a52a2a';
    ctx.lineWidth = 2;

    // LID
    // Top ellipse
    ctx.beginPath();
    ctx.ellipse(centerX, topY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Side of lid
    ctx.beginPath();
    ctx.moveTo(centerX - radiusX, topY);    // Left edge of top ellipse
    ctx.lineTo(centerX - radiusX, bottomNeckY); // Left bottom
    ctx.stroke();
    ctx.beginPath();
    ctx.lineTo(centerX + radiusX, topY);    // Right edge of top ellipse
    ctx.lineTo(centerX + radiusX, bottomNeckY); // Right bottom
    ctx.stroke();
    
    // Bottom lid ellipse
    ctx.beginPath();
    ctx.ellipse(centerX, bottomNeckY, radiusX, radiusY, 0, 0, Math.PI);
    ctx.stroke();
    // END LID
    // JAR NECK
    ctx.beginPath();
    ctx.moveTo(centerX - radiusX,bottomNeckY);
    ctx.lineTo(centerX - radiusX - width,bottomNeckY + jarneck);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX + radiusX,bottomNeckY);
    ctx.lineTo(centerX + radiusX + width,bottomNeckY + jarneck);
    ctx.stroke();

    // SIDE WALLS
    ctx.beginPath();
    ctx.moveTo(centerX - radiusX - width, bottomNeckY + jarneck);    // Left edge of top ellipse
    ctx.lineTo(centerX - radiusX - width, bottomY); // Left bottom
    ctx.stroke();
    ctx.beginPath();
    ctx.lineTo(centerX + radiusX + width, bottomNeckY + jarneck);    // Right edge of top ellipse
    ctx.lineTo(centerX + radiusX + width, bottomY); // Right bottom
    ctx.stroke();

    // Bottom ellipse
    ctx.beginPath();
    ctx.ellipse(centerX, bottomY, radiusX+width, radiusY, 0, 0, Math.PI);
    ctx.stroke();
}

var canvas = document.getElementById("jar1");



drawJar(canvas);


