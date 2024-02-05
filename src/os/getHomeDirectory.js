import os from 'os';

export default function getHomeDirectory() {
  console.log(`Home Directory: ${os.homedir()}`);
}