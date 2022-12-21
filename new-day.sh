#!/usr/bin/env bash

DAY="$1"

mkdir -p "src/challenges/day_${DAY}"
touch src/challenges/day_"${DAY}"/{input.txt,index.js,README.md,index.test.js}

cat <<EOF > src/challenges/day_"${DAY}"/index.test.js
import { expect, test } from "vitest";
// import { EXPORTNAME } from ".";

// dummy test to keep vitest happy in the mean time
test('calculate final score from part 1', async () => {
    expect(1).toBe(1);
});

// test('calculate final score from part 1', async () => {
//     expect(await EXPORTNAME(1, './src/challenges/day_${DAY}/input.txt')).toBe(VALUE);
// });

// test('calculate final score from part 2', async () => {
//     expect(await EXPORTNAME(2, './src/challenges/day_${DAY}/input.txt')).toBe(VALUE);
// });
EOF

cat <<'EOF' > src/challenges/day_"${DAY}"/index.js
import process from 'process';
import { fileURLToPath } from 'url';
import { processLineByLine } from '../../lib/linereader.js';

export const FUNCNAME = async (part, input) => {
    const lr = await processLineByLine(input);
    let total = 0;

    return total;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    console.log(`The total score if following the guide Part 1: ${await FUNCNAME(1, './input.txt')}`);
    console.log(`The total score if following the guide Part 2: ${await FUNCNAME(2, './input.txt')}`);
}
EOF