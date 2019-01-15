import Hero from './hero';
import Monster from './monster';

class Game {
  constructor() {
    this.hero = new Hero(this);
    this.monster = new Monster(this);
    this.animation;
  }

  draw() {
    this.hero.animate();
    this.monster.animate();
    this.animation = requestAnimationFrame(this.draw.bind(this));
  }

  animate() {
    this.animation = requestAnimationFrame(this.draw.bind(this));
  }
}

export default Game;
