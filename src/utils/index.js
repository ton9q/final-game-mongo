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

  this.checkMusicPlay = true;

  this.play = function() {
    this.sound.play();
    $('.sound-switcher .on').toggleClass('none');
    $('.sound-switcher .off').toggleClass('none');
    this.checkMusicPlay = true;
  };

  this.stop = function() {
    this.sound.pause();
    $('.sound-switcher .on').toggleClass('none');
    $('.sound-switcher .off').toggleClass('none');
    this.checkMusicPlay = false;
  };

  this.templateButton = `
  <div class="sound-switcher">
    <i class="fas fa-volume-up fa-2x on"></i>
    <i class="fas fa-volume-off fa-2x off none"></i>
  </div>
  `;
}

export { pause, spaceToDashInString, addFavicon, sound };
