import { promises as fs } from 'fs';
import path from 'path';
import { currentWorkingDirectory, printCurrentDirectory } from './printCurrentDirectory.js';

export default async function listDirectoryContents() {
  await printCurrentDirectory();
  try {
    const contents = await fs.readdir(currentWorkingDirectory);
    const statsPromises = contents.map((item) => fs.stat(path.join(currentWorkingDirectory, item)));
    const stats = await Promise.all(statsPromises);

    const sortedContents = contents.map((item, index) => ({
      name: item,
      isDirectory: stats[index].isDirectory(),
    })).sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) {
        return -1;
      } else if (!a.isDirectory && b.isDirectory) {
        return 1;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    const columnWidths = {
      index: 5,
      name: 4,
      type: 4
    };

    sortedContents.forEach((item, index) => {
      const itemType = item.isDirectory ? 'Folder' : 'File';

      columnWidths.index = Math.max(columnWidths.index, `${index + 1}`.length);
      columnWidths.name = Math.max(columnWidths.name, item.name.length);
      columnWidths.type = Math.max(columnWidths.type, itemType.length);
    });

    console.log('┌' + '─'
      .repeat(columnWidths.index + 2) + '┬' + '─'
        .repeat(columnWidths.name + 2) + '┬' + '─'
          .repeat(columnWidths.type + 2) + '┐');
    console.log(`│ Index${' '.repeat(columnWidths.index - 4)}│ Name${' '
      .repeat(columnWidths.name - 3)}│ Type${' '
        .repeat(columnWidths.type - 3)}│`);
    console.log('├' + '─'
      .repeat(columnWidths.index + 2) + '┼' + '─'
        .repeat(columnWidths.name + 2) + '┼' + '─'
          .repeat(columnWidths.type + 2) + '┤');

    sortedContents.forEach((item, index) => {
      const itemType = item.isDirectory ? 'Folder' : 'File';
      console.log(`│ ${index}${' '
        .repeat(columnWidths.index + 1 - `${index}`.length)}│ ${item.name}${' '
          .repeat(columnWidths.name + 1 - item.name.length)}│ ${itemType}${' '
            .repeat(columnWidths.type + 1 - itemType.length)}│`);
    });

    console.log('└' + '─'
      .repeat(columnWidths.index + 2) + '┴' + '─'
        .repeat(columnWidths.name + 2) + '┴' + '─'
          .repeat(columnWidths.type + 2) + '┘');
  } catch (error) {
    console.error('An error occurred while listing directory contents:', error);
  }
}