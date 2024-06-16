import { Idle, Running, Jumping, Falling, Shooting, RunningShooting } from "./playerStates.js";

export class Player {
  constructor(game, floorCollisions) {
    this.game = game;
    this.spriteWidth = 48;
    this.spriteHeight = 48;
    this.width = this.spriteWidth * 2;
    this.height = this.spriteHeight * 2;
    this.x = 0;
    this.y = this.game.height - this.height * 2;
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
    this.states = [
      new Idle(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
      new Shooting(this),
      new RunningShooting(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
    this.floorCollisions = floorCollisions;
    this.isOnGround = false;
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input);
    this.x += this.speed * deltaTime * 0.01;

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

    this.checkForHorizontalCollision();

    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    this.y += this.vy * deltaTime * 0.01;
    if (!this.isOnGround) this.vy += this.weight * deltaTime * 0.01;
    else this.vy = 0;

    this.checkForVerticalCollision();

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
  draw(context) {
    context.imageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
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
    context.strokeRect(
      this.x + this.width / 2.5,
      this.y + this.height / 3.5,
      this.width / 5,
      this.height / 2.5
    );
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

        // Provera da li se sudar dogodio odozdo
        if (
          playerY + playerHeight > blockTop &&
          playerY + playerHeight < blockBottom
        ) {
          this.y = blockTop - (this.height / 3.5 + playerHeight + 0.01);
          this.isOnGround = true;
          this.vy = 0;
          collisionFromBelow = true;
        } else if (playerY < blockBottom && playerY > blockTop) {
          // Sudar odozgo
          this.y = blockBottom - this.height / 3.5;
          this.vy += this.weight;
        }
      }
    }

    if (this.isOnGround && !collisionFromBelow) {
      this.vy = 0;
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
}