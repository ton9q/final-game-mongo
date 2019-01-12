import $ from 'jquery';

import './index.css';

import ModalDialog from './components/modalDialog/modalDialog';
import Header from './components/header/header';
import Menu from './components/menu/menu';
import Config from './components/config/config';
import Battle from './components/battle/battle';


function addFavicon(src) {
  const link = document.createElement('link');
  link.rel = 'shortcut icon';
  link.href = src;
  $('head').append(link);
}

const starterTemplate = `
<main role="main" class="container">
  <section class="start-page" id="start-page"></section>
  <section class="menu" id="menu"></section>
  <section class="config" id="config"></section>
  <section class="battle" id="battle"></section>

  <div class="starter-template" id="content"></div>
</main>`;

$(document).ready(function() {
  window.$ = $; // for debug

  addFavicon('../assets/icon.ico');

  $('body').append(starterTemplate);
  
  ModalDialog.draw();
  Header.draw();
  Menu.draw();
  Config.draw();
  Battle.draw();

  Header.show();
  // Battle.init();
  // $('.battle').show()
});
