const saveButton = document.getElementById('saveSignature');
const offcanvas = document.querySelector('.offcanvas');
const canvas = document.getElementById('signatureCanvas');
const clearButton = document.getElementById('clearCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getMousePos(canvas, e);
}

function draw(e) {
    if (!isDrawing) return;
    const [currentX, currentY] = getMousePos(canvas, e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    [lastX, lastY] = [currentX, currentY];
}

function endDrawing() {
    isDrawing = false;
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return [
        evt.clientX - rect.left,
        evt.clientY - rect.top
    ];
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveSignature() {
    const img = canvas.toDataURL('image/png');
    const base64Image = img.replace(/^data:image\/(png|jpeg);base64,/, "");
    console.log(base64Image); // Log the base64 image string to the console
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mouseout', endDrawing); // end drawing when mouse leaves canvas

// support touch screens
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // prevent default touch behavior
    startDrawing(e.touches[0]);
});
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e.touches[0]);
});
canvas.addEventListener('touchend', endDrawing);
canvas.addEventListener('touchcancel', endDrawing);

clearButton.addEventListener('click', clearCanvas);
saveButton.addEventListener('click', saveSignature);

// canvase settings
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Set initial size