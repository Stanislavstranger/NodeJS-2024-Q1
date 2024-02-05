import fs from 'fs/promises';
import { resolve } from 'path';
import globalVars from '../globalVars/globalVars.js';

export default async function deleteFile(fileName) {
  if (!fileName) {
    console.error('Error: fileName must be provided');
    return;
  }

  const filePath = resolve(globalVars.currentWorkingDirectory, fileName);

  try {
    await fs.unlink(filePath);
    console.log(`File "${fileName}" successfully deleted in the current directory "${globalVars.currentWorkingDirectory}"`);
  }
  catch (error) {
    console.error(`Error adding file: ${error.message}`);
  }
}