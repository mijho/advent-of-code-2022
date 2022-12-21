import process from "process";
import { fileURLToPath } from "url";
import { processLineByLine } from "../../lib/linereader.js";

const priorityMap = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

export const shuffleBackpacks = async (part, input) => {
  const lr = await processLineByLine(input);
  let sumTotal = 0;
  let group = [];

  for await (const line of lr) {
    if (part === 1) {
      const leftCompartment = line.slice(0, line.length / 2).split("");
      const rightCompartment = line.slice(line.length / 2).split("");
      for (const item of leftCompartment) {
        if (rightCompartment.includes(item)) {
          sumTotal += priorityMap[item];
          break;
        }
      }
    } else {
      if (group.length < 2) {
        group.push(line);
      } else {
        group.push(line);
        for (const item of group[0]) {
          if (group[1].includes(item) && group[2].includes(item)) {
            sumTotal += priorityMap[item];
            break;
          }
        }
        group = [];
      }
    }
  }
  return sumTotal;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(
    `The total score if following the guide Part 1: ${await shuffleBackpacks(
      1,
      "./input.txt"
    )}`
  );
  console.log(
    `The total score if following the guide Part 1: ${await shuffleBackpacks(
      2,
      "./input.txt"
    )}`
  );
}
