import process from "process";
import { fileURLToPath } from "url";
import { processLineByLine } from "../../lib/linereader.js";

class Tree {
  constructor() {
    this.view = {};
    this.pwd = [];
  }

  add(item) {
    let curDir = this.pwd.reduce((curDir, d) => curDir[d], this.view);
    curDir[item[1]] = !isNaN(item[0]) ? parseInt(item[0]) : {};
  }

  cd(name) {
    if (name === "/") this.pwd = [];
    else if (name === "..") this.pwd.pop();
    else this.pwd.push(name);
  }
}

export const findFileToRemove = async (input) => {
  const lr = await processLineByLine(input);
  const tree = new Tree();

  // Build tree
  for await (const line of lr) {
    let ins = line.split(" ");
    if (ins[0] === "$") {
      if (ins[1] === "cd") tree.cd(ins[2]);
    } else {
      tree.add(ins);
    }
  }

  let dirs = {};
  // Get sizes of directories
  const crawl = (dir = "", branch = tree.view) => {
    let size = 0;
    for (let [k, v] of Object.entries(branch)) {
      if (!isNaN(v)) size += v;
      else size += crawl(`${dir}/${k}`, branch[k]);
    }
    dirs[dir ? dir : "/"] = size;
    return size;
  };

  crawl();

  dirs = Object.fromEntries(Object.entries(dirs).sort((a, b) => a[1] - b[1]));
  const rootSize = Object.entries(dirs).filter((x) => x.includes("/"))[0][1];
  const totalDirs = Object.values(dirs).length;
  const smallDirSum = Object.values(dirs)
    .filter((n) => n < 100000)
    .reduce((a, n) => a + n, 0);

  const sizeNeeded = 30000000 - (70000000 - rootSize);
  const fileToDelete = Object.values(dirs)
    .sort((a, b) => a[1] - b[1])
    .find((a) => a >= sizeNeeded);

  return {
    root_size: rootSize,
    total_dirs: totalDirs,
    small_dir_sum: smallDirSum,
    file_to_delete: fileToDelete,
  };
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let result = await findFileToRemove("./input.txt");
  console.log(
    `The total score if following the guide Part 1: ${result.small_dir_sum}`
  );
  console.log(
    `The total score if following the guide Part 2: ${result.file_to_delete}`
  );
}
