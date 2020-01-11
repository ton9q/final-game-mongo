import $ from 'jquery';

import { pause } from '../utils/index';
import CONFIG_LIST from '../utils/loadImages';
import resizeCanvas from '../utils/resizeCanvas';
import changeLocationHeroImage from '../utils/changeLocationHeroImage';

import { DEFAULT_HEALTH, DEFAULT_DAMAGE } from '../constants/defaultEntityData';

const cycleLoop = [0, 1, 2, 3, 4];

class Hero {
  constructor(game, health, damage) {
    this.health = health || DEFAULT_HEALTH;
    this.damage = damage || DEFAULT_DAMAGE;

    this.canvas = document.getElementById('canvas-hero');
    this.ctx = this.canvas.getContext('2d');
    resizeCanvas(this.canvas, 3.5);

    this.game = game;

    this.sprite = new Image();
    this.heroNumber = Number($('#person-container').attr('data-battle'));
    this.delayFrame = 12;

    this.animationType = 'stand';
    this.currentLoopIndex = 0;
    this.frameCount = 0;
  }

  newHero(health, damage) {
    this.heroNumber = Number($('#person-container').attr('data-battle'));
    this.animationType = 'stand';
    this.currentLoopIndex = 0;
    this.frameCount = 0;
    this.health = health || DEFAULT_HEALTH;
    this.damage = damage || DEFAULT_DAMAGE;

    $('#canvas-hero').css({
      left: '5%',
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

  drawFrame(frameX, frameY) {
    const {
      width, height, canvasX, canvasY,
    } = changeLocationHeroImage(this.heroNumber, this.animationType);

    this.ctx.drawImage(
      this.sprite,
      frameX * width,
      frameY * height,
      width,
      height,
      canvasX,
      canvasY - 10,
      width,
      height,
    );
  }

  animation(spriteSrc, animationTypeAfter) {
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
    const spriteSrc = CONFIG_LIST.sprites.heroes[this.heroNumber].stand;
    this.animation(spriteSrc);
  }

  attackAnimation() {
    const spriteSrc = CONFIG_LIST.sprites.heroes[this.heroNumber].attack;
    this.animation(spriteSrc);
  }

  hurtAnimation() {
    const spriteSrc = CONFIG_LIST.sprites.heroes[this.heroNumber].hurt;
    const animationTypeAfter = 'stand';
    this.animation(spriteSrc, animationTypeAfter);
  }

  dieAnimation() {
    const spriteSrc = CONFIG_LIST.sprites.heroes[this.heroNumber].die;
    const animationTypeAfter = 'nothing';
    this.animation(spriteSrc, animationTypeAfter);
  }

  runAnimation() {
    const spriteSrc = CONFIG_LIST.sprites.heroes[this.heroNumber].run;
    this.animation(spriteSrc);
  }

  jumpAnimation() {
    const spriteSrc = CONFIG_LIST.sprites.heroes[this.heroNumber].jump;
    this.animation(spriteSrc);
  }

  async attack() {
    this.game.monster.health -= this.damage;

    this.animationType = 'run';

    $('#canvas-hero').animate(
      {
        left: `${72}%`,
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
      },
    );

    await pause(2000);
    this.animationType = 'run';

    $('#canvas-hero').animate(
      {
        left: `${5}%`,
      },
      1500,
      () => {
        this.animationType = 'stand';
      },
    );

    if (this.game.monster.health <= 0) {
      this.animationType = 'run';

      $('#canvas-hero').animate(
        {
          left: `${30}%`,
        },
        750,
        () => {
          this.animationType = 'jump';
        },
      );
    }
  }
}

export default Hero;
