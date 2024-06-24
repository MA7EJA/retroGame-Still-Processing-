import { states, Idle, Running, Attacking } from "./snakeEnemyStates.js";

class Enemy {
  constructor(game, floorCollisions) {
    this.game = game;
    this.floorCollisions = floorCollisions;
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
    this.vy = 0;
    this.weight = 15;
    this.isOnGround = false;
  }

  update(deltaTime) {
    if (this.currentState) {
      this.currentState.update(deltaTime);
    }

    this.y += this.vy * deltaTime * 0.01;
    if (!this.isOnGround) this.vy += this.weight * deltaTime * 0.01;
    else this.vy = 0;

    this.checkForVerticalCollision();
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

  checkForVerticalCollision() {
    let enemyX = this.x;
    let enemyY = this.y;
    let enemyWidth = this.width;
    let enemyHeight = this.height;

    this.isOnGround = false;

    for (let i = 0; i < this.floorCollisions.collisionBlocks.length; i++) {
      const collisionBlock = this.floorCollisions.collisionBlocks[i];

      if (
        this.collision(collisionBlock, enemyX, enemyY, enemyWidth, enemyHeight)
      ) {
        const blockTop = collisionBlock.position.y;
        const blockBottom = collisionBlock.position.y + collisionBlock.height;

        if (
          enemyY + enemyHeight > blockTop &&
          enemyY + enemyHeight < blockBottom
        ) {
          this.y = blockTop - enemyHeight - 0.01;
          this.isOnGround = true;
          this.vy = 0;
        } else if (enemyY < blockBottom && enemyY > blockTop) {
          this.y = blockBottom;
          this.vy += this.weight;
        }
      }
    }

    if (this.isOnGround) {
      this.vy = 0;
    }
  }

  collision(collisionBlock, enemyX, enemyY, enemyWidth, enemyHeight) {
    return (
      enemyY + enemyHeight >= collisionBlock.position.y &&
      enemyY <= collisionBlock.position.y + collisionBlock.height &&
      enemyX <= collisionBlock.position.x + collisionBlock.width &&
      enemyX + enemyWidth >= collisionBlock.position.x
    );
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
  constructor(game, player, floorCollisions) {
    super(game, floorCollisions);
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
