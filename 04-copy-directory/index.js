const { readdir, copyFile, rm, mkdir } = require('fs/promises');
const path = require('path');
const { stdout } = process;

const originPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

async function copyDir(source, target) {
  try {

    const files = await readdir(source, { withFileTypes: true });
    for (const item of files) {
      
      if (item.isFile()) {
        await copyFile(path.join(source, item.name), path.join(target, item.name));
      } else if (item.isDirectory()) {
        await mkdir(path.join(target, item.name));
        await copyDir(path.join(source, item.name), path.join(target, item.name));
      }
    
    }
  } catch (err) {
    stdout.write(`\nError: ${err.message}\n`);
  }
}

(async function () {
  await rm(copyPath, { recursive: true, force: true });
  await mkdir(copyPath, { recursive: true });
  await copyDir(originPath, copyPath);
})();