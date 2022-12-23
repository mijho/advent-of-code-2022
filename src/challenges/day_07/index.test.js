import { expect, test } from "vitest";
import { findFileToRemove } from ".";

test("Test day 07", async () => {
  const result = await findFileToRemove("./src/challenges/day_07/input.txt");
  expect(result.total_dirs).toBe(184);
  expect(result.root_size).toBe(40532950);
  expect(result.small_dir_sum).toBe(1423358);
  expect(result.file_to_delete).toBe(545729);
});
