import * as fs from 'fs';
import * as readline from 'readline';

export async function processLineByLine(file) {
    const fileStream = fs.createReadStream(file);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    return rl
  }