import $ from 'jquery';

const pause = time =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

const spaceToDashInString = string => string.split(' ').join('-');

const addFavicon = src  => {
  const link = document.createElement('link');
  link.rel = 'shortcut icon';
  link.href = src;
  $('head').append(link);
}

export { 
  pause, 
  spaceToDashInString,
  addFavicon
};
