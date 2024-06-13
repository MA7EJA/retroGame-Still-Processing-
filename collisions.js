export class CollisionBlock {
  constructor(position) {
    this.position = position;
    this.width = 32;
    this.height = 32;
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
    this.collisions2D = [];
    this.collisionBlocks = [];

    this.splitInto2DArray();
  }

  splitInto2DArray() {
    for (let i = 0; i < this.collisions.length; i += 24) {
      this.collisions2D.push(this.collisions.slice(i, i + 24));
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
  }

  draw(context) {
    this.collisionBlocks.forEach((block) => block.draw(context));
  }
}

const floor = new FloorCollisions();
