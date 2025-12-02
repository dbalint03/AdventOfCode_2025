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
  //   console.log(num);
  let numarray = Array.from(String(num));
  //   console.log(numarray);
  if (numarray.length % 2 !== 0) {
    return false;
  }
  for (let i = 0; i < numarray.length / 2; i++) {
    const a = numarray[0 + i];
    const b = numarray[numarray.length / 2 + i];
    if (a !== b) {
      return false;
    }
  }
  console.log("invalid\n");

  return true;
}
