import fs from 'fs/promises';
import path from 'path';
import globalVars from '../globalVars/globalVars.js';

export default async function addFile(fileName) {
  if (!fileName) {
    console.error('Error: fileName must be provided');
    return;
  }

  const filePath = path.join(globalVars.currentWorkingDirectory, fileName);

  try {
    await fs.writeFile(filePath, '');
    console.log(`File "${fileName}" successfully created in the current directory 
    "${globalVars.currentWorkingDirectory}"`);
  } catch (error) {
    console.error(`Error adding file: ${error.message}`);
  }
}