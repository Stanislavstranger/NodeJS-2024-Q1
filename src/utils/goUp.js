import path from 'path';
import fs from 'fs';
import { printCurrentDirectory } from './printCurrentDirectory.js';
import printOperationFailed from './printOperationFailed.js';
import globalVars from '../globalVars/globalVars.js';

export default function goUp() {
  const parent = path.resolve(globalVars.currentWorkingDirectory, '..');
  if (parent !== globalVars.currentWorkingDirectory && fs.existsSync(parent) && fs.statSync(parent).isDirectory()) {
    globalVars.currentWorkingDirectory = `${parent}`;
    printCurrentDirectory(globalVars.currentWorkingDirectory);
  } else {
    printOperationFailed();
  }
}