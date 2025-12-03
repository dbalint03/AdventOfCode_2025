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
    const tokens = line.split(",");
    console.log(tokens);

    for (const token of tokens) {
      const nums = token.split("-");
      console.log(nums);

      const start = Number.parseInt(nums[0]);
      const end = Number.parseInt(nums[1]);
      console.log(`start: ${start}, end: ${end}`);

      for (let i = start; i <= end; i++) {
        if (isInValid(i)) {
          console.log(`Num ${i} is invalid!`);
          sum += Number.parseInt(i);
        }
      }
    }
  }
  console.log(`Sum of invalid nums is: ${sum}`);
}

await processLineByLine();

function isInValid(num) {
  let numarray = Array.from(String(num));
  for (let i = 1; i <= numarray.length / 2; i++) {
    const toMatch = numarray.slice(0, i);
    let invalid = true;
    if (numarray.length % i !== 0) continue;
    for (let j = i; j <= numarray.length - i; j += i) {
      const remainder = numarray.slice(j, j + i);
      if (remainder.toString() !== toMatch.toString()) {
        invalid = false;
        continue;
      }
    }
    if (invalid) return true;
  }

  return false;
}
