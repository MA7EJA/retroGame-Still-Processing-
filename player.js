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
    this.ammo = 6;
    this.previousAmmo = this.ammo;
    this.reloadTime = 2500;
    this.lastReloadTime = 0;
    this.states = [
      new Idle(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
      new Shooting(this),
      new RunningShooting(this),
      new Hurt(this),
      new Dead(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
    this.background = background;
    this.floorCollisions = floorCollisions;
    this.isOnGround = false;
    this.lives = 10;
    this.previousLives = this.lives;
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
    if (this.lives < this.previousLives) {
      const decreaseAmount = this.previousLives - this.lives;
      this.game.ui.frameY += decreaseAmount;
    }
    this.previousLives = this.lives;
    this.currentState.handleInput(input);

    if (this.currentState instanceof Hurt) {
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
    if (this.ammo < 6) {
      this.lastReloadTime += deltaTime;
    }

    if (this.ammo < 3) {
      this.reloadTime = 1600;
    } else {
      this.reloadTime = 2500;
    }

    if (this.lastReloadTime >= this.reloadTime) {
      if (this.ammo < 6) {
        this.ammo += 1;
        this.lastReloadTime = 0;
        if (this.game.ui.aFrameY > 3) {
          this.game.ui.aFrameY -= 1;
        }
        this.previousAmmo = this.ammo;
      }
    }

    if (this.ammo < this.previousAmmo) {
      if (this.game.ui.aFrameY < 9) {
        this.game.ui.aFrameY += 1;
      }
    }

    if (this.ammo === 0) {
      this.game.ui.aFrameY = 1;
    } else if (this.ammo === 1) {
      this.game.ui.aFrameY = 8;
    }

    this.previousAmmo = this.ammo;

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

    this.checkBulletBlockCollision();

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

  checkBulletBlockCollision() {
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];

      for (let j = 0; j < this.floorCollisions.collisionBlocks.length; j++) {
        const collisionBlock = this.floorCollisions.collisionBlocks[j];

        if (this.bulletBlockCollision(bullet, collisionBlock)) {
          this.bullets.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }

  bulletBlockCollision(bullet, block) {
    let collisionX, collisionY;

    if (bullet.direction === -1) {
      collisionX = bullet.x + bullet.width / 2;
      collisionY = bullet.y + bullet.height / 1.7;
    } else {
      collisionX = bullet.x + bullet.width / 3;
      collisionY = bullet.y + bullet.height / 1.7;
    }
    return (
      collisionX + bullet.width / 4 >= block.position.x &&
      collisionX <= block.position.x + block.width &&
      collisionY + bullet.height / 6 >= block.position.y &&
      collisionY <= block.position.y + block.height
    );
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
            this.x = blockLeft - (this.width / 2.49 + playerWidth);
          } else if (
            playerX < blockRight &&
            playerX + playerWidth > blockRight
          ) {
            collisionFromRight = true;
            this.x = blockRight - this.width / 2.51;
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