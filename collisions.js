export class CollisionBlock {
  constructor(position, height = 32) {
    this.position = position;
    this.width = 32;
    this.height = height;
  }

  draw(context) {
    context.fillStyle = "rgba(255, 0, 0, 0.5)";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export class FloorCollisions {
  constructor() {
    this.collisions = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 762, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 762, 762, 762, 762,
      762, 762, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 762, 762, 762, 762, 762, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 762, 762, 0, 0, 0, 0, 0, 0, 0, 0, 762, 0, 0, 762, 762, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 762, 762, 762, 0, 0, 0, 0, 0, 0, 762, 762,
      0, 0, 0, 0, 0, 0, 762, 762, 762, 762, 762, 762, 762, 762, 0, 0, 762, 762,
      0, 0, 0, 0, 762, 762, 0, 0, 0, 0, 0, 0, 762, 762, 0, 0, 0, 0, 0, 0, 762,
      762, 762, 762, 0, 0, 0, 0, 762, 0, 762, 762, 0, 0, 0, 0, 0, 0, 762, 762,
      762, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 762, 0, 762, 0, 0, 0, 0, 0, 0, 0,
      0, 762, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 762, 0, 762, 762, 762, 0,
      0, 0, 0, 0, 762, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 762, 0, 0, 0, 762,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 762, 0, 762, 762,
      0, 0, 0, 0, 0, 0, 0, 762, 762, 762, 762, 0, 0, 0, 0, 0, 0, 0, 0, 762, 0,
      762, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 762, 762, 762, 0, 0, 0, 0, 0,
      762, 0, 762, 0, 0, 0, 762, 762, 762, 762, 762, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 762, 0, 762, 0, 0, 0, 762, 0, 0, 0, 762, 0,
    ];
    this.platformCollisions = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 762, 762, 762, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      762, 762, 762, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    this.collisions2D = [];
    this.platformCollisions2D = [];
    this.collisionBlocks = [];
    this.platformCollisionBlocks = [];

    this.splitInto2DArray();
  }

  splitInto2DArray() {
    for (let i = 0; i < this.collisions.length; i += 24) {
      this.collisions2D.push(this.collisions.slice(i, i + 24));
    }
    for (let i = 0; i < this.platformCollisions.length; i += 24) {
      this.platformCollisions2D.push(this.platformCollisions.slice(i, i + 24));
    }
    this.collisions2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 762) {
          this.collisionBlocks.push(
            new CollisionBlock({
              x: x * 32,
              y: y * 32,
            })
          );
        }
      });
    });
    this.platformCollisions2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 762) {
          this.platformCollisionBlocks.push(
            new CollisionBlock({
              x: x * 32,
              y: y * 32,
            }, 16)
          );
        }
      });
    });
  }

  draw(context) {
    this.collisionBlocks.forEach((block) => block.draw(context));
    this.platformCollisionBlocks.forEach((block) => block.draw(context));
  }
}

const floor = new FloorCollisions();
