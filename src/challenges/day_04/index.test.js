import { expect, test } from "vitest";
import { findConflictingTasks } from ".";

test('calculate final score from part 1', async () => {
    expect(await findConflictingTasks(1, './src/challenges/day_04/input.txt')).toBe(560);
});

test('calculate final score from part 2', async () => {
    expect(await findConflictingTasks(2, './src/challenges/day_04/input.txt')).toBe(839);
});