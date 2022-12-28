import process from "process";
import { toASCII } from "punycode";
import { fileURLToPath } from "url";
import { processLineByLine } from "../../lib/linereader.js";

/*
    I'm a little stumped on this one. The only thing I can think
    is that it'd be easier if I had a grid to work with. So I'll 
    map that out to begin with and work from that point.

    Start at 0,0 and map out furthest left, right, up & down the
    instructions take us. This should map out a grid to use.
*/

const getDistanceFromHead = async (head, knot) => {
  return head - knot < 0 ? head - knot - (head - knot) * 2 : head - knot;
};

export const followMe = async (part, input) => {
  const lr = await processLineByLine(input);
  let total = 0;
  let [headX, headY, tailX, tailY, distance] = [0, 0, 0, 0, 0];
  let tailPosition = ["0:0"];

  for await (const line of lr) {
    const instruction = line.split(" ");
    switch (instruction[0]) {
      case "L":
        for (let i = 0; i < +instruction[1]; i++) {
          headX--;
          distance = await getDistanceFromHead(headX, tailX);

          if (headY === tailY && distance > 1) {
            tailX--;
          } else if (headY > tailY && distance > 1) {
            tailX--;
            tailY++;
          } else if (headY < tailY && distance > 1) {
            tailX--;
            tailY--;
          }
          tailPosition.push(`${tailX}:${tailY}`);
        }
        break;
      case "R":
        for (let i = 0; i < +instruction[1]; i++) {
          headX++;
          distance = await getDistanceFromHead(headX, tailX);

          if (headY === tailY && distance > 1) {
            tailX++;
          } else if (headY > tailY && distance > 1) {
            tailX++;
            tailY++;
          } else if (headY < tailY && distance > 1) {
            tailX++;
            tailY--;
          }
          tailPosition.push(`${tailX}:${tailY}`);
        }
        break;
      case "U":
        for (let i = 0; i < +instruction[1]; i++) {
          headY++;
          distance = await getDistanceFromHead(headY, tailY);

          if (headX === tailX && distance > 1) {
            tailY++;
          } else if (headX > tailX && distance > 1) {
            tailY++;
            tailX++;
          } else if (headX < tailX && distance > 1) {
            tailY++;
            tailX--;
          }
          tailPosition.push(`${tailX}:${tailY}`);
        }
        break;
      case "D":
        for (let i = 0; i < +instruction[1]; i++) {
          headY--;
          distance = await getDistanceFromHead(headY, tailY);

          if (headX === tailX && distance > 1) {
            tailY--;
          } else if (headX > tailX && distance > 1) {
            tailY--;
            tailX++;
          } else if (headX < tailX && distance > 1) {
            tailY--;
            tailX--;
          }
          tailPosition.push(`${tailX}:${tailY}`);
        }
        break;
      default:
        console.log("I don't like your input :(");
    }
  }

  total = new Set(tailPosition);
  return total.size;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(
    `The total score if following the guide Part 1: ${await followMe(
      1,
      "./input.txt"
    )}`
  );

  // console.log(
  //   `The total score if following the guide Part 2: ${await followMe(
  //     2,
  //     "./test_2.txt",
  //     9
  //   )}`
  // );
}
