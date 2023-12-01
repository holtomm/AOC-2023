import { createReadStream } from "fs";
import { createInterface } from "readline";

const numbers1a = [
  { text: "1", value: 1 },
  { text: "2", value: 2 },
  { text: "3", value: 3 },
  { text: "4", value: 4 },
  { text: "5", value: 5 },
  { text: "6", value: 6 },
  { text: "7", value: 7 },
  { text: "8", value: 8 },
  { text: "9", value: 9 }
];

const numbers1b = [
  { text: "one", value: 1 },
  { text: "two", value: 2 },
  { text: "three", value: 3 },
  { text: "four", value: 4 },
  { text: "five", value: 5 },
  { text: "six", value: 6 },
  { text: "seven", value: 7 },
  { text: "eight", value: 8 },
  { text: "nine", value: 9 },
  { text: "1", value: 1 },
  { text: "2", value: 2 },
  { text: "3", value: 3 },
  { text: "4", value: 4 },
  { text: "5", value: 5 },
  { text: "6", value: 6 },
  { text: "7", value: 7 },
  { text: "8", value: 8 },
  { text: "9", value: 9 }
];

async function sumOfCalibrationValues(mapping) {
  const fileStream = createReadStream("./input.txt");

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  let sum = 0;

  for await (let line of rl) {
    let lineNumbers = [];

    let pos = 0;
    while (line.length >= pos) {
      for await (const number of mapping) {
        if (line.indexOf(number.text, pos) === pos) {
          lineNumbers = [
            ...lineNumbers,
            { position: pos, number: number.value }
          ];
        }
      }
      pos++;
    }

    let first = lineNumbers.at(0);
    let last = lineNumbers.at(-1);
    let calVal = `${first.number}${last.number}`;
    sum = +sum + +calVal;
  }
  console.log(sum);
}

sumOfCalibrationValues(numbers1a);
sumOfCalibrationValues(numbers1b);
