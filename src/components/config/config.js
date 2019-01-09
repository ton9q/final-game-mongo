import $ from 'jquery';

import template from './config.template';
import './config.css';

import battle from '../battle/battle';

import { CONFIG_LIST } from '../../utils/index';

class Config {
  static draw() {
    $('.config').append(template);

    Config.drawContainers();

    $('.config .start-button').click(function() {
      const personName = $('#person-name').val();
      // background-wrapper-container // person-wrapper-container

      if (personName.length > 0) {
        $('#person-name').removeClass('warning');
        $('.config').fadeOut(1500, battle.draw);
      } else {
        $('#person-name').addClass('warning');
      }
    });
  }

  static drawContainers() {
    // CONFIG_LIST.background.count
    for (let i = 0; i < CONFIG_LIST.background.count; i++) {
      const backgroundElement = `<div class="config-item background-${i}" id="background-${i}"></div>`;
      $('#background-wrapper-container').append(backgroundElement);
    }

    for (let i = 0; i < CONFIG_LIST.person.count; i++) {
      const personElement = `<div class="config-item person-${i}" id="person-${i}"></div>`;
      $('#person-wrapper-container').append(personElement);
    }

    const sizeImage = 58;

    for (let j = 0; j < CONFIG_LIST.background.count; j++) {
      $(`#background-${j}`).css({
        'background-image': `url('../../../assets/background/${j}.jpg')`,
        height: `${sizeImage}px`,
        width: `${sizeImage}px`,
        margin: '5px',
        'border-radius': '15%',
        border: '1px solid rgba(255, 255, 255, 0.7)',
        cursor: 'pointer',
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
      });
    }

    for (let j = 0; j < CONFIG_LIST.person.count; j++) {
      $(`#person-${j}`).css({
        'background-image': `url('../../../assets/person/${j}.png')`,
        height: `${sizeImage}px`,
        width: `${sizeImage}px`,
        margin: '5px',
        'border-radius': '15%',
        border: '1px solid rgba(255, 255, 255, 0.7)',
        cursor: 'pointer',
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
      });
    }

    $('.backgrounds .config-item').click(function() {
      $('.backgrounds .config-item').css({
        border: '1px solid rgba(255, 255, 255, 0.7)',
      });

      $(this).css({
        border: '2px solid rgb(255, 255, 255)',
      });

      $('.background-container').css({
        'background-image': `${$(this).css('background-image')}`,
      });
    });

    $('.persons .config-item').click(function() {
      $('.persons .config-item').css({
        border: '1px solid rgba(255, 255, 255, 0.7)',
      });

      $(this).css({
        border: '2px solid rgb(255, 255, 255)',
      });

      $('.person-container').css({
        'background-image': `${$(this).css('background-image')}`,
      });
    });
  }
}

export default Config;
