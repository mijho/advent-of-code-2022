import { expect, test } from "vitest";
import { followMe } from ".";

test("calculate final score from part 1", async () => {
  expect(await followMe(1, "./src/challenges/day_09/test.txt")).toBe(13);
});

test("calculate final score from part 1", async () => {
  expect(await followMe(1, "./src/challenges/day_09/input.txt")).toBe(6037);
});

// test("calculate final score from part 2", async () => {
//   expect(await followMe(2, "./src/challenges/day_09/test_2.txt", 9)).toBe(36);
// });
