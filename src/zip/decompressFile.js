import fs from 'fs';
import { createBrotliDecompress } from 'zlib';
import path from 'path';
import globalVars from '../globalVars/globalVars.js';

export default async function decompressFile(sourcePath, destinationPath) {
  if (!sourcePath || !destinationPath) {
    console.error('Error: source path and destination path must be provided');
    return;
  }

  try {
    const fullPath = path.resolve(globalVars.currentWorkingDirectory, sourcePath);
    const destinationFullPath = path.resolve(globalVars.currentWorkingDirectory, destinationPath);

    const sourceStream = fs.createReadStream(fullPath);
    const destinationStream = fs.createWriteStream(destinationFullPath);
    const decompressStream = createBrotliDecompress();

    sourceStream.pipe(decompressStream).pipe(destinationStream);
    console.log(`File ${sourcePath} decompressed successfully to ${destinationPath}`);
  } catch (error) {
    console.error(`Error during decompression: ${error.message}`);
  }
}
