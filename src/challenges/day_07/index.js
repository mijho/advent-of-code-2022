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

  cd(dir) {
    if (dir === "/") {
      this.pwd = [];
    } else if (dir === "..") {
      this.pwd.pop();
    } else {
      this.pwd.push(dir);
    }
  }
}

export const findFileToRemove = async (input) => {
  const lr = await processLineByLine(input);
  const tree = new Tree();

  for await (const line of lr) {
    let elements = line.split(" ");
    if (elements[0] === "$") {
      if (elements[1] === "cd") tree.cd(elements[2]);
    } else {
      tree.add(elements);
    }
  }

  let dirs = {};
  const crawl = (dir = "", branch = tree.view) => {
    let size = 0;
    for (let [key, value] of Object.entries(branch)) {
      if (!isNaN(value)) {
        size += value;
      } else {
        size += crawl(`${dir}/${key}`, branch[key]);
      }
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
    .reduce((a, v) => a + v, 0);

  const sizeNeeded = 30000000 - (70000000 - rootSize);
  const fileToDelete = Object.values(dirs)
    .sort((a, b) => a[1] - b[1])
    .find((x) => x >= sizeNeeded);

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
