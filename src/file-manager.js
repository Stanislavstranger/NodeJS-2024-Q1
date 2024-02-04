import readline from 'readline';
import os from 'os';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentWorkingDirectory = os.homedir();
const username = process.argv
  .slice(process.argv.length - 1)[0]
  .split('--username=')[1] || 'anonym';

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentWorkingDirectory}`);

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});