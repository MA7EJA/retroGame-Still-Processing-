export class Camera {
  constructor(gameWidth, gameHeight, background, floorCollisions) {
    this.x = 0;
    this.y = 0;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.background = background;
    this.floorCollisions = floorCollisions;
    this.cameraBox = {
      position: {
        x: 0,
        y: 0,
      },
      width: 360,
      height: 220,
    };
  }

  update(player, deltaTime) {
    this.cameraBox.position.x = player.x - player.width * 1.4;
    this.cameraBox.position.y = player.y - player.height / 1.4;

    const cameraBoxRight = this.cameraBox.position.x + this.cameraBox.width;
    const cameraBoxLeft = this.cameraBox.position.x;
    const backgroundRight =
      this.background.layer1.x + this.background.layer1.width;
    const backgroundLeft = this.background.layer1.x;

    const distanceToMove = player.speed * deltaTime * 0.01;

    if (cameraBoxRight >= this.gameWidth + 1) {
      if (player.speed >= 0) {
        if (cameraBoxRight <= backgroundRight) {
          this.moveSceneObjects(-distanceToMove);
        }
      }
    } else if (this.cameraBox.position.x <= -1) {
      if (player.speed < 0) {
        if (cameraBoxLeft >= backgroundLeft) {
          this.moveSceneObjects(-distanceToMove);
        }
      }
    }
  }

  moveSceneObjects(distance) {
    if (
      this.background.layer1.x + distance <= 0 &&
      this.background.layer1.x + distance >=
        -(this.background.layer1.width - this.gameWidth)
    ) {
      this.background.layer1.x += distance;
      this.floorCollisions.collisionBlocks.forEach((block) => {
        block.position.x += distance;
      });
      this.floorCollisions.platformCollisionBlocks.forEach((block) => {
        block.position.x += distance;
      });
    }
  }

  draw(context, player) {
    context.translate(this.x, this.y);

    if (player.facingRight) {
      context.drawImage(
        player.image,
        player.frameX * player.spriteWidth,
        player.frameY * player.spriteHeight,
        player.spriteWidth,
        player.spriteHeight,
        player.x,
        player.y,
        player.width,
        player.height
      );
    } else {
      context.save();
      context.translate(player.x + player.width, player.y);
      context.scale(-1, 1);
      context.drawImage(
        player.image,
        player.frameX * player.spriteWidth,
        player.frameY * player.spriteHeight,
        player.spriteWidth,
        player.spriteHeight,
        0,
        0,
        player.width,
        player.height
      );
      context.restore();
    }

    context.strokeRect(
      player.x + player.width / 2.5,
      player.y + player.height / 3.5,
      player.width / 5,
      player.height / 2.5
    );
    context.fillStyle = "rgba(0, 0, 255, 0.4)";
    context.fillRect(
      this.cameraBox.position.x,
      this.cameraBox.position.y,
      this.cameraBox.width,
      this.cameraBox.height
    );
    player.bullets.forEach((bullet) => bullet.draw(context));
  }
}
