export default function getArguments(args) {
  let currentArg = '';
  const result = [];

  args.forEach(arg => {
    if (arg.startsWith(`"`)) {
      currentArg = arg.slice(1);
    } else if (arg.endsWith('"')) {
      currentArg += ' ' + arg.slice(0, -1);
      result.push(currentArg);
      currentArg = '';
    } else if (currentArg !== '') {
      currentArg += ' ' + arg;
    } else {
      result.push(arg);
    }
  });

  return result;
}
