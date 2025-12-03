import { log } from "console";
import fs from "fs";
import readline from "readline";

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let sum = 0;
  for await (const line of rl) {
    console.log(line);

    let maxIndex = 0;
    let result = "";
    for (let i = 0; i < line.length - 1; i++) {
      const element = line[i];
      // console.log(element);
      if (Number.parseInt(element) > Number.parseInt(line[maxIndex])) {
        maxIndex = i;
      }
    }
    log(`max index: ${maxIndex}`);
    let secondIndex = maxIndex + 1;
    for (let j = maxIndex + 1; j < line.length; j++) {
      const element = line[j];
      if (Number.parseInt(element) > Number.parseInt(line[secondIndex])) {
        secondIndex = j;
      }
    }
    // console.log(maxIndex);
    // console.log(secondIndex);
    result += line[maxIndex] + line[secondIndex];
    log(result);
    sum += Number.parseInt(result);
    log(`Current sum: ${sum}`);
  }
  console.log(`Sum of results is: ${sum}`);
}
await processLineByLine();
