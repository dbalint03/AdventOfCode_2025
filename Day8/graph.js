class Graph {
  constructor() {
    this.list = {};
  }
  addNode(node) {
    this.list[node] = [];
  }
  addEdge(source, dest) {
    this.list[source].push(dest);
    this.list[dest].push(source);
  }
  isEdge(source, dest) {
    return this.list[source].includes(dest);
  }
  countEdges() {
    let sum = 0;
    for (const key in this.list) {
      if (!Object.hasOwn(this.list, key)) continue;
      sum += this.list[key].length;
    }
    console.log(sum);

    return sum / 2;
  }
  isConnected(source, target) {
    const visited = new Set();
    return this.isConnectedDFS(source, target, visited);
  }
  isConnectedDFS(node, target, visited) {
    if (node === target) return true;
    visited.add(node);

    for (const neighbor of this.list[node]) {
      if (!visited.has(neighbor)) {
        if (this.isConnectedDFS(neighbor, target, visited)) return true;
      }
    }

    return false;
  }
  lengthOfConnectedParts() {
    const visited = new Set();
    const paths = [];
    for (const key in this.list) {

      if (visited.has(Number(key))) {
        continue;
      }

      paths.push(this.lengthOfConncectedDFS(key, visited));
    }
    return paths;
  }
  lengthOfConncectedDFS(node, visited) {

    if (this.list[node].length === 0) {
      visited.add(Number(node));
      return 1;
    }
    let sum = 0;
    visited.add(Number(node));
    for (const neighbor of this.list[node]) {
      if (!visited.has(neighbor)) {

        sum += this.lengthOfConncectedDFS(neighbor, visited);
      }
    }
    return 1 + sum;
  }
}
export default Graph;
