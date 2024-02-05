import fs from 'fs';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';

export default function moveFile(source, destinationDirectory) {
  const sourceFileName = path.basename(source);
  const destination = path.join(destinationDirectory, sourceFileName);

  const readStream = createReadStream(source);
  const writeStream = createWriteStream(destination);

  readStream.pipe(writeStream);

  readStream.on('error', (err) => {
    console.log('Error during moving file:', err);
  });

  writeStream.on('error', (err) => {
    console.log('Error during writing file:', err);
  });

  writeStream.on('close', () => {
    fs.unlink(source, (unlinkError) => {
      if (unlinkError) {
        console.log('Error during deleting original file:', unlinkError);
      } else {
        console.log(`File moved successfully to ${destination}`);
      }
    });
  });
}
