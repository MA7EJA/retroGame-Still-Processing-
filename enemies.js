import { states, Idle, Running, Attacking } from "./snakeEnemyStates.js";

class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 15;
    this.frameINterval = 1000 / this.fps;
    this.frameTimer = 0;
  }
  update() {}
  draw() {}
}

class SpiderEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 48;
    this.height = 48;
    this.x = 200;
    this.y = 200;
    this.speedX = 2;
    this.maxFrame;
  }
}

export class SnakeEnemy {
  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.x = 0;
    this.y = 0;
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.frameX = 0;
    this.frameY = 0;
    this.width = 64;
    this.height = 64;
    this.speed = 3;
    this.direction = 1;
    this.states = [new Idle(this), new Running(this), new Attacking(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
    this.image = document.getElementById("snakeEnemy");
  }

  update(deltaTime) {
    this.currentState.update(deltaTime);
    this.x += this.speed * this.direction * deltaTime * 0.01;
    this.frameTimer += deltaTime;
  }

  draw(context) {
    context.imageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    this.currentState.draw(context);
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      0,
      0,
      this.width,
      this.height
    );
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}

class OctopusEnemy extends Enemy {}
