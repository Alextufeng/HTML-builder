const fsPromises = require('fs/promises');
const path = require('path');

const pathFile = path.join(__dirname, 'project-dist', 'bundle.css');
const pathToFolder = path.join(__dirname, 'styles');

let arrStyles = [];

(async () => {
  const filesArray = await fsPromises.readdir(pathToFolder, { withFileTypes: true });

  for (let item of filesArray) {
    const pathThisFile = path.join(pathToFolder, item.name);
    const fileType = path.extname(pathThisFile);

    if (fileType === '.css') {

      const cssStyles = await fsPromises.readFile(pathThisFile, 'utf8');
      
      arrStyles.push(`${cssStyles}\n`);
    }
  }

  await fsPromises.writeFile(pathFile, arrStyles);
})();