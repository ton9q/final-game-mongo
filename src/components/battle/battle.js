import $ from 'jquery';

import template from './battle.template';
import './battle.css';

import ModalDialog from '../modalDialog/modalDialog';
import TaskButton from '../taskButton/taskButton';
import Task from '../task/task';

import monsterNames from '../../data/monsterNames';
import generateName from '../../game/generateName';
import Game from '../../game/game';

import { pause } from '../../utils';

import mathTask from '../../tasks/mathTask';

let run = false;
let game;

const health = 100;
const damage = 25;

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
        game.hero.attack();
        Battle.changeHp('monster-hp', damage);
      } else {
        game.monster.attack();
        Battle.changeHp('hero-hp', damage);
      }

      Battle.checkDeath();
    });

    // onclick end button
    $('.end-button').click(function() {
      if (ModalDialog.getCountNumberMonsters() !== 0) {
        console.log(
          'End game and SAVE RESULTS to score may be 2 parametrs: series and almost result'
        );
      }

      $('.battle').hide();
      $('.menu').fadeIn(1000);

      Battle.clearInputName();
      Battle.changeHpOnFull('hero-hp');
      Battle.changeHpOnFull('monster-hp');

      $('.modal-body .tasks').fadeIn(1000);
      $('.modal-body .in-task').hide();
      $('.modal-body .end-game').hide();

      ModalDialog.close();
    });

    // onclick next button - new monster
    $('.next-button').click(function() {
      game.monster.newMonster();

      $('.modal-body .tasks').fadeIn(1000);
      $('.modal-body .in-task').hide();
      $('.modal-body .end-game').hide();

      ModalDialog.close();
      Battle.changeHpOnFull('monster-hp');
      $('#monster-name').text(generateName(monsterNames));
    });
  }

  static init() {
    if (!run) {
      run = true;
      game = new Game(health, damage);
      game.animate();

      // onclick choice-spell button
      $('.battle .button-choice-spell').click(function() {
        ModalDialog.open();
      });
    }

    // change background
    $('.battle .wrapper').css({
      'background-image': `${$('.background-container').css('background-image')}`,
    });

    // change controll panel (names)
    $('#hero-name').text(`${$('#person-name').val()}`);
    $('#monster-name').text(generateName(monsterNames));

    // generate new characters
    game.hero.newHero();
    game.monster.newMonster();
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

  static changeHpOnFull(classForChange) {
    const color = 'rgba(255, 255, 255, 0.5)';
    $(`.battle__panel .${classForChange}`).css({
      width: '100%',
      'background-color': `${color}`,
    });
  }

  static async checkDeath() {
    let death = false;

    await pause(2000); // pause - because we wait animation finish (hp)

    if (parseInt($('.battle__panel .hero-hp').css('width')) === 0) {
      death = true;
      ModalDialog.zeroCountNumberMonsters();
      $('.modal-body .end-game .next-button').hide();
    } else if (parseInt($('.battle__panel .monster-hp').css('width')) === 0) {
      death = true;
      ModalDialog.addToCountNumberMonsters();
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
