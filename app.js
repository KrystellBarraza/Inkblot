var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var instructions = document.getElementById("instructions");

var radius = 2; 
var dragging = false; 

canvas.width = 600;
canvas.height = 600;

context.fillStyle = "black";
context.strokeStyle = "black";
context.lineCap = "round";
context.globalAlpha = "0.2";
context.lineWidth = 25;
context.shadowBlur = 4;
context.shadowColor = "black";
context.globalCompositeOperation = "source-over";

var putPoint = function(e){
    var x = e.offsetX;
    var y = e.offsetY;

    if(dragging){
    context.lineTo(e.offsetX, e.offsetY);
    context.beginPath();
    context.fill();
    context.moveTo(e.offsetX, e.offsetY);
    }
    
    console.log(e);
    if(e.buttons == 1) {
    mirrorPoint(prevX, prevY, x, y);
    mirrorPoint(600 - prevX, prevY, 600 - x, y);
    mirrorPoint(prevX, 600 - prevY, x);
    mirrorPoint(prevY, prevX, y, x);
    mirrorPoint(600 - prevY, prevX, 600 - y, x);
        }
    prevX = x;
    prevY = y;
}

var mirrorPoint = function(x1, y1, x2, y2){
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

var engage = function(){
    dragging = true; 
    putPoint(e);
    mirrorPoint(e);
}

var disengage = function(){
    dragging = false; 
    context.beginPath();
}

canvas.addEventListener("mousemove", putPoint);
canvas.addEventListener("mousedown", engage);
canvas.addEventListener("mouseup", disengage);

document.getElementById("clear").addEventListener("click", function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    instructions.style.display = 'block';
}, false);

document.getElementById("canvas").addEventListener("mousedown", function() {
    instructions.style.display = 'none';
}, false);

