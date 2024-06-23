import { states, Idle, Running, Attacking } from "./snakeEnemyStates.js";

class Enemy {
  constructor(game) {
    this.game = game;
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.maxFrame = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.loop = false;
    this.fps = 15;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.currentState = null;
    this.direction = 1;
  }

  update(deltaTime) {
    if (this.currentState) {
      this.currentState.update(deltaTime);
    }
  }

  draw(context) {
    if (this.currentState) {
      this.currentState.draw(context);
    }
  }

  setState(state) {
    this.currentState = state;
    this.currentState.enter();
  }
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

export class SnakeEnemy extends Enemy {
  constructor(game, player) {
    super(game);
    this.width = 64;
    this.height = 64;
    this.x = 0;
    this.y = 0;
    this.speed = 3;
    this.direction = 1;
    this.walkDistance = 100;
    this.distance = 0;
    this.states = {
      [states.IDLE]: new Idle(this),
      [states.RUNNING]: new Running(this),
      [states.ATTACKING]: new Attacking(this),
    };
    this.setState(this.states[states.RUNNING]);
    this.image = document.getElementById("snakeEnemy");
    this.facingRight = true; 
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.x += this.speed * this.direction * deltaTime * 0.01;
    this.frameTimer += deltaTime;

    if (this.direction === 1 && !this.facingRight) {
      this.facingRight = true;
    } else if (this.direction === -1 && this.facingRight) {
      this.facingRight = false;
    }
  }

  draw(context) {
    super.draw(context);
    context.imageSmoothingEnabled = false;
    if (this.facingRight) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      context.save();
      context.translate(this.x + this.width, this.y);
      context.scale(-1, 1);
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      );
      context.restore();
    }
  }
}


class OctopusEnemy extends Enemy {}
