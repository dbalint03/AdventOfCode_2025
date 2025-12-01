import fs from "fs";
import readline from "readline";

let dial = 50;
let counter = 0;
async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    const direction = line.slice(0, 1);
    const value = parseInt(line.slice(1));
    console.log(direction + " " + value);
    if (direction === "R") {
      add(value);
    } else {
      minus(value);
    }
    if (dial === 0) {
      counter++;
    }
  }
}

await processLineByLine();
console.log("Final values of dial: " + dial);
console.log("Times of reaching zero: " + counter);

function add(num) {
  while (num > 99) {
    num -= 100;
    counter++;
  }
  if (dial + num > 99) {
    if (dial !== 0 && dial - 100 + num !== 0) {
      counter++;
    }
    dial -= 100;
  }
  dial += num;
}

function minus(num) {
  while (num > 99) {
    num -= 100;
    counter++;
  }
  if (dial - num < 0) {
    if (dial !== 0 && dial + 100 - num !== 0) {
      counter++;
    }
    dial += 100;
  }
  dial -= num;
}
