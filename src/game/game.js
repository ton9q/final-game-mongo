import Hero from './hero';
import Monster from './monster';

class Game {
  constructor(health, damage) {
    this.hero = new Hero(this, health, damage);
    this.monster = new Monster(this, health, damage);
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
