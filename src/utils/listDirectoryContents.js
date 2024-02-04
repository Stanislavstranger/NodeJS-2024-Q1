import fs from 'fs';
import path from 'path';
import { currentWorkingDirectory, printCurrentDirectory } from './printCurrentDirectory.js';

export default function listDirectoryContents() {
  printCurrentDirectory();
  const contents = fs.readdirSync(currentWorkingDirectory);
  contents.sort((a, b) => {
    const isDirA = fs.statSync(path.join(currentWorkingDirectory, a)).isDirectory();
    const isDirB = fs.statSync(path.join(currentWorkingDirectory, b)).isDirectory();

    if (isDirA && !isDirB) {
      return -1;
    } else if (!isDirA && isDirB) {
      return 1;
    } else {
      return a.localeCompare(b);
    }
  });

  const columnWidths = {
    index: 5,
    name: 4,
    type: 4
  };

  contents.forEach((item, index) => {
    const itemType = fs
      .statSync(path.join(currentWorkingDirectory, item))
      .isDirectory() ? 'Folder' : 'File';

    columnWidths.index = Math.max(columnWidths.index, `${index + 1}`.length);
    columnWidths.name = Math.max(columnWidths.name, item.length);
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

  contents.forEach((item, index) => {
    const itemType = fs
      .statSync(path.join(currentWorkingDirectory, item))
      .isDirectory() ? 'Folder' : 'File';
    console.log(`│ ${index}${' '
      .repeat(columnWidths.index + 1 - `${index}`.length)}│ ${item}${' '
        .repeat(columnWidths.name + 1 - item.length)}│ ${itemType}${' '
          .repeat(columnWidths.type + 1 - itemType.length)}│`);
  });

  console.log('└' + '─'
    .repeat(columnWidths.index + 2) + '┴' + '─'
      .repeat(columnWidths.name + 2) + '┴' + '─'
        .repeat(columnWidths.type + 2) + '┘');
}