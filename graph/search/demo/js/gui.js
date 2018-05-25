var canvas = document.getElementsByTagName("canvas")[0];
var context = canvas.getContext("2d");
resizeCanvas();
displayInstructions();
var mouseClicked = false;
var path = [];
var simplePath = [];


// Canvas
canvas.onmousedown = (e) => {
    mouseClicked = true;
    path = [];
    clearCanvas();
}

canvas.onmouseup = (e) => {
    mouseClicked = false;
    executeSimplify();
}

canvas.onmousemove = (e) =>  {
    if (mouseClicked) {
        var point = {x:e.clientX,y:e.clientY}
        path.push(point);
        drawPoint(point);        

        if(path.length > 1){
            drawLine(path[path.length-2], point);
        }
    }
}

// Simplify when changing epsilon 
var epsilonText = document.getElementById("fitting-epsilon");
epsilonText.addEventListener('change', () => executeSimplify())

function executeSimplify(){
    var epsilon = epsilonText.value;
    if(epsilon < 0){
    	epsilon = 0;
	epsilonText.value = epsilon;
    }
    if(path.length > 1){
        clearCanvas();
        simplePath = simplify(path,epsilon);
        drawPath(path,'#ccc');
        drawPath(simplePath);
    }
}

// Draw
function drawPath(path,color='#000'){
    var prevPoint = undefined;
    for(id in path){
        var point = path[id];
        drawPoint(point,color);
        if(prevPoint){
            drawLine(prevPoint,point,color);
        }
        prevPoint = point;
    }
}

function drawLine(pointA,pointB,color='#000'){
    context.beginPath();
    context.moveTo(pointA.x,pointA.y);
    context.lineTo(pointB.x,pointB.y);
    context.lineWidth = 5;
    context.strokeStyle = color;
    context.stroke();
}

function drawPoint(point,color='#000'){
    context.beginPath();
    context.arc(point.x, point.y, 3, 0, Math.PI * 2, false);
    context.lineWidth = 3;
    context.strokeStyle = color;
    context.stroke();
}

function displayInstructions(){
    context.font = '40px Arial';
    context.textAlign='center'
    context.fillText("Draw with your mouse.",canvas.width/2,canvas.height/2);
}

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas(){
    canvas.style.height = "100%";
    canvas.style.width = "100%";
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
}

window.onresize = function(){
    clearCanvas();
    resizeCanvas();
    if(simplePath.length > 0){
        drawPath(path,'#ccc');
        drawPath(simplePath)
    }else{
        drawPath(path);
    }
}
