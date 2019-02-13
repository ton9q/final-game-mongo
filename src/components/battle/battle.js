import $ from 'jquery';

import template from './battle.template';
import './battle.css';

import ModalDialog from '../modalDialog/modalDialog';
import TaskButton from '../taskButton/taskButton';
import Task from '../task/task';

import monsterNames from '../../data/monsterNames';
import generateName from '../../game/generateName';
import Game from '../../game/game';
import Score from '../../game/score';

import { pause } from '../../utils';

import capitalsTask from '../../tasks/capitalsTask/capitalsTask';
import compareNumbersTask from '../../tasks/compareNumbersTask/compareNumbersTask';
import flagsTask from '../../tasks/flagsTask/flagsTask';
import listeningTask from '../../tasks/listeningTask/listeningTask';
import mathTask from '../../tasks/mathTask/mathTask';
import monthsTask from '../../tasks/monthsTask/monthsTask';
import translateTask from '../../tasks/translateTask/translateTask';

let run = false;
let game;
let trueResult;

const health = 100;
const damage = 25;

class Battle {
  static draw() {
    $('.battle').append(template);
    $('.battle').hide();

    Task.draw();
    Battle.addTaskButtons();

    // onclick end button
    $('.end-button').click(function() {
      if (ModalDialog.getCountNumberMonsters() !== 0) {
        Score.addUser($('#hero-name').text(), ModalDialog.getCountNumberMonsters());
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
      ModalDialog.zeroCountNumberMonsters();
    });

    // onclick next button - new monster
    $('.next-button').click(function() {
      game.monster.newMonster();
      game.hero.newHero();

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
      ModalDialog.getCountNumberMonsters();
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

  static onOpenTask() {
    $('.modal-body .tasks').hide();
    $('.modal-body .in-task').fadeIn(1000);

    $('.in-task .content-question').empty();
  }

  static checkResult(answer) {
    let result = false;
    answer = answer.toLowerCase();

    if (Array.isArray(trueResult)) {
      trueResult.forEach(item => {
        item = item.toLowerCase();
        if (answer == item) result = true;
      });
    } else {
      if (answer == trueResult) result = true;
    }

    return result;
  }

  static addTaskButtons() {
    TaskButton.draw('Math');
    TaskButton.draw('Capitals');
    TaskButton.draw('Translation');
    TaskButton.draw('Listening');
    TaskButton.draw('Months');
    TaskButton.draw('Compare numbers');
    TaskButton.draw('Flags');

    // onclick Math task
    $('.task-button.Math').click(function() {
      Battle.onOpenTask();

      mathTask.init();
      $('.in-task .content-question').append(mathTask.templateQuestion());
      trueResult = mathTask.result;
    });

    // onclick Capitals task
    $('.task-button.Capitals').click(function() {
      Battle.onOpenTask();

      capitalsTask.init();
      $('.in-task .content-question').append(capitalsTask.templateQuestion());
      trueResult = capitalsTask.result;
    });

    // onclick Translation task
    $('.task-button.Translation').click(function() {
      Battle.onOpenTask();

      translateTask.init();
      $('.in-task .content-question').append(translateTask.templateQuestion());
      trueResult = translateTask.result;
    });

    // onclick Listening task
    $('.task-button.Listening').click(function() {
      $('.modal-body .tasks').hide();
      $('.modal-body .in-task').fadeIn(1000);

      $('.in-task .content-question').empty();

      $('.in-task .content-question').append(listeningTask.templateQuestion());
      listeningTask.init();
      trueResult = listeningTask.result;
    });

    // onclick Months task
    $('.task-button.Months').click(function() {
      Battle.onOpenTask();

      monthsTask.init();
      $('.in-task .content-question').append(monthsTask.templateQuestion());
      trueResult = monthsTask.result;
    });

    // onclick Compare-numbers task
    $('.task-button.Compare-numbers').click(function() {
      Battle.onOpenTask();

      compareNumbersTask.init();
      $('.in-task .content-question').append(compareNumbersTask.templateQuestion());
      trueResult = compareNumbersTask.result;
    });

    // onclick Flags task
    $('.task-button.Flags').click(function() {
      Battle.onOpenTask();

      flagsTask.init();
      $('.in-task .content-question').append(flagsTask.templateQuestion());
      trueResult = flagsTask.result;
    });

    // onclick answer button
    $('.answer-button').click(function() {
      const result = Battle.checkResult($('input#answer').val());

      Task.clearInputAnswer();

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
  }
}

export default Battle;
