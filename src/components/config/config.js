import $ from 'jquery';

import template from './config.template';
import './config.css';

import Battle from '../battle/battle';

import CONFIG_LIST from '../../utils/loadImages';

class Config {
  static draw() {
    $('.config').append(template);
    $('.config').hide();

    Config.drawContainers();

    // start battle
    $('.config .start-button').click(function() {
      const personName = $('#person-name').val();

      // check name for input
      if (personName.length > 0) {
        $('#person-name').removeClass('warning');

        Battle.init();
        $('.config').hide();
        $('.battle').fadeIn(1000);
      } else {
        $('#person-name').addClass('warning');
      }
    });
  }

  static drawContainers() {
    for (let i = 0; i < CONFIG_LIST.backgrounds.length; i++) {
      Config.createAndAppendTemplateConfigItem('background', i);
      Config.changeCssConfigItem('background', i);
    }

    for (let i = 0; i < CONFIG_LIST.persons.length; i++) {
      Config.createAndAppendTemplateConfigItem('person', i);
      Config.changeCssConfigItem('person', i);
    }

    $('.backgrounds .config-item').click(function() {
      Config.changeCssOnClickConfigItem('background', this);
    });

    $('.persons .config-item').click(function() {
      Config.changeCssOnClickConfigItem('person', this);
    });

    Config.addDefaultPreviewConfigItems();
  }

  static changeCssConfigItem(configItem, index) {
    const sizeImage = 58;

    $(`#${configItem}-${index}`).css({
      'background-image': `url(${CONFIG_LIST[`${configItem}s`][index]})`,
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

  static createAndAppendTemplateConfigItem(configItem, index) {
    const template = `<div class="config-item ${configItem}-${index}" id="${configItem}-${index}"></div>`;
    $(`#${configItem}-wrapper-container`).append(template);
  }

  static changeCssOnClickConfigItem(configItem, thisConfigItem) {
    // change all items this category
    $(`.${configItem}s .config-item`).css({
      border: '1px solid rgba(255, 255, 255, 0.7)',
    });

    // change clicked item
    $(thisConfigItem).css({
      border: '2px solid rgb(255, 255, 255)',
    });

    // change preview item
    $(`.${configItem}-container`).css({
      'background-image': `${$(thisConfigItem).css('background-image')}`,
    });
  }

  static addDefaultPreviewConfigItems() {
    $('.backgrounds .config-item.background-0').click();
    $('.persons .config-item.person-0').click();
  }
}

export default Config;
