import os from 'os';

export default function getCPUsInfo() {
  const cpus = os.cpus();
  console.log(`Number of CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}: Model - ${cpu.model}, Speed - ${cpu.speed / 1000} GHz`);
  });
}