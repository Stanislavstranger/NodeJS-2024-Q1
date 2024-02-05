import path from 'path';
import fs from 'fs';
import { printCurrentDirectory } from './printCurrentDirectory.js';
import printOperationFailed from './printOperationFailed.js';
import globalVars from '../globalVars/globalVars.js';

export default async function goUp() {
  const parent = path.resolve(globalVars.currentWorkingDirectory, '..');

  try {
    await fs.promises.access(parent, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    const stats = await fs.promises.stat(parent);

    if (stats.isDirectory()) {
      globalVars.currentWorkingDirectory = parent;
      printCurrentDirectory(globalVars.currentWorkingDirectory);
    } else {
      printOperationFailed();
    }
  } catch (error) {
    printOperationFailed();
  }
}