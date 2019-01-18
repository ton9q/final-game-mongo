import $ from 'jquery';

const pause = time =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

const spaceToDashInString = string => string.split(' ').join('-');

const addFavicon = src => {
  const link = document.createElement('link');
  link.rel = 'shortcut icon';
  link.href = src;
  $('head').append(link);
};

function sound(src) {
  this.sound = document.createElement('audio');
  this.sound.src = src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.setAttribute('controls', 'none');
  this.sound.setAttribute('autostart', 'true');
  this.sound.setAttribute('autoplay', 'true');  
  this.sound.style.display = 'none';

  document.body.appendChild(this.sound);
  
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
}

export { 
  pause, 
  spaceToDashInString, 
  addFavicon,
  sound 
};
