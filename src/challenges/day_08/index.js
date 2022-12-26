import process from "process";
import { fileURLToPath } from "url";
import { processLineByLine } from "../../lib/linereader.js";

export const treehouseValidator = async (part, input) => {
  const lr = await processLineByLine(input);
  let total = 0;
  let highScore = 0;
  let rows = [];

  for await (const line of lr) {
    rows.push(line.split(""));
  }

  rows.forEach((row, row_index) => {
    row.forEach((tree, tree_index) => {
      let [left, right, up, down] = [
        { visible: true, score: 0 },
        { visible: true, score: 0 },
        { visible: true, score: 0 },
        { visible: true, score: 0 },
      ];

      for (let i = tree_index - 1; i >= 0; i--) {
        left.score++;
        if (row[i] >= tree) {
          left.visible = false;
          break;
        }
      }

      for (let i = tree_index + 1; i < row.length; i++) {
        right.score++;
        if (row[i] >= tree) {
          right.visible = false;
          break;
        }
      }

      for (let i = row_index - 1; i >= 0; i--) {
        up.score++;
        if (rows[i][tree_index] >= tree) {
          up.visible = false;
          break;
        }
      }

      for (let i = row_index + 1; i < rows.length; i++) {
        down.score++;
        if (rows[i][tree_index] >= tree) {
          down.visible = false;
          break;
        }
      }

      const score = left.score * right.score * up.score * down.score;
      if (+score > +highScore) highScore = +score;
      total += left.visible || right.visible || up.visible || down.visible;
    });
  });
  if (part === 1) {
    return total;
  } else {
    return highScore;
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(
    `The total score if following the guide Part 1: ${await treehouseValidator(
      1,
      "./input.txt"
    )}`
  );
  console.log(
    `The total score if following the guide Part 2: ${await treehouseValidator(
      2,
      "./input.txt"
    )}`
  );
}
