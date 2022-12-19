import { expect, test } from "vitest";
import { shuffleBackpacks } from ".";

test('calculate final score from part 1', async () => {
    expect(await shuffleBackpacks(1, './src/challenges/day_03/input.txt')).toBe(7826);
});

test('calculate final score from part 2', async () => {
    expect(await shuffleBackpacks(2, './src/challenges/day_03/input.txt')).toBe(2577);
});