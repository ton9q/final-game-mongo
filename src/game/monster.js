import $ from 'jquery';

import { pause } from '../utils/index';

import CONFIG_LIST from '../utils/loadImages';

class Monster {
  constructor(game, health, damage) {
    if (typeof health  === 'undefined') {
      health = 100;
    }
    if (typeof damage  === 'undefined') {
      damage = 25;
    }

    this.health = health;
    this.damage = damage;

    this.canvas = document.getElementById('canvas-monster');
    this.ctx = this.canvas.getContext('2d');
    this.game = game;

    this.sprite = new Image();
    this.monsterNumber = Math.floor(Math.random() * CONFIG_LIST.sprites.monsters.length);
    this.delayFrame = 5;

    this.animationType = 'stand';
    this.currentLoopIndex = 0;
    this.frameCount = 0;
  }

  newMonster(health, damage) {
    if (typeof health  === 'undefined') {
      health = 100;
    }
    if (typeof damage  === 'undefined') {
      damage = 25;
    }

    this.monsterNumber = Math.floor(Math.random() * CONFIG_LIST.sprites.monsters.length);
    this.animationType = 'stand';
    this.currentLoopIndex = 0;
    this.frameCount = 0;
    this.health = health;
    this.damage = damage;
    
    $('#canvas-monster').css({
      right: '0%'
    });
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
    const scale = 3;
    const width = 900;
    const height = 900;
    const scaledWidth = width / scale;
    const scaledHeight = height / (scale + 1.5);

    this.ctx.drawImage(
      this.sprite,
      frameX * width,
      frameY * height,
      width,
      height,
      canvasX,
      canvasY - 32,
      scaledWidth,
      scaledHeight
    );
  }
  
  standAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    this.frameCount += 1;
    this.sprite.src = CONFIG_LIST.sprites.monsters[this.monsterNumber].stand;

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
    this.game.hero.health -= this.damage;

    this.animationType = 'run';

    $('#canvas-monster').animate(
      {
        right: 58 + '%',
      },
      1500,
      async () => {
        this.animationType = 'attack';
        await pause(500);

        if (this.game.hero.health <= 0) {
          this.game.hero.animationType = 'die';
        } else {
          this.game.hero.animationType = 'hurt';
        }
      }
    );

    await pause(2000);
    this.animationType = 'run';

    $('#canvas-monster').animate(
      {
        right: 0 + '%',
      },
      1500,
      () => {
        this.animationType = 'stand';
      }
    );

    if (this.game.hero.health <= 0) {
      this.animationType = 'run';

      $('#canvas-monster ').animate(
        {
          right: 30 + '%',
        },
        750,
        () => {
          this.animationType = 'jump';
        }
      );
    }
  }

  attackAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    this.frameCount += 1;
    this.sprite.src = CONFIG_LIST.sprites.monsters[this.monsterNumber].attack;

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
    const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    this.frameCount += 1;
    this.sprite.src = CONFIG_LIST.sprites.monsters[this.monsterNumber].hurt;

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
    const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    this.frameCount += 1;
    this.sprite.src = CONFIG_LIST.sprites.monsters[this.monsterNumber].die;

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
    const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    this.frameCount += 1;
    this.sprite.src = CONFIG_LIST.sprites.monsters[this.monsterNumber].run;

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
    const cycleLoop = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1];
    this.frameCount += 1;
    this.sprite.src = CONFIG_LIST.sprites.monsters[this.monsterNumber].jump;

    if (this.frameCount < this.delayFrame - 2) {
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

export default Monster;
