/*
1) Vertices connected by an edge are called adjacent vertices.
2) A degree of vertex = the number of adjacent vertices.
3) A path is a sequence of consecutive vertices v1, v2 ... vk where vi and vi + 1 are adjacent.
4) A simple path does not contain repeated vertices.
5) A cycle is a simple path except that the last vertex is the same as the first vertex. A graph is acyclic if it doesn't have cycles.
6) A path is connected if there is a path between every pair of vertices.  
7) A graph is strongly connected if there is a path in both directions between every pair of vertices.
8) Graphs can also be unweighted or weighted where edges have weights.

Graphs can be represented in a few ways:
    1) adjaceny matrix is the most common implementation. Each node is associated with an integer which is an array index and connectivity between vertices 
    is 1 (connected) or 0 (unconnected) in the 2-d array.
    The downside of adjaceny matrix is too much space is wasted for sparse graphs (not strongly connected graphs) as there are many 0 entries in the matrix; 
    a direct disadvantage, for example, is to find the adjacent vertices of a given vertex we have to iterate through the whole row even when there is only one
    adjacent vertex.
    Another downside is a 2-d array is inflexible when the number of vertices need to change.
    
    2) Another popular representation is adjaceny list. Namely, for each vertex, we use a list/array or even a dictionary to store its adjacent vertices.
    Adjaceny list is probably better than adjaceny matrix though which is faster for finding whether v and w are adjacent.
    
    3) A third way is using an incidence matrix in which each row represents a vertex and each column represents an edge of the graph. 
    And of course array[i][j] === 1 if there is such a edge on the graph. This is usually used to save space and memory when we have more edges than vertices.
*/

module.exports = function Graph(capacity) {
    capacity = capacity || 10;
    var vertices = new Array(capacity); // an array to store vertices on the graph
    var adList = new Map(); // a dictionary to store the adjacent list with vertex being the key.
    
    // add a vertex to the graph
    this.addVertex = v => {
        vertices.push(v);
        adList.set(v, []);
    }
    
    // add an edge between two vertices
    this.addEdge = (v, w) => {
        adList.get(v).push(w);
        adList.get(w).push(v);
    }
    
    this.toString = () => {
        var res = '';
        vertices.forEach(v => {
            res += v + ' -> ';
            var neighbors = adList.get(v);
            neighbors.forEach(n => res+= n + ' ');
            res += '\n';
        })
        return res;
    }
}