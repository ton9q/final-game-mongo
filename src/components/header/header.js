import $ from 'jquery';

import template from './header.template';
import './header.css';

import menu from '../menu/menu';

class Header {
  static draw() {
    $('.start-page').append(template);

    $('.start-page').click(function() {
      $('.start-page').fadeOut(1500, menu.draw);
    });
  }
}

export default Header;
