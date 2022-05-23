const { readdir, stat } = require('fs/promises');
const path = require('path');
const { stdout } = process;

const pathToFolder = path.join(__dirname, 'secret-folder');

async function readFolder(directoryPath) {
  
  try {
    const files = await readdir(directoryPath, { withFileTypes: true });
    for (const item of files) {

      if (item.isFile()) {
        const stats = await stat(path.join(directoryPath, item.name));
        stdout.write(`\n${path.parse(item.name).name} ->- ${path.extname(item.name).slice(1)} ->- ${stats.size/1024} Kb`);
      }

    }
  } catch (error) {
    stdout.write(`Error: ${error.message}\n`);
  }

}

readFolder(pathToFolder);