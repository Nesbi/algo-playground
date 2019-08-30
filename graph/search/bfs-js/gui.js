let canvas = document.getElementsByTagName("canvas")[0];
let context = canvas.getContext("2d");
let mouseClicked = false;
let rows = 10;
let cols = 10;
let graph;
let vertices;
let path;
let start;
let goals = [];
let blocked = [];
resizeCanvas();
initBackground();
initGraph();

// Init Graph
function initGraph() {
    graph = new Graph();
    if(!vertices){
        vertices = [];
        for(let x=0 ; x < cols; x++)
            for(let y=0; y < rows; y++){
                // Create Vertex
                const vertex = new Vertex({'x':x,'y':y});

                if(y == 0) 
                    vertices[x] = [];
                vertices[x][y] = vertex;
            }
    }

    for(let x=0 ; x < cols; x++)
        for(let y=0; y < rows; y++){
            const vertex = vertices[x][y];
            graph.addVertex(vertex);

            // Add (undirected) Edges
            if(x > 0)
                graph.addEdge(new Edge(vertices[x-1][y],vertex));
            if(y > 0)
                graph.addEdge(new Edge(vertices[x][y-1],vertex));
        }
}

// Canvas
canvas.onmousedown = (e) => {
    mouseClicked = true;
}

canvas.onmouseup = (e) => {
    mouseClicked = false;
    const position = convertFromCanvas(e);
    if(position.x > 0 && position.x < cols && position.y > 0 && position.y < rows) {
        const vertex = vertices[position.x][position.y];

        const goalsIndex = goals.indexOf(vertex);
        const blockedIndex = blocked.indexOf(vertex);
        if(start == vertex){
            start = null;
            goals.push(vertex);
            drawVertex(position,"#f44336");
        } else if(goalsIndex >= 0){
            goals.splice(goalsIndex,1);
            blocked.push(vertex);
            drawVertex(position,"#000");
        } else if(blockedIndex >= 0){
            blocked.splice(blockedIndex,1);
            drawVertex(position,"#ccc");
        } else{
            if(start)
                drawVertex(start.content,'#ccc');

            start = vertex;
            drawVertex(position,"#4caf50");
        }
        executeSearch();
    }
}

canvas.onmousemove = (e) =>  {
    if (mouseClicked) {
        let position = convertFromCanvas(e);
        if(position.x > 0 && position.x < cols && position.y > 0 && position.y < rows) {
            let vertex = vertices[position.x][position.y];
            if(blocked.indexOf(vertex) == -1)
                blocked.push(vertex);
            
            blocked.forEach(b => drawVertex(b.content,"#000"));
        }
    }
}

function executeSearch(){
    if(start && goals.length > 0) {
        blocked.forEach(b => graph.removeVertex(b));
        console.log(searchBFS(graph,start,goals));
        initGraph();
    }
}

// Draw
function initBackground(){
    clearCanvas();
    for(let x=0 ; x < cols; x++)
        for(let y=0; y < rows; y++)
            drawVertex({'x':x,'y':y}, "#ccc");
}

function drawGraph(graph){
    graph.vertices.forEach(vertex => drawVertex(vertex.content));
}

function drawVertex(position, color='#000'){
    const vertexSize = getVertexSize();
    const x = (1+position.x)*vertexSize;
    const y = (1+position.y)*vertexSize;
    // Colorize
    context.fillStyle = color;
    context.fillRect( x, y, vertexSize, vertexSize);
    // Add background border (to distinguish between vertices)
    context.strokeStyle = '#fff';
    context.rect( x, y, vertexSize, vertexSize);
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

// Private helpers
function convertToCanvas(position){
    const vertexSize = getVertexSize();
    return {'x':(1+position.x)*vertexSize, 'y':(1+position.y)*vertexSize};
}

function convertFromCanvas(position){
    const vertexSize = getVertexSize();
    return {'x':Math.trunc(position.x/vertexSize - 1),'y': Math.trunc(position.y/vertexSize - 1)};
}

function getVertexSize(){
    return Math.min(canvas.width/(cols+2),canvas.height/(rows+2));
}