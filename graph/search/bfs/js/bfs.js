var searchBFS = (graph, start, goals) => {
    let open = [start];
    let closed = [];
    // Best edges for each vertex
    let paths = {};

    while(open.length > 0){
        let curVertex = open.pop();
        // Found goal
        if(goals.includes(curVertex))
            return backtrack(start,curVertex,paths);

        // Get all children and add them to open nodes
        console.log(graph.getEdges(curVertex));
	graph.getEdges(curVertex).forEach(edge => {
            const child = edge.vertex2;
            if(!closed.includes(child) && !open.includes(child)){
                paths[child] = edge;
                open.push(child);
            }
        });

        closed.push(curVertex);
    }
}

var backtrack = (startVertex, endVertex, paths) => {
    let path = [];

    let curVertex = endVertex;
    while(curVertex != startVertex){
        let edge = paths[curVertex];
        path.unshift(edge); // Add to the beginning

        curVertex = edge.vertex1;
    }
    console.log(path);
    return path;
}
