import { expect, test } from "vitest";
import { calulateFinalScore } from ".";

test("calculate final score from part 1", async () => {
  expect(await calulateFinalScore(1, "./src/challenges/day_02/input.txt")).toBe(
    9177
  );
});

test("calculate final score from part 2", async () => {
  expect(await calulateFinalScore(2, "./src/challenges/day_02/input.txt")).toBe(
    12111
  );
});
