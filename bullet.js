export class Bullet {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 5;
    this.speed = 10;
    this.direction = direction;
  }

  update(deltaTime) {
    this.x += this.speed * this.direction * deltaTime * 0.01;
  }

  draw(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
