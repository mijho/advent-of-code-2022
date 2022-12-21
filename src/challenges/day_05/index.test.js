import { expect, test } from "vitest";
import { cargoLoader } from ".";

test("calculate final score from part 1", async () => {
  expect(await cargoLoader(1, "./src/challenges/day_05/input.txt")).toBe(
    "RNZLFZSJH"
  );
});

test("calculate final score from part 2", async () => {
  expect(await cargoLoader(2, "./src/challenges/day_05/input.txt")).toBe(
    "CNSFCGJSM"
  );
});
