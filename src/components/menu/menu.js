import $ from 'jquery';

import template from './menu.template';
import './menu.css';

class Menu {
  static draw() {

    $('.menu').append(template);
    $('.menu').hide();
    
    $('.menu__section').hide();

    // new game
    $('.menu__item.new-game').click(function() {
      $('.menu').hide();
      $('.config').fadeIn(1000);
    });

    // score
    $('.menu__item.score').click(function() {
      $('.menu__container').hide();
      $('.menu__score_section').fadeIn(1000);
    });

    // help
    $('.menu__item.help').click(function() {
      $('.menu__container').hide();
      $('.menu__help_section').fadeIn(1000);
    });

    // close button
    $('.menu .close-button').click(function() {
      $('.menu__section').hide();
      $('.menu__container').fadeIn(1000);
    });
  }
}

export default Menu;
