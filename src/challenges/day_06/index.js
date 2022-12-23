import process from "process";
import { fileURLToPath } from "url";
import { processLineByLine } from "../../lib/linereader.js";

export const findStartOfPacket = async (part, input) => {
  const lr = await processLineByLine(input);
  let total = part === 1 ? 5 : 15;

  // this is a bit unnecessary for the input but 🤷‍♂️
  for await (let line of lr) {
    line = line.split("");
    let uniqueQuad = false;
    let counter = 0;
    const packetLength = part === 1 ? 4 : 14;
    do {
      let quad = [];
      for (let i = 1; i <= packetLength; i++) {
        quad.push(line[counter + i]);
      }
      if (new Set(quad).size == packetLength) {
        break;
      }
      total++;
      counter++;
    } while (uniqueQuad == false);
  }

  return total;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(
    `The total score if following the guide Part 1: ${await findStartOfPacket(
      1,
      "./input.txt"
    )}`
  );
  console.log(
    `The total score if following the guide Part 2: ${await findStartOfPacket(
      2,
      "./input.txt"
    )}`
  );
}
