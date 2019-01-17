import $ from 'jquery';

import { pause } from '../utils/index';

import CONFIG_LIST from '../utils/loadImages';

class Hero {
  constructor(game, health, damage) {
    this.health = health;
    this.damage = damage;

    this.canvas = document.getElementById('canvas-hero');
    this.ctx = this.canvas.getContext('2d');
    this.game = game;

    this.sprite = new Image();
    this.heroNumber = Number($('#person-container').attr('data-battle'));
    this.delayFrame = 7;

    this.animationType = 'stand';
    this.currentLoopIndex = 0;
    this.frameCount = 0;
  }

  newHero() {
    this.heroNumber = Number($('#person-container').attr('data-battle'));
    this.animationType = 'stand';
    this.currentLoopIndex = 0;
    this.frameCount = 0;
  }

  animate() {
    switch (this.animationType) {
      case 'stand':
        this.standAnimation();
        break;
      case 'attack':
        this.attackAnimation();
        break;
      case 'hurt':
        this.hurtAnimation();
        break;
      case 'die':
        this.dieAnimation();
        break;
      case 'run':
        this.runAnimation();
        break;
      case 'jump':
        this.jumpAnimation();
        break;
      default:
        console.log('nothing animation');
    }
  }

  drawFrame(frameX, frameY, canvasX, canvasY) {
    const scale = 2;
    let width;
    let height;

    if (this.heroNumber === 0) {
      if (this.animationType === 'stand') {
        width = 400;
        height = 504;
        canvasX = 40;
        canvasY = 0;
      } else if (this.animationType === 'attack') {
        width = 903;
        height = 395;
        canvasX = 20;
        canvasY = 30;
      } else if (this.animationType === 'hurt') {
        width = 571;
        height = 482;
        canvasX = 0;
        canvasY = 8;
      } else if (this.animationType === 'die') {
        width = 695;
        height = 537;
        canvasX = 15;
        canvasY = 8;
      } else if (this.animationType === 'run') {
        width = 534;
        height = 565;
        canvasX = 20;
        canvasY = -16;
      } else if (this.animationType === 'jump') {
        width = 533;
        height = 523;
        canvasX = 20;
        canvasY = -7;
      }
    } else if (this.heroNumber === 1) {
      if (this.animationType === 'stand') {
        width = 496;
        height = 520;
        canvasX = 20;
        canvasY = 0;
      } else if (this.animationType === 'attack') {
        width = 643;
        height = 622;
        canvasX = 20;
        canvasY = -15;
      } else if (this.animationType === 'hurt') {
        width = 654;
        height = 503;
        canvasX = 0;
        canvasY = 8;
      } else if (this.animationType === 'die') {
        width = 682;
        height = 552;
        canvasX = -5;
        canvasY = 0;
      } else if (this.animationType === 'run') {
        width = 582;
        height = 587;
        canvasX = 20;
        canvasY = -20;
      } else if (this.animationType === 'jump') {
        width = 620;
        height = 527;
        canvasX = 0;
        canvasY = -5;
      }
    } else if (this.heroNumber === 2) {
      if (this.animationType === 'stand') {
        width = 428;
        height = 380;
        canvasX = 40;
        canvasY = 32;
      } else if (this.animationType === 'attack') {
        width = 540;
        height = 456;
        canvasX = 40;
        canvasY = 27;
      } else if (this.animationType === 'hurt') {
        width = 543;
        height = 413;
        canvasX = 15;
        canvasY = 30;
      } else if (this.animationType === 'die') {
        width = 634;
        height = 464;
        canvasX = 5;
        canvasY = 27;
      } else if (this.animationType === 'run') {
        width = 468;
        height = 428;
        canvasX = 40;
        canvasY = 22;
      } else if (this.animationType === 'jump') {
        width = 480;
        height = 420;
        canvasX = 40;
        canvasY = 22;
      }
    }

    const scaledWidth = width / scale;
    const scaledHeight = height / (scale + 1.6);

    this.ctx.drawImage(
      this.sprite,
      frameX * width,
      frameY * height,
      width,
      height,
      canvasX,
      canvasY,
      scaledWidth,
      scaledHeight
    );
  }

  standAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4];
    this.frameCount += 1;
    this.sprite.src = CONFIG_LIST.sprites.heroes[this.heroNumber].stand;

    if (this.frameCount < this.delayFrame) {
      return;
    }

    this.frameCount = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawFrame(cycleLoop[this.currentLoopIndex], 0, 0, 0);
    this.currentLoopIndex += 1;

    if (this.currentLoopIndex >= cycleLoop.length) {
      this.currentLoopIndex = 0;
    }
  }

  async attack() {
    this.game.monster.health -= this.damage;

    this.animationType = 'run';

    $('#canvas-hero').animate(
      {
        left: 64 + '%',
      },
      1500,
      async () => {
        this.animationType = 'attack';
        await pause(500);

        if (this.game.monster.health <= 0) {
          this.game.monster.animationType = 'die';
        } else {
          this.game.monster.animationType = 'hurt';
        }
      }
    );

    await pause(2000);
    this.animationType = 'run';

    $('#canvas-hero').animate(
      {
        left: 5 + '%',
      },
      1500,
      () => {
        this.animationType = 'stand';
      }
    );

    if (this.game.monster.health <= 0) {
      this.animationType = 'run';

      $('#canvas-hero').animate(
        {
          left: 30 + '%',
        },
        750,
        () => {
          this.animationType = 'jump';
        }
      );
    }
  }

  attackAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4];
    this.frameCount += 1;
    this.sprite.src = CONFIG_LIST.sprites.heroes[this.heroNumber].attack;

    if (this.frameCount < this.delayFrame) {
      return;
    }

    this.frameCount = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawFrame(cycleLoop[this.currentLoopIndex], 0, 0, 0);
    this.currentLoopIndex += 1;

    if (this.currentLoopIndex >= cycleLoop.length) {
      this.currentLoopIndex = 0;
    }
  }

  hurtAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4];
    this.frameCount += 1;
    this.sprite.src = CONFIG_LIST.sprites.heroes[this.heroNumber].hurt;

    if (this.frameCount < this.delayFrame) {
      return;
    }

    this.frameCount = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawFrame(cycleLoop[this.currentLoopIndex], 0, 0, 0);
    this.currentLoopIndex += 1;

    if (this.currentLoopIndex >= cycleLoop.length) {
      this.currentLoopIndex = 0;
      this.animationType = 'stand';
    }
  }

  dieAnimation() {
    const cycleLoop = [0, 1, 2, 3];
    this.frameCount += 1;
    this.sprite.src = CONFIG_LIST.sprites.heroes[this.heroNumber].die;

    if (this.frameCount < this.delayFrame) {
      return;
    }

    this.frameCount = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawFrame(cycleLoop[this.currentLoopIndex], 0, 0, 0);
    this.currentLoopIndex += 1;

    if (this.currentLoopIndex >= cycleLoop.length) {
      this.currentLoopIndex = 0;
      this.animationType = 'nothing';
    }
  }

  runAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4];
    this.frameCount += 1;
    this.sprite.src = CONFIG_LIST.sprites.heroes[this.heroNumber].run;

    if (this.frameCount < this.delayFrame) {
      return;
    }

    this.frameCount = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawFrame(cycleLoop[this.currentLoopIndex], 0, 0, 0);
    this.currentLoopIndex += 1;

    if (this.currentLoopIndex >= cycleLoop.length) {
      this.currentLoopIndex = 0;
    }
  }

  jumpAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4];
    this.frameCount += 1;
    this.sprite.src = CONFIG_LIST.sprites.heroes[this.heroNumber].jump;

    if (this.frameCount < this.delayFrame) {
      return;
    }

    this.frameCount = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawFrame(cycleLoop[this.currentLoopIndex], 0, 0, 0);
    this.currentLoopIndex += 1;

    if (this.currentLoopIndex >= cycleLoop.length) {
      this.currentLoopIndex = 0;
    }
  }
}

export default Hero;
