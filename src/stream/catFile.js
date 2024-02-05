import { createReadStream } from 'fs';

export default async function catFile(filePath) {
  try {
    const readStream = createReadStream(filePath, { encoding: 'utf-8' });

    readStream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });

    await new Promise((resolve, reject) => {
      readStream.on('error', reject);
      readStream.on('end', resolve);
    });

    console.log('\nFile read successfully.');
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}