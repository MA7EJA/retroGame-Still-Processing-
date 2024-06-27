import { Idle, Running, Jumping, Falling, Shooting, RunningShooting, Hurt, Dead } from "./playerStates.js";
import { Bullet } from "./bullet.js";

export class Player {
  constructor(game, floorCollisions, background) {
    this.game = game;
    this.spriteWidth = 48;
    this.spriteHeight = 48;
    this.width = this.spriteWidth * 2;
    this.height = this.spriteHeight * 2;
    this.x = 0;
    this.y = 50;
    this.vy = 0;
    this.weight = 15;
    this.image = document.getElementById("player");
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.fps = 15;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 18;
    this.facingRight = true;
    this.Bullet = Bullet;
    this.bullets = [];
    this.states = [
      new Idle(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
      new Shooting(this),
      new RunningShooting(this),
      new Hurt(this),
      new Dead(this)
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
    this.background = background;
    this.floorCollisions = floorCollisions;
    this.isOnGround = false;
    this.lives = 10;
    this.isDeleted = false;
    this.isInvincible = false;
    this.invincibleTimer = 0;
    this.invincibleDuration = 2000;
  }
  update(input, deltaTime) {
    if (this.lives <= 0) {
      this.lives = 0;
      
      if (!(this.currentState instanceof Dead)) {
        this.setState(7);
      }
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = this.maxFrame;
      }
      return;
    }
    this.currentState.handleInput(input);

    if(this.currentState instanceof Hurt){
      this.speed = 0;
      this.isInvincible = true;
      this.invincibleTimer = 0;
    }

    if (this.isInvincible) {
      this.invincibleTimer += deltaTime;
      if (this.invincibleTimer >= this.invincibleDuration) {
        this.isInvincible = false;
        this.invincibleTimer = 0;
      }
    }

    if (this.currentState instanceof Shooting) {
      this.speed = 0;
    } else {
      switch (true) {
        case input.includes("ArrowRight"):
          this.speed = this.maxSpeed;
          this.facingRight = true;
          break;
        case input.includes("ArrowLeft"):
          this.speed = -this.maxSpeed;
          this.facingRight = false;
          break;
        default:
          this.speed = 0;
          break;
      }
    }
    this.x += this.speed * deltaTime * 0.01;
    
     this.bullets.forEach((bullet) => bullet.update(deltaTime));
     this.bullets = this.bullets.filter(
       (bullet) => bullet.x > 0 && bullet.x < this.game.width
     );

    this.checkForHorizontalCollision();

    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    this.y += this.vy * deltaTime * 0.01;
    if (!this.isOnGround) this.vy += this.weight * deltaTime * 0.01;
    else this.vy = 0;

    this.checkForVerticalCollision();
    this.checkForPlatformVerticalCollision();

    if (this.vy > 2 && !(this.currentState instanceof Falling)) {
      this.setState(3);
    }

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        if (this.currentState.loop) {
          this.frameX = 0;
        } else {
          this.frameX = this.maxFrame;
        }
      }
    } else {
      this.frameTimer += deltaTime;
    }
  }

  updateBullets(deltaTime) {
    this.bullets.forEach((bullet, index) => {
      bullet.update(deltaTime);
      
      if (bullet.x < 0 || bullet.x > this.game.width) {
        this.bullets.splice(index, 1);
      }
    });
  }

  draw(context) {
    if (this.isDeleted) return;
    context.imageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    if (this.isInvincible) {
      if (Math.floor(this.invincibleTimer / 100) % 2) {
        context.globalAlpha = 0.5;
      } else {
        context.globalAlpha = 1.0;
      }
    } else {
      context.globalAlpha = 1.0;
    }
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
      context.restore();
    }

    context.globalAlpha = 1.0;
    context.strokeRect(
      this.x + this.width / 2.5,
      this.y + this.height / 3.5,
      this.width / 5,
      this.height / 2.5
    );
    this.bullets.forEach((bullet) => bullet.draw(context));
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
  checkForHorizontalCollision() {
    let playerX = this.x + this.width / 2.5;
    let playerY = this.y + this.height / 3.5;
    let playerWidth = this.width / 5;
    let playerHeight = this.height / 2.5;

    let collisionFromLeft = false;
    let collisionFromRight = false;

    for (let i = 0; i < this.floorCollisions.collisionBlocks.length; i++) {
      const collisionBlock = this.floorCollisions.collisionBlocks[i];

      if (
        this.collision(
          collisionBlock,
          playerX,
          playerY,
          playerWidth,
          playerHeight
        )
      ) {
        const blockLeft = collisionBlock.position.x;
        const blockRight = collisionBlock.position.x + collisionBlock.width;

        if (
          playerY + playerHeight > collisionBlock.position.y &&
          playerY < collisionBlock.position.y + collisionBlock.height
        ) {
          if (playerX + playerWidth > blockLeft && playerX < blockLeft) {
            collisionFromLeft = true;
            this.speed = 0;
            this.x = blockLeft - (this.width / 2.4 + playerWidth);
          } else if (
            playerX < blockRight &&
            playerX + playerWidth > blockRight
          ) {
            collisionFromRight = true;
            this.x = blockRight - this.width / 2.6;
            this.speed = 0;
          }
        }
      }
    }
  }

  checkForVerticalCollision() {
    let playerX = this.x + this.width / 2.5;
    let playerY = this.y + this.height / 3.5;
    let playerWidth = this.width / 5;
    let playerHeight = this.height / 2.5;

    this.isOnGround = false;
    let collisionFromBelow = false;

    for (let i = 0; i < this.floorCollisions.collisionBlocks.length; i++) {
      const collisionBlock = this.floorCollisions.collisionBlocks[i];

      if (
        this.collision(
          collisionBlock,
          playerX,
          playerY,
          playerWidth,
          playerHeight
        )
      ) {
        const blockTop = collisionBlock.position.y;
        const blockBottom = collisionBlock.position.y + collisionBlock.height;

        if (
          playerY + playerHeight > blockTop &&
          playerY + playerHeight < blockBottom
        ) {
          this.y = blockTop - (this.height / 3.5 + playerHeight + 0.01);
          this.isOnGround = true;
          this.vy = 0;
          collisionFromBelow = true;
        } else if (playerY < blockBottom && playerY > blockTop) {
          this.y = blockBottom - this.height / 3.5;
          this.vy += this.weight;
        }
      }
    }

    if (this.isOnGround && !collisionFromBelow) {
      this.vy = 0;
    }
  }

  checkForPlatformVerticalCollision() {
    let playerX = this.x + this.width / 2.5;
    let playerY = this.y + this.height / 3.5;
    let playerWidth = this.width / 5;
    let playerHeight = this.height / 2.5;

    for (
      let i = 0;
      i < this.floorCollisions.platformCollisionBlocks.length;
      i++
    ) {
      const platformCollisionBlock =
        this.floorCollisions.platformCollisionBlocks[i];

      if (
        this.platformCollision(
          platformCollisionBlock,
          playerX,
          playerY,
          playerWidth,
          playerHeight
        )
      ) {
        const blockTop = platformCollisionBlock.position.y;
        const blockLeft = platformCollisionBlock.position.x;
        const blockRight =
          platformCollisionBlock.position.x + platformCollisionBlock.width;
        if (
          playerY + playerHeight > blockTop &&
          playerY < blockTop &&
          playerX + playerWidth > blockLeft &&
          playerX < blockRight
        ) {
          this.y = blockTop - (this.height / 3.5 + playerHeight) - 0.01;
          this.isOnGround = true;
          this.vy = 0;
          if (this.currentState instanceof Jumping) {
            this.setState(0);
          }
        }
      }
    }
  }

  collision(collisionBlock, playerX, playerY, playerWidth, playerHeight) {
    return (
      playerY + playerHeight >= collisionBlock.position.y &&
      playerY <= collisionBlock.position.y + collisionBlock.height &&
      playerX <= collisionBlock.position.x + collisionBlock.width &&
      playerX + playerWidth >= collisionBlock.position.x
    );
  }
  platformCollision(
    collisionBlock,
    playerX,
    playerY,
    playerWidth,
    playerHeight
  ) {
    return (
      playerY + playerHeight >= collisionBlock.position.y &&
      playerY + playerHeight <=
        collisionBlock.position.y + collisionBlock.height &&
      playerX <= collisionBlock.position.x + collisionBlock.width &&
      playerX + playerWidth >= collisionBlock.position.x
    );
  }
}