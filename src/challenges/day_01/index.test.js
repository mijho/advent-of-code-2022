import { expect, test } from "vitest";
import { getChunkiestElf } from ".";

test('calculate final score from part 1', async () => {
    expect(await getChunkiestElf(1, './src/challenges/day_01/input.txt')).toBe(69626);
});

test('calculate final score from part 2', async () => {
    expect(await getChunkiestElf(2, './src/challenges/day_01/input.txt')).toBe(206780);
});