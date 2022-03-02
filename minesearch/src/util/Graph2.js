
// UndirectedGraph

export default class Graph2 {
    constructor() {
        this.edges = {};
    }

    _addVertex = (vertex) => {
        
    }

    _addEdge = (vertex1, vertex2) => {
        this.edges[vertex1][vertex2] = 1;
        this.edges[vertex2][vertex1] = 1;
    }

    _removeVertex = (vertex) => {
        for (let adjacentVertex in this.edges[vertex]) {
            this._removeEdge(adjacentVertex, vertex);
        }
        delete this.edges[vertex];
    }

    _removeEdge = (vertex1, vertex2) => {
        if (this.edges[vertex1] && this.edges[vertex1][vertex2] !== undefined) {
            delete this.edges[vertex1][vertex2];
        }
        if (this.edges[vertex2] && this.edges[vertex2][vertex1] !== undefined) {
            delete this.edges[vertex2][vertex1];
        }
    }

}