import fs from "fs";
import readline from "readline";

let matrix = [];
let outMatrix = [];
async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let sum = 0;
  for await (const line of rl) {
    matrix.push(line.split("").map((e) => (e === "@" ? 1 : 0)));
  }
}
await processLineByLine();
outMatrix = matrix.map((matrix) => matrix.slice());
filterMatrix(matrix);
printMatrix(matrix);
printMatrix(outMatrix);

const sum = outMatrix.reduce(
  (sum2, row) => sum2 + row.reduce((sum, e) => sum + (e === "x" ? 1 : 0), 0),
  0
);
console.log(sum);

function printMatrix(mat) {
  console.log("\n\n");
  console.log(mat.map((row) => row.join("")).join("\n"));
}

function countNeightbours(mat, x, y) {
  let neighbourCount = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (
        mat[x + dx] &&
        mat[x + dx][y + dy] &&
        !(x == x + dx && y == y + dy) &&
        mat[x + dx][y + dy]
      ) {
        neighbourCount += 1;
      }
    }
  }
  return neighbourCount;
}

function filterMatrix(mat) {
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat.length; j++) {
      let neighbours = countNeightbours(mat, i, j);
      if (mat[i][j] === 1 && neighbours < 4) {
        outMatrix[i][j] = "x";
      }
    }
  }
}
