let canvas = document.getElementsByTagName("canvas")[0];
let context = canvas.getContext("2d");
resizeCanvas();
let mouseClicked = false;
let rows = 10;
let cols = 10;
initBackground();
let graph;
let path;


// Canvas
/*canvas.onmousedown = (e) => {
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
        let point = {x:e.clientX,y:e.clientY}
        path.push(point);
        drawPoint(point);        

        if(path.length > 1){
            drawLine(path[path.length-2], point);
        }
    }
}

// Simplify when changing epsilon 
let epsilonText = document.getElementById("fitting-epsilon");
epsilonText.addEventListener('change', () => executeSimplify())

function executeSimplify(){
    let epsilon = epsilonText.value;
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
*/
// Draw
function initBackground(){
    clearCanvas();
    for(let x=0 ; x < cols; x++)
        for(let y=0; y < rows; y++)
            drawVertex({'x':x,'y':y}, "#ccc");
}
function drawGraph(graph){
    graph.vertices.forEach(vertex => drawVertex(vertex));
}
function drawVertex(position, color='#000'){
    const vertexSize = Math.min(canvas.width/cols,canvas.height/rows);
    const x = position.x*vertexSize;
    const y = position.y*vertexSize;
    // Colorize
    context.fillStyle = color;
    context.fillRect(vertexSize, vertexSize, x, y);
    // Add background border (to distinguish between vertices)
    context.strokeStyle = '#fff';
    context.rect(vertexSize, vertexSize, x, y);
    context.stroke();
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

    // Redraw
    initBackground();
    drawGraph(graph);
    if(path) 
        drawPath(path);
}