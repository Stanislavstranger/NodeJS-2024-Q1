import os from 'os';

export default function getCurrentUsername() {
  console.log(`Current Username: ${os.userInfo().username}`);
}