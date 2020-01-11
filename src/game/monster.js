import $ from 'jquery';

import { pause } from '../utils/index';
import CONFIG_LIST from '../utils/loadImages';
import resizeCanvas from '../utils/resizeCanvas';

import { DEFAULT_HEALTH, DEFAULT_DAMAGE } from '../constants/defaultEntityData';

class Monster {
  constructor(game, health, damage) {
    this.health = health || DEFAULT_HEALTH;
    this.damage = damage || DEFAULT_DAMAGE;

    this.canvas = document.getElementById('canvas-monster');
    this.ctx = this.canvas.getContext('2d');
    resizeCanvas(this.canvas, 4);

    this.game = game;

    this.sprite = new Image();
    this.monsterNumber = Math.floor(Math.random() * CONFIG_LIST.sprites.monsters.length);
    this.delayFrame = 3;

    this.animationType = 'stand';
    this.currentLoopIndex = 0;
    this.frameCount = 0;
  }

  newMonster(health, damage) {
    this.monsterNumber = Math.floor(Math.random() * CONFIG_LIST.sprites.monsters.length);
    this.animationType = 'stand';
    this.currentLoopIndex = 0;
    this.frameCount = 0;
    this.health = health || DEFAULT_HEALTH;
    this.damage = damage || DEFAULT_DAMAGE;

    $('#canvas-monster').css({
      right: '0%',
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
        console.log('nothing animation'); // eslint-disable-line
        break;
    }
  }

  drawFrame(frameX, frameY, canvasX, canvasY) {
    const width = 900;
    const height = 900;

    this.ctx.drawImage(
      this.sprite,
      frameX * width,
      frameY * height,
      width,
      height,
      canvasX,
      canvasY - 200,
      width,
      height,
    );
  }

  animation(cycleLoop, spriteSrc, animationTypeAfter) {
    this.frameCount += 1;
    this.sprite.src = spriteSrc;

    if (this.frameCount < this.delayFrame) {
      return;
    }

    this.frameCount = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawFrame(cycleLoop[this.currentLoopIndex], 0, 0, 0);
    this.currentLoopIndex += 1;

    if (this.currentLoopIndex >= cycleLoop.length) {
      this.currentLoopIndex = 0;

      if (animationTypeAfter) {
        this.animationType = animationTypeAfter;
      }
    }
  }

  standAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    const spriteSrc = CONFIG_LIST.sprites.monsters[this.monsterNumber].stand;

    this.animation(cycleLoop, spriteSrc);
  }


  attackAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const spriteSrc = CONFIG_LIST.sprites.monsters[this.monsterNumber].attack;

    this.animation(cycleLoop, spriteSrc);
  }

  hurtAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const spriteSrc = CONFIG_LIST.sprites.monsters[this.monsterNumber].hurt;
    const animationTypeAfter = 'stand';

    this.animation(cycleLoop, spriteSrc, animationTypeAfter);
  }

  dieAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const spriteSrc = CONFIG_LIST.sprites.monsters[this.monsterNumber].die;
    const animationTypeAfter = 'nothing';

    this.animation(cycleLoop, spriteSrc, animationTypeAfter);
  }

  runAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const spriteSrc = CONFIG_LIST.sprites.monsters[this.monsterNumber].run;

    this.animation(cycleLoop, spriteSrc);
  }

  jumpAnimation() {
    const cycleLoop = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1];
    const spriteSrc = CONFIG_LIST.sprites.monsters[this.monsterNumber].jump;

    this.animation(cycleLoop, spriteSrc);
  }

  async attack() {
    this.game.hero.health -= this.damage;

    this.animationType = 'run';

    $('#canvas-monster').animate(
      {
        right: `${70}%`,
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
      },
    );

    await pause(2000);
    this.animationType = 'run';

    $('#canvas-monster').animate(
      {
        right: `${0}%`,
      },
      1500,
      () => {
        this.animationType = 'stand';
      },
    );

    if (this.game.hero.health <= 0) {
      this.animationType = 'run';

      $('#canvas-monster ').animate(
        {
          right: `${30}%`,
        },
        750,
        () => {
          this.animationType = 'jump';
        },
      );
    }
  }
}

export default Monster;
