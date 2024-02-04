import os from 'os';

export let currentWorkingDirectory = os.homedir();

export function printCurrentDirectory() {
  console.log(`You are currently in ${currentWorkingDirectory}`);
}