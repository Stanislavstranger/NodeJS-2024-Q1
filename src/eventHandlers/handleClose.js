const handleClose = (username) => {
  return () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  };
};

export default handleClose;
