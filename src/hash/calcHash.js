import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import globalVars from '../globalVars/globalVars.js';
import printOperationFailed from '../utils/printOperationFailed.js';

export default async function calculateHash(filePath) {
  if (!filePath) {
    console.error('Error: filePath must be provided');
    return;
  }

  try {
    const fullPath = path.resolve(globalVars.currentWorkingDirectory, filePath);
    const fileData = await fs.readFile(fullPath);
    
    const hash = crypto.createHash('sha256');
    hash.update(fileData);
    
    console.log(`Hash for ${filePath}: ${hash.digest('hex')}`);
  } catch (error) {
    printOperationFailed();
  }
}