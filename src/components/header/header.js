import $ from 'jquery';

import template from './header.template';
import './header.css';

class Header {
  static draw() {
    $('.start-page').append(template);
    $('.start-page').hide();

    // show menu on click
    $('.start-page').click(function() {
      $('.start-page').hide();
      $('.menu').fadeIn(1000);
    });
  }

  static show() {
    $('.start-page').show();
  }
}

export default Header;
