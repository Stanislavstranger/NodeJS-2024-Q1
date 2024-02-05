import path from 'path';
import fs from 'fs/promises';
import printCurrentDirectory from './printCurrentDirectory.js';
import printOperationFailed from './printOperationFailed.js';
import globalVars from '../globalVars/globalVars.js';

export default async function changeDirectory(directory) {
  if (!directory) {
    console.error('Error: directory must be provided');
    return;
  }

  const newPath = path.resolve(globalVars.currentWorkingDirectory, directory);

  try {
    const stats = await fs.stat(newPath);

    if (stats.isDirectory()) {
      globalVars.currentWorkingDirectory = newPath;
      printCurrentDirectory(globalVars.currentWorkingDirectory);
    } else {
      printOperationFailed();
    }
  } catch (error) {
    printOperationFailed();
  }
}
