import $ from 'jquery';

import template from './battle.template';
import './battle.css';

import ModalDialog from '../modalDialog/modalDialog';
import TaskButton from '../taskButton/taskButton';
import Task from '../task/task';

import monsterNames from '../../data/monsterNames';
import nameGenerate from '../../person/generateName';

import mathTask from '../../tasks/mathTask';

class Battle {
  static draw() {
    $('.battle').append(template);
    $('.battle').hide();

    TaskButton.draw('Math Task');
    TaskButton.draw('Translation');
    TaskButton.draw('Compound Words');

    Task.draw();

    // onclick Math task
    $('.task-button.Math-Task').click(function() {
      $('.modal-body .tasks').hide();
      $('.modal-body .in-task').fadeIn(1000);

      $('.in-task .content-question').empty();

      mathTask.init();
      $('.in-task .content-question').append(mathTask.templateQuestion());
    });

    // onclick answer button
    $('.answer-button').click(function() {
      const result = mathTask.checkResult(Number($('input#answer').val()));

      Task.clearInputAnswer();
      // console.log(result);

      $('.modal-body .in-task').hide();
      $('.modal-body .tasks').fadeIn(1000);
      ModalDialog.close();

      if (result) {
        console.log('damage opponent ANIMATION');
        Battle.changeHp('monster-hp', 100);
      } else {
        console.log('damage yourself ANIMATION');
        Battle.changeHp('hero-hp', 100);
      }

      Battle.checkDeath();
    });

    // onclick end button
    $('.end-button').click(function() {
      console.log(
        'End game and SAVE RESULTS to score may be 2 parametrs: series and almost result'
      );

      $('.battle').hide();
      $('.menu').fadeIn(1000);

      Battle.clearInputName();
      Battle.hp100('hero-hp');
      Battle.hp100('monster-hp');

      $('.modal-body .tasks').fadeIn(1000);
      $('.modal-body .in-task').hide();
      $('.modal-body .end-game').hide();

      ModalDialog.close();
    });

    // onclick next button - new monster
    $('.next-button').click(function() {
      console.log('Generate NEW MONSTER');

      ModalDialog.close();
      Battle.hp100('monster-hp');
      $('#monster-name').text(nameGenerate(monsterNames));
    });
  }

  static init() {
    // change background
    $('.battle .wrapper').css({
      'background-image': `${$('.background-container').css('background-image')}`,
    });

    // change controll panel (names)
    $('#hero-name').text(`${$('#person-name').val()}`);
    $('#monster-name').text(nameGenerate(monsterNames));
    console.log('GENERATE MOSTER BODY');
    $('#text-center').text('vs');

    $('.battle .button-choice-spell').click(function() {
      ModalDialog.open();
    });
  }

  static changeHp(classForChange, changeValueInPersents) {
    if (typeof changeValueInPersents === 'undefined') {
      changeValueInPersents = 25;
    }

    const collors = {
      0: 'rgb(0,0,0)',
      25: 'rgb(255, 0, 0)',
      50: 'rgb(255, 136, 0)',
      75: 'rgb(175, 175, 175)',
      100: 'rgba(255, 255, 255, 0.5)',
    };

    const currentHpInPersents = Math.round(
      parseInt($(`.battle__panel .${classForChange}`).css('width')) / 2.5
    );

    $(`.battle__panel .${classForChange}`).css({
      width: `${currentHpInPersents - changeValueInPersents}%`,
      'background-color': `${collors[currentHpInPersents - changeValueInPersents]}`,
    });
  }

  static hp100(classForChange) {
    const color = 'rgba(255, 255, 255, 0.5)';
    $(`.battle__panel .${classForChange}`).css({
      width: '100%',
      'background-color': `${color}`,
    });
  }

  static checkDeath() {
    let death = false;

    if (parseInt($('.battle__panel .hero-hp').css('width')) === 0) {
      death = true;
      $('.modal-body .end-game .next-button').hide();
    } else if (parseInt($('.battle__panel .monster-hp').css('width')) === 0) {
      death = true;
      $('.modal-body .end-game .next-button').show();
    }

    if (death) {
      ModalDialog.open();
      $('.modal-body .tasks').hide();
      $('.modal-body .in-task').hide();
      $('.modal-body .end-game').fadeIn(1000);
    }
  }

  static clearInputName() {
    $('input#person-name').val('');
  }
}

export default Battle;
