import $ from 'jquery';

import template from './menu.template';
import './menu.css';

import Score from '../../game/score';

class Menu {
  static draw() {
    $('.menu').append(template);
    $('.menu').hide();

    $('.menu__section').hide();

    // new game
    $('.menu__item.new-game').click(() => {
      $('.menu').hide();
      $('.config').fadeIn(1000);
    });

    // score
    $('.menu__item.score').click(() => {
      Score.update();

      $('.menu__container').hide();
      $('.menu__score_section').fadeIn(1000);
    });

    // help
    $('.menu__item.help').click(() => {
      $('.menu__container').hide();
      $('.menu__help_section').fadeIn(1000);
    });

    // close button
    $('.menu .close-button').click(() => {
      $('.menu__section').hide();
      $('.menu__container').fadeIn(1000);
    });
  }
}

export default Menu;
