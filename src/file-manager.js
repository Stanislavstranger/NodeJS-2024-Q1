import readline from 'readline';
import globalVars from './globalVars/globalVars.js';
import printCurrentDirectory from './utils/printCurrentDirectory.js';
import handleLine from './eventHandlers/handleLine.js';
import handleClose from './eventHandlers/handleClose.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const username = process.argv
  .slice(process.argv.length - 1)[0]
  .split('--username=')[1] || 'anonym';

console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory(globalVars.currentWorkingDirectory);

rl.on('close', handleClose(username));

rl.on('line', handleLine);