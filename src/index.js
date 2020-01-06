import $ from 'jquery';

import './index.css';

import ModalDialog from './components/modalDialog/modalDialog';
import Header from './components/header/header';
import Menu from './components/menu/menu';
import Config from './components/config/config';
import Battle from './components/battle/battle';

import { addFavicon, sound as Sound } from './utils/index';

import icon from '../assets/icon.ico';

const starterTemplate = `
<main role="main" class="container">
  <section class="start-page" id="start-page"></section>
  <section class="menu" id="menu"></section>
  <section class="config" id="config"></section>
  <section class="battle" id="battle"></section>

  <div class="starter-template" id="content"></div>
</main>`;

$(document).ready(() => {
  window.$ = $; // for debug

  addFavicon(icon);

  $('body').append(starterTemplate);

  const sound = new Sound('./sounds/default.mp3');
  $('body').append(sound.templateButton);

  $('.sound-switcher').click(() => {
    if (sound.checkMusicPlay) {
      sound.stop();
    } else {
      sound.play();
    }
  });

  ModalDialog.draw();
  Header.draw();
  Menu.draw();
  Config.draw();
  Battle.draw();

  Header.show();
});
