const pause = time =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

const spaceToDashInString = string => string.split(' ').join('-');

export { 
  pause, 
  spaceToDashInString,
};
