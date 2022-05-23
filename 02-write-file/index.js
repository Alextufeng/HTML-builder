const fs = require('fs');
const path = require('path');

const { stdout, stdin, exit } = process;

const textFilePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(textFilePath);

stdout.write('Hello! Please, enter your text!\n');

stdin.on('data', data => {

  if (data.toString().trim() === 'exit') {
    exit();
  }

  output.write(data);
});

process.on('exit', () => stdout.write('Bye-bye! See you later!'));
process.on('SIGINT', exit);