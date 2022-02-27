export default class Graph {

    constructor(array, horizontalLength, verticalLength) {

        this.diemsionalArray = new Array(horizontalLength);
        this.vertices = [];
        this.adjacentList = new Map();

        for (let i = 0; i<horizontalLength - 1; i++) {
            this.diemsionalArray[i] = new Array(verticalLength);
        }

        // Todo: Graph logic

    }

    addVertex = (vtx) => {
        this.vertices.push(vtx);

        // For each new vertex we add to creat an empty array which
        // holds the connection to the list
        this.adjacentList.set(vtx, []);
    }

    getAdjacencyListVertex = (vtx) => {
        return this.adjacentList.get(vtx);
    }

    addEdge = (u, v) => {
        let uVertex = this.getAdjacencyListVertex(u),
            vVertex = this.getAdjacencyListVertex(v);
        
        // Step1 : push V into U's list
        uVertex.push(v);

        // Step2 : push U into V's list
        vVertex.push(u);
    }

}