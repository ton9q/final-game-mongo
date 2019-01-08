import $ from 'jquery';

import template from './menu.template';
import './menu.css';

import config from '../config/config';

class Menu {
  static draw() {
    $('.menu').append(template);

    $('.menu__section').hide();

    $('.menu__item.new-game').click(function() {
      $('.menu').fadeOut(150, config.draw);
    });

    $('.menu__item.score').click(function() {
      $('.menu__container').hide();
      $('.menu__score_section').show();
    });

    $('.menu__item.help').click(function() {
      $('.menu__container').hide();
      $('.menu__help_section').show();
    });

    $('.menu .close-button').click(function() {
      $('.menu__section').hide();
      $('.menu__container').show();
    });
  }
}

export default Menu;
