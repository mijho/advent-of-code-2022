import { expect, test } from "vitest";
import { treehouseValidator } from ".";

test('calculate final score from part 1', async () => {
    expect(await treehouseValidator(1, './src/challenges/day_08/input.txt')).toBe(1854);
});

test('calculate final score from part 2', async () => {
    expect(await treehouseValidator(2, './src/challenges/day_08/input.txt')).toBe(527340);
});
