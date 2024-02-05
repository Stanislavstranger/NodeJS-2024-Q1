import globalVars from '../globalVars/globalVars.js';
import printCurrentDirectory from '../utils/printCurrentDirectory.js';
import printInvalidInput from '../utils/printInvalidInput.js';
import listDirectoryContents from '../utils/listDirectoryContents.js';
import goUp from '../utils/goUp.js';
import changeDirectory from '../utils/changeDirectory.js';
import addFile from '../fs/addFile.js';
import deleteFile from '../fs/deleteFile.js';
import copyFile from '../stream/copyFile.js';
import moveFile from '../stream/moveFile.js';
import catFile from '../stream/catFile.js';
import renameFile from '../fs/renameFile.js';
import getArguments from '../utils/getArguments.js';
import getEOL from '../os/getEOL.js';
import getCPUsInfo from '../os/getCPUsInfo.js';
import getHomeDirectory from '../os/getHomeDirectory.js';
import getCurrentUserName from '../os/getCurrentUserName.js';
import getCPUArchitecture from '../os/getCPUArchitecture.js';
import calculateHash from '../hash/calcHash.js';
import compressFile from '../zip/compressFile.js';
import decompressFile from '../zip/decompressFile.js';

const handleLine = (input) => {
  const args = getArguments(input.trim().split(' '));

  switch (args[0]) {
    case 'nwd':
      printCurrentDirectory(globalVars.currentWorkingDirectory);
      break;
    case 'up':
      goUp();
      break;
    case 'cd':
      changeDirectory(args[1]);
      break;
    case 'ls':
      listDirectoryContents();
      break;
    case 'add':
      addFile(args.slice(1).join(' '));
      break;
    case 'rn':
      renameFile(args[1], args[2]);
      break;
    case 'cp':
      copyFile(args[1], args[2]);
      break;
    case 'mv':
      moveFile(args[1], args[2]);
      break;
    case 'cat':
      catFile(args.slice(1).join(' '));
      break;
    case 'rm':
      deleteFile(args.slice(1).join(' '));
      break;
    case 'os':
      switch (args[1]) {
        case '--EOL':
          getEOL();
          break;
        case '--cpus':
          getCPUsInfo();
          break;
        case '--homedir':
          getHomeDirectory();
          break;
        case '--username':
          getCurrentUserName();
          break;
        case '--architecture':
          getCPUArchitecture();
          break;
        default:
          printInvalidInput();
      }
      break;
    case 'hash':
      calculateHash(args[1]);
      break;
    case 'compress':
      compressFile(args[1], args[2]);
      break;
    case 'decompress':
      decompressFile(args[1], args[2]);
      break;
    default:
      printInvalidInput();
  }
};

export default handleLine;