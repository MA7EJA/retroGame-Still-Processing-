export class Bullet {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
    this.spriteWidth = 32;
    this.spriteHeight = 32;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 3; 
    this.speed = 60;
    this.direction = direction;
    this.image = document.getElementById("playerBullet");
    this.frameInterval = 100; 
    this.frameTimer = 0;
  }

  update(deltaTime) {
    this.x += this.speed * this.direction * deltaTime * 0.01;
    this.frameTimer += deltaTime;
    if (this.frameTimer > this.frameInterval) {
      this.frameX = (this.frameX + 1) % (this.maxFrame + 1);
      this.frameTimer = 0;
    }
  }

  draw(context) {
    context.imageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.fillStyle = "red";
    context.fillRect(
      this.x + this.width / 2,
      this.y + this.height / 1.7,
      this.width / 4,
      this.height / 6
    );
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
  }
}
