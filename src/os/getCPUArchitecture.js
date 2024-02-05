import os from 'os';

export default function getCPUArchitecture() {
  console.log(`CPU Architecture: ${os.arch()}`);
}