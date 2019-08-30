class Edge {
    constructor(vertex1,vertex2,isDirected=false,weight=0) {
        this.vertex1 = vertex1;
        this.vertex2 = vertex2;
        this.weight = weight;
        this.isDirected = isDirected;
    }
}

let vertexCount = 0;
class Vertex {
    constructor(content,label = ("v"+vertexCount++)){
        this.content = content;
        this.label = label;
    }
}

class Graph {
    constructor(edges=[],vertices=[]){
        this.edges = [];
        edges.forEach(edge => {
            let children = this.edges[edge.vertex1];
            if(!children)
                children = [edge.vertex2];
        });
        this.vertices = vertices;
    }
    addVertex(vertex){
        if(!vertex)
            console.error("Can't add undefined vertices");
        else 
            this.vertices.push(vertex);
    }
    removeVertex(vertex){
        if(!vertex){
            console.error("Can't remove undefined vertex");
        } else if(!this.vertices.includes(vertex)){
            console.log(this.vertices,vertex);
            console.error("Vertex must be present in the graph.");
        } else {
            this.edges = this.edges.filter(e => e.vertex1 != vertex && e.vertex2 != vertex);
            this.vertices.splice(this.vertices.indexOf(vertex),1);
        }
    }
    addEdge(edge){
        if(!edge){
            console.error("Can't add undefined edges");
        } else if(!this.vertices.includes(edge.vertex1) || !this.vertices.includes(edge.vertex2)){
            console.error("The vertices of an edge must be present in the graph.");
        } else {
            let v1Edges = this.edges[edge.vertex1];
            if(!v1Edges) 
                v1Edges = this.edges[edge.vertex1] = [edge];  
            else
                v1Edges.push(edge);

            if(!edge.isDirected){
                let v2Edges = this.edges[edge.vertex2];
                if(!v2Edges) 
                    v2Edges = this.edges[edge.vertex2] = [edge];  
                else
                    v2Edges.push(edge);
            }
            console.log(this.edges);
        }
    }
    removeEdge(edge){
        if(!edge){
            console.error("Can't remove undefined edges");
        } else if(!this.vertices.includes(edge.vertex1) || !this.vertices.includes(edge.vertex2)){
            console.error("The vertices of an edge must be present in the graph.");
        } else {
            let v1Edges = this.edges[edge.vertex1];
            if(!v1Edges) v1Edges.delete(edge);  

            if(!edge.isDirected){
                let v2Edges = this.edges[edge.vertex2];
                if(!v2Edges) v2Edges.delete(edge);  
            }
        }
    }
    getEdges(vertex){
        if(!vertex){
            console.error("Vertex is undefined");
        } else if(!this.vertices.includes(vertex)){
            console.error("Vertex does not exist in the graph.");
        } else {
            const vertexEdges = this.edges[vertex];
            return vertexEdges ? vertexEdges : [];  
        }
    }
    getChildren(vertex){
        return this.getEdges.map(edge => edge.vertex2);
    }
}