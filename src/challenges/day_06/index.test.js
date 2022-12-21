import { expect, test } from "vitest";
import { findStartOfPacket } from ".";

test("calculate final score from part 1", async () => {
  expect(await findStartOfPacket(1, "./src/challenges/day_06/input.txt")).toBe(
    1134
  );
});

test("calculate final score from part 2", async () => {
  expect(await findStartOfPacket(2, "./src/challenges/day_06/input.txt")).toBe(
    2263
  );
});
