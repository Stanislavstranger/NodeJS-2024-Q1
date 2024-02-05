import fs from 'fs/promises';
import path from 'path';

export default async function renameFile(oldPath, newFileName) {
  try {
    const newPath = path.join(path.dirname(oldPath), newFileName);
    await fs.rename(oldPath, newPath);
    console.log(`File renamed successfully to ${newPath}`);
  } catch (error) {
    console.error(`Error renaming file: ${error.message}`);
  }
}