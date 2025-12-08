import fs from "fs";
import readline from "readline";
import Graph from "./graph.js";

let coords = [];
let graph = new Graph();
let distances = [];
let shortestPairs = [];
async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let i = 0;
  for await (const line of rl) {
    const values = line.split(",");
    const coord = { x: values[0], y: values[1], z: values[2] };
    coords.push(coord);
    graph.addNode(i);
    i++;
  }
}
await processLineByLine();

// for (const key in graph.list) {
//   console.log(key);
// }
console.log(coords);
getPaths(coords);

// console.log(distance(coords[0], coords[1]));

// for (let i = 0; i < distances.length; i++) {
//   console.log(distances[i].join("\t"));
// }
shortestPaths(distances, 10);

console.log(graph.list);
// console.log(graph.countEdges());
let circuits = graph.lengthOfConnectedParts();
console.log(circuits);
console.log(circuits.sort((a, b) => b - a).slice(0,3).reduce((a,b) => a*b));
// console.log(circuits);

// console.log(graph.isConnected(1, 6));
function distance(a, b) {
  return Math.floor(
    Math.sqrt(
      Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
    )
  );
}

function getPaths(coords) {
  for (let i = 0; i < coords.length; i++) {
    const current = coords[i];
    distances[i] = [];
    for (let j = 0; j < coords.length; j++) {
      distances[i][j] = [];
      if (j < i) {
        distances[i][j] = 0;
        continue;
      }
      distances[i][j] = distance(current, coords[j]);
    }
  }
}

function shortestPaths(matrix, n) {
  let sorted = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix[0].length; j++) {
      sorted.push([i, j]);
    }
  }
//   console.log(sorted);
  sorted.sort((a, b) => matrix[a[0]][a[1]] - matrix[b[0]][b[1]]);
//   console.log(sorted);
//   console.log(sorted.slice(0, n).map((e) => matrix[e[0]][e[1]]));

  //   let shortest = [0, 1];
  //   for (let i = 0; i < matrix.length; i++) {
  //     for (let j = i + 1; j < matrix[0].length; j++) {
  //       if (matrix[i][j] < matrix[shortest[0]][shortest[1]]) {
  //         shortest[0] = i;
  //         shortest[1] = j;
  //       }
  //     }
  //   }
  //   console.log(shortest);
  //   graph.addEdge(shortest[0], shortest[1]);
  //   sorted.slice(0, n).map(e=> graph.addEdge(e[0], e[1]));

  let total = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (!graph.isConnected(sorted[i][0], sorted[i][1])) {
      graph.addEdge(sorted[i][0], sorted[i][1]);
    }
    total++;
    if (total == n) {
      break;
    }
  }
}
