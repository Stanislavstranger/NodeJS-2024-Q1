import readline from 'readline';
import { printCurrentDirectory } from './utils/printCurrentDirectory.js';
import listDirectoryContents from './utils/listDirectoryContents.js';
import goUp from './utils/goUp.js';
import globalVars from './globalVars/globalVars.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const username = process.argv
  .slice(process.argv.length - 1)[0]
  .split('--username=')[1] || 'anonym';

console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory(globalVars.currentWorkingDirectory);

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

rl.on('line', (input) => {
  const args = input.trim().split(' ');

  switch (args[0]) {
    case 'nwd':
      printCurrentDirectory(globalVars.currentWorkingDirectory);
      break;
    case 'up':
      goUp();
      break;
    case 'ls':
      listDirectoryContents();
      break;
    default:
      printInvalidInput();
  }
});