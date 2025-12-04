import { log } from "console";
import fs from "fs";
import { get } from "http";
import readline from "readline";

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let sum = 0;
  for await (const line of rl) {
    // console.log(line);

    let indexes = [];
    indexes[0] = 0;
    let result = "";
    for (let j = 0; j < 2; j++) {
      for (let i = indexes[j]; i < line.length - (2 - j - 1); i++) {
        if (Number.parseInt(line[i]) > Number.parseInt(line[indexes[j]])) {
          indexes[j] = i;
        }
      }
      indexes[j + 1] = indexes[j] + 1;
    }
    // console.log(
    //   getNMaxNumbers(line, 12)
    //     .map((i) => line[i])
    //     .join("")
    // );
    result += getNMaxNumbers(line, 12)
      .map((i) => line[i])
      .join("");
    sum += Number.parseInt(result);
    // log(`Current sum: ${sum}`);
  }
  console.log(`Sum of results is: ${sum}`);
}
await processLineByLine();

function getNMaxNumbers(arr, n) {
  let indexes = [];
  indexes[0] = 0;
  let result = "";
  for (let j = 0; j < n; j++) {
    for (let i = indexes[j]; i < arr.length - (n - j - 1); i++) {
      if (Number.parseInt(arr[i]) > Number.parseInt(arr[indexes[j]])) {
        indexes[j] = i;
      }
    }
    indexes[j + 1] = indexes[j] + 1;
  }
  return indexes.slice(0, n);
}
