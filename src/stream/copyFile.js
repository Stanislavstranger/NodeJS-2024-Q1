import path from 'path';
import { createReadStream, createWriteStream } from 'fs';

export default function copyFile(source, destinationDirectory) {
  const sourceFileName = path.basename(source);
  const destination = path.join(destinationDirectory, sourceFileName);

  const readStream = createReadStream(source);
  const writeStream = createWriteStream(destination);

  readStream.pipe(writeStream);

  readStream.on('error', (err) => {
    console.log('Error during copying file:', err);
  });

  writeStream.on('error', (err) => {
    console.log('Error during writing file:', err);
  });

  writeStream.on('close', () => {
    console.log(`File copied successfully to ${destination}`);
  });
}