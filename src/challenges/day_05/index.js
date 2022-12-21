import process from "process";
import { fileURLToPath } from "url";
import { processLineByLine } from "../../lib/linereader.js";

const charRegexp = new RegExp("[A-Z]+");
const numRegexp = new RegExp(/\d+/g);
const keyMap = {
  1: 1,
  2: 5,
  3: 9,
  4: 13,
  5: 17,
  6: 21,
  7: 25,
  8: 29,
  9: 33,
};

export const cargoLoader = async (part, input) => {
  const lr = await processLineByLine(input);
  let keyLines = {};
  let lineNumber = 1;
  let key = true;

  const queue = {
    q1: [],
    q2: [],
    q3: [],
    q4: [],
    q5: [],
    q6: [],
    q7: [],
    q8: [],
    q9: [],
  };

  for await (const line of lr) {
    if (key == true) {
      keyLines[lineNumber] = line.split("");
      Object.assign(keyLines, { lineNumber: line.split("") });
      lineNumber++;
      if (line === "") {
        key = false;
        for (const v of Object.values(keyLines)) {
          charRegexp.test(v[keyMap[1]]) ? queue["q1"].push(v[keyMap[1]]) : null;
          charRegexp.test(v[keyMap[2]]) ? queue["q2"].push(v[keyMap[2]]) : null;
          charRegexp.test(v[keyMap[3]]) ? queue["q3"].push(v[keyMap[3]]) : null;
          charRegexp.test(v[keyMap[4]]) ? queue["q4"].push(v[keyMap[4]]) : null;
          charRegexp.test(v[keyMap[5]]) ? queue["q5"].push(v[keyMap[5]]) : null;
          charRegexp.test(v[keyMap[6]]) ? queue["q6"].push(v[keyMap[6]]) : null;
          charRegexp.test(v[keyMap[7]]) ? queue["q7"].push(v[keyMap[7]]) : null;
          charRegexp.test(v[keyMap[8]]) ? queue["q8"].push(v[keyMap[8]]) : null;
          charRegexp.test(v[keyMap[9]]) ? queue["q9"].push(v[keyMap[9]]) : null;
        }
        for (const k of Object.keys(queue)) {
          queue[k].reverse();
        }
      }
    } else {
      let moves = line.match(numRegexp);
      let i = moves[0];
      if (part === 1) {
        do {
          i--;
          const el = queue[`q${moves[1]}`].pop();
          queue[`q${moves[2]}`].push(el);
        } while (i > 0);
      } else {
        let minusI = i - i * 2;
        queue[`q${moves[2]}`] = queue[`q${moves[2]}`].concat(
          queue[`q${moves[1]}`].splice(minusI, i)
        );
      }
    }
  }

  let message = "";
  for (const k of Object.keys(queue)) {
    message += queue[k].pop();
  }

  return message;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(
    `The total score if following the guide Part 1: ${await cargoLoader(
      1,
      "./input.txt"
    )}`
  );
  console.log(
    `The total score if following the guide Part 2: ${await cargoLoader(
      2,
      "./input.txt"
    )}`
  );
}
