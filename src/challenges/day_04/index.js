import { processLineByLine } from '../../lib/linereader.js';
import { fileURLToPath } from 'url';
import process from 'process';

export const findConflictingTasks = async (part, input) => {
    const lr = await processLineByLine(input);
    let total = 0

    for await (const line of lr) {
        const taskList = line.match(/(\d+)/g);
        const lineInt = taskList.map((n) => parseInt(n));
        const [ leMin, leMax, reMin, reMax ] = lineInt;

        if ((leMin <= reMin && leMax >= reMax) || (reMin <= leMin && reMax >= leMax)) {
            total++;
        } else if (part === 2) {
            if (leMin >= reMin && leMin <= reMax) {
                total++
            } else if (leMax >= reMin && leMax <= reMax) {
                total++
            } else if (reMin >= leMin && reMin <= leMax) {
                total++
            } else if (reMax >= leMin && reMax <= leMax) {
                total++
            }
        }
    }
    return total;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    console.log(`The total score if following the guide Part 1: ${await findConflictingTasks(1, './input.txt')}`);
    console.log(`The total score if following the guide Part 1: ${await findConflictingTasks(2, './input.txt')}`);
};
