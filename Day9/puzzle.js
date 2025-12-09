import { log } from "console";
import fs from "fs";
import { get } from "http";
import readline from "readline";

const coords = [];
async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    const values = line.split(",");
    const coord = { x: values[0], y: values[1] };
    coords.push(coord);
  }
}
await processLineByLine();

// console.log(coords);
const areas = getAreas(coords);
// for (let i = 0; i < areas.length; i++) {
//   console.log(areas[i].join("\t"));
// }
console.log(`largest area is: ${largestArea(areas)}`);

function area(a, b) {
  return (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
}

function getAreas(coords) {
  let areas = [];
  for (let i = 0; i < coords.length; i++) {
    const current = coords[i];
    areas[i] = [];
    for (let j = 0; j < coords.length; j++) {
      areas[i][j] = [];
      if (j < i) {
        // areas[i][j] = 0;
        continue;
      }
      areas[i][j] = area(coords[i], coords[j]);
    }
  }
  return areas;
}

function largestArea(areas) {
  let largest = areas[0][0];
  for (let i = 0; i < areas.length; i++) {
    for (let j = i + 1; j < areas[0].length; j++) {
      //   sorted.push([i, j]);
      if (areas[i][j] > largest) {
        largest = areas[i][j];
      }
    }
  }
  //   sorted.sort((a, b) => areas[a[0]][a[1]] - areas[b[0]][b[1]]);
  return largest;
}
