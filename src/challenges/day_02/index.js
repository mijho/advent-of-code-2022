import { processLineByLine } from "../../lib/linereader.js";
import { fileURLToPath } from "url";
import process from "process";

/*
    -- Part 1 --
    Rock     - A/X - 1
    Paper    - B/Y - 2
    Scissors - C/Z - 3
    win  = 6
    draw = 3
    loss = 0

    -- Part 2 --
    Rock     - A - 1
    Paper    - B - 2
    Scissors - C - 3
    win  = Z - 6
    draw = Y - 3
    loss = X - 0    
*/

export const calulateFinalScore = async (part, input) => {
  const lr = await processLineByLine(input);
  let score = 0;
  // I don't really like the nested switch statements :(
  for await (const line of lr) {
    const round = line.split(" ");
    switch (round[0]) {
      case "A": // rock
        switch (round[1]) {
          case "X": // rock || loss
            // draw (3) + X (1) || loss (0) + scissors (3)
            score += part == 1 ? 4 : 3;
            break;
          case "Y": // paper || draw
            // win (6) + Y (2) || draw (3) + rock (1)
            score += part == 1 ? 8 : 4;
            break;
          case "Z": // scissors || win
            // loss (0) + Z (3) || win (6) + paper (2)
            score += part == 1 ? 3 : 8;
            break;
        }
        break;
      case "B": // paper
        switch (round[1]) {
          case "X": // rock || loss
            // loss (0) + X (1) || loss (0) + rock (1)
            score += part == 1 ? 1 : 1;
            break;
          case "Y": // paper || draw
            // draw (3) + Y (2) || draw (3) + paper (2)
            score += part == 1 ? 5 : 5;
            break;
          case "Z": // scissors || win
            // win (6) + Z (3) || win (6) + scissors (3)
            score += part == 1 ? 9 : 9;
            break;
        }
        break;
      case "C": // scissors
        switch (round[1]) {
          case "X": // rock || loss
            // win (6) + X (1) || loss (0) + paper (2)
            score += part == 1 ? 7 : 2;
            break;
          case "Y": // paper || draw
            // loss (0) + Y (2) || draw (3) + scissors (3)
            score += part == 1 ? 2 : 6;
            break;
          case "Z": // scissors || win
            // draw (3) + Z (3) || win (6) + rock (1)
            score += part == 1 ? 6 : 7;
            break;
        }
        break;
    }
  }

  return score;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(
    `The total score if following the guide Part 1: ${await calulateFinalScore(
      1,
      "./input.txt"
    )}`
  );
  console.log(
    `The total score if following the guide Part 2: ${await calulateFinalScore(
      2,
      "./input.txt"
    )}`
  );
}
