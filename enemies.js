
import {
  states,
  Idle,
  Running,
  Attacking,
  Jumping,
  Falling,
} from "./snakeEnemyStates.js";

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
    this.checkForHorizontalCollision();

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
    this.player = player;
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.width = this.spriteWidth * 2;
    this.height = this.spriteHeight * 2;
    this.x = 0;
    this.y = 0;
    this.speed = 2.5;
    this.weight = 20;
    this.direction = 1;
    this.walkDistance = 150;
    this.distance = 0;
    this.isWaiting = false;
    this.lastAttackTime = 0;
    this.attackCooldown = 3000;
    this.canAttack = true;
    this.states = {
      [states.IDLE]: new Idle(this),
      [states.RUNNING]: new Running(this),
      [states.ATTACKING]: new Attacking(this),
      [states.JUMPING]: new Jumping(this),
      [states.FALLING]: new Falling(this),
    };
    this.setState(this.states[states.RUNNING]);
    this.image = document.getElementById("snakeEnemy");
    this.isOnGround = false;
  }

  update(deltaTime) {
    super.update(deltaTime);
    if (this.isWaiting) return;
    this.x += this.speed * this.direction * deltaTime * 0.01;
    this.frameTimer += deltaTime;
    
    if (this.currentState === this.states[states.ATTACKING]) {
      this.currentState.update(deltaTime);
      return;
    }

    if (!this.canAttack) {
      const elapsedTime = Date.now() - this.lastAttackTime;
      if (elapsedTime >= this.attackCooldown) {
        this.canAttack = true;
      }
    }

    this.checkPlayerCollision();

    if (this.direction === 1 && !this.facingRight) {
      this.facingRight = true;
    } else if (this.direction === -1 && this.facingRight) {
      this.facingRight = false;
    }

    if (this.x <= 0) {
      this.direction = 1;
    } else if (this.x + this.width >= this.game.width) {
      this.direction = -1;
    }

    this.distance += Math.abs(this.speed * deltaTime * 0.01);

    if (this.distance >= this.walkDistance) {
      this.isWaiting = true;
      const randomPauseTime = Math.random() * 3000 + 3000;
      setTimeout(() => {
        this.isWaiting = false;
        this.direction *= -1;
        this.distance = 0;
      }, randomPauseTime);
    }
    if (this.isOnGround && this.currentState !== this.states[states.RUNNING]) {
      this.setState(this.states[states.RUNNING]);
      this.speed = 2.5;
    }
    if (
      !this.isOnGround &&
      this.vy >= 2 &&
      this.currentState !== this.states[states.FALLING]
    ) {
      this.setState(this.states[states.FALLING]);
    }
    if (this.isWaiting) {
      this.setState(this.states[states.IDLE]);
    }
    this.checkPurpleRectCollisionWithPlayer();

    if (!this.canAttack) {
      const elapsedTime = Date.now() - this.lastAttackTime;
      if (elapsedTime >= this.attackCooldown) {
        this.canAttack = true;
      }
    }
  }

  draw(context) {
    super.draw(context);
    context.imageSmoothingEnabled = false;
    if (this.facingRight) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
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

    context.restore();

    context.strokeStyle = "red";
    context.lineWidth = 2;
    if (this.facingRight) {
      context.strokeRect(
        this.x + this.width * 0.1,
        this.y + this.height * 0.25,
        this.width * 0.5,
        this.height * 0.5
      );
      context.strokeStyle = "yellow";
      context.strokeRect(
        this.x - this.width * 0.5,
        this.y + this.height * 0.25,
        this.width * 2.3,
        this.height * 0.5
      );
      context.strokeStyle = "purple";
      context.strokeRect(
        this.x + this.width * 0.3,
        this.y + this.height * 0.25,
        this.width * 0.7,
        this.height * 0.5
      );
    } else {
      context.save();
      context.translate(this.x + this.width, this.y);
      context.scale(-1, 1);
      context.strokeRect(
        0 + this.width * 0.1,
        this.height * 0.25,
        this.width * 0.5,
        this.height * 0.5
      );
      context.restore();

      context.strokeStyle = "yellow";
      context.strokeRect(
        this.x - this.width * 0.8,
        this.y + this.height * 0.25,
        this.width * 2.3,
        this.height * 0.5
      );
      context.restore();

      context.strokeStyle = "purple";
      context.strokeRect(
        this.x - this.width * 0.01,
        this.y + this.height * 0.25,
        this.width * 0.7,
        this.height * 0.5
      );
      context.restore();
    }
  }
  checkForHorizontalCollision() {
    let enemyX, enemyY, enemyWidth, enemyHeight;

    if (this.facingRight) {
      enemyX = this.x + this.width * 0.1;
      enemyY = this.y + this.height * 0.25;
    } else {
      enemyX = this.x + this.width - this.width * 0.6;
      enemyY = this.y + this.height * 0.25;
    }

    enemyWidth = this.width * 0.5;
    enemyHeight = this.height * 0.5;

    let collisionFromLeft = false;
    let collisionFromRight = false;

    for (let i = 0; i < this.floorCollisions.collisionBlocks.length; i++) {
      const collisionBlock = this.floorCollisions.collisionBlocks[i];

      if (
        this.collision(collisionBlock, enemyX, enemyY, enemyWidth, enemyHeight)
      ) {
        const blockLeft = collisionBlock.position.x;
        const blockRight = collisionBlock.position.x + collisionBlock.width;

        if (
          enemyY + enemyHeight > collisionBlock.position.y &&
          enemyY < collisionBlock.position.y + collisionBlock.height
        ) {
          if (enemyX + enemyWidth > blockLeft && enemyX < blockLeft) {
            collisionFromLeft = true;
            this.speed = 0;
            this.x = blockLeft - (this.width / 2 + enemyWidth + 0.01);
            this.jump();
          } else if (enemyX < blockRight && enemyX + enemyWidth > blockRight) {
            collisionFromRight = true;
            this.x = blockRight - this.width / 2.65;
            this.speed = 0;
            this.jump();
          }
        }
      }
    }
  }
  jump() {
    this.setState(this.states[states.JUMPING]);
    this.vy = -60;
    this.speed = 4;
  }
  checkForVerticalCollision() {
    let enemyX, enemyY, enemyWidth, enemyHeight;

    if (this.facingRight) {
      enemyX = this.x + this.width * 0.1;
      enemyY = this.y + this.height * 0.25;
    } else {
      enemyX = this.x + this.width - this.width * 0.6;
      enemyY = this.y + this.height * 0.25;
    }

    enemyWidth = this.width * 0.5;
    enemyHeight = this.height * 0.5;

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
          this.isOnGround = true;
          this.y = blockTop - (this.height / 4 + enemyHeight + 0.01);
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

  checkPlayerCollision() {
    const player = this.player;

    let playerX = player.x + player.width / 2.5;
    let playerY = player.y + player.height / 3.5;
    let playerWidth = player.width / 5;
    let playerHeight = player.height / 2.5;

    let yellowRectX, yellowRectY, yellowRectWidth, yellowRectHeight;

    this.speed = 2.5;
    if (this.facingRight) {
      yellowRectX = this.x - this.width * 0.5;
      yellowRectY = this.y + this.height * 0.25;
    } else {
      yellowRectX = this.x - this.width * 0.8;
      yellowRectY = this.y + this.height * 0.25;
    }

    yellowRectWidth = this.width * 2.3;
    yellowRectHeight = this.height * 0.5;

    if (
      playerX < yellowRectX + yellowRectWidth &&
      playerX + playerWidth > yellowRectX &&
      playerY < yellowRectY + yellowRectHeight &&
      playerY + playerHeight > yellowRectY
    ) {
      this.moveToPlayer();
      this.speed = 5;
    }
  }

  moveToPlayer() {
    if (this.player.x < this.x) {
      this.direction = -1;
      this.facingRight = false;
    } else {
      this.direction = 1;
      this.facingRight = true;
    }
    this.isWaiting = false;
  }
  checkPurpleRectCollisionWithPlayer() {
    const player = this.player;

    let playerX = player.x + player.width / 2.5;
    let playerY = player.y + player.height / 3.5;
    let playerWidth = player.width / 5;
    let playerHeight = player.height / 2.5;

    let aRectX, aRectY, aRectWidth, aRectHeight;

    if (this.facingRight) {
      aRectX = this.x + this.width * 0.3;
      aRectY = this.y + this.height * 0.25;
    } else {
      aRectX = this.x - this.width * 0.01;
      aRectY = this.y + this.height * 0.25;
    }

    aRectWidth = this.width * 0.7;
    aRectHeight = this.height * 0.5;

    if (
      aRectX < playerX + playerWidth &&
      aRectX + aRectWidth > playerX &&
      aRectY < playerY + playerHeight &&
      aRectY + aRectHeight > playerY
    ) {
      if (this.canAttack) {
        this.setState(this.states[states.ATTACKING]);
        this.speed = 0;
        this.lastAttackTime = Date.now();
        this.canAttack = false;

        setTimeout(() => {
          this.canAttack = true;
        }, this.attackCooldown);

        setTimeout(() => {
          if (
            this.currentState === this.states[states.ATTACKING] &&
            this.frameX >= this.maxFrame
          ) {
            if (
              aRectX < playerX + playerWidth &&
              aRectX + aRectWidth > playerX &&
              aRectY < playerY + playerHeight &&
              aRectY + aRectHeight > playerY
            ) {
              if (!player.isInvincible) {
                player.setState(6);
                player.lives -= 3;
              }
            }
            this.setState(this.states[states.RUNNING]);
            this.speed = 2.5;
          }
        }, this.frameInterval * this.maxFrame);
      }
    }
  }
}

class OctopusEnemy extends Enemy {}
