import { processLineByLine } from '../../lib/linereader.js';
import { compareNumbers } from '../../lib/comparenumbers.js';
import { fileURLToPath } from 'url';
import process from 'process';


export const getChunkiestElf = async (part, input) => {
    // read the file line by line
    const lr = await processLineByLine(input);

    let calories = 0
    let caloriesCarried = []
    for await (const line of lr) {
        // if the line is empty push the current calory count to the elves
        // array and reset the calories counter.
        if (line === "") {
            caloriesCarried.push(calories);
            calories = 0;
        // if the line is not empty add the value on the line to the current
        // calory counter value. 
        } else {
            calories += Number(line)
        }
    }

    // sort the array by numeric value and pop the last value off the list
    const caloriesCarriedSorted = caloriesCarried.sort(compareNumbers);

    // Print out the sum of calories for the three elves carrying the most
    const totalCalories = (part === 1) 
        ? caloriesCarriedSorted[caloriesCarriedSorted.length-1] 
        : caloriesCarriedSorted[caloriesCarriedSorted.length-1] +
            caloriesCarriedSorted[caloriesCarriedSorted.length-2] +
            caloriesCarriedSorted[caloriesCarriedSorted.length-3]

    // Print the value of the elf carrying the most calories
    // console.log(`The elf carrying the largest amount was carrying ${caloriesCarriedSorted.pop()} calories`)
    return totalCalories
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    console.log(`The total calories for Part 1: ${await getChunkiestElf(1, './input.txt')}`);
    console.log(`The total calories for Part 1: ${await getChunkiestElf(2, './input.txt')}`);
};
