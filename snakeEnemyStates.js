const states = {
  IDLE: 0,
  RUNNING: 1,
  ATTACKING: 2,
};

class State {
  constructor(state) {
    this.state = state;
    this.loop = true;
  }

  update(deltaTime) {
    // Default update method
  }

  draw(context) {
    // Default draw method
  }
}

export class Idle extends State {
  constructor(enemy) {
    super("Idle");
    this.enemy = enemy;
  }

  enter() {}

  update(deltaTime) {}

  draw(context) {
    // Optionally implement specific draw logic for Idle state
  }

  handleInput(input) {}
}

export class Running extends State {
  constructor(enemy) {
    super("Running");
    this.enemy = enemy;
    this.distance = 0;
    this.walkDistance = 100;
  }

  enter() {
    this.enemy.frameX = 0;
    this.enemy.frameY = 1;
    this.enemy.maxFrame = 7;
    this.enemy.loop = true;
  }

  update(deltaTime) {
    this.enemy.x += this.enemy.speed * this.enemy.direction * deltaTime * 0.01;

    if (this.enemy.x <= 0) {
      this.enemy.direction = 1; // Change direction to right
    } else if (this.enemy.x + this.enemy.width >= this.enemy.game.width) {
      this.enemy.direction = -1; // Change direction to left
    }

    this.distance += Math.abs(this.enemy.speed * deltaTime * 0.01);

    if (this.distance >= this.walkDistance) {
      this.enemy.direction *= -1; // Reverse direction
      this.distance = 0; // Reset distance
    }
  }

  draw(context) {
    // Optionally implement specific draw logic for Running state
  }

  handleInput(input) {}
}

export class Attacking extends State {
  constructor(enemy) {
    super("Attacking");
    this.enemy = enemy;
  }

  enter() {}

  update(deltaTime) {}

  draw(context) {
    // Optionally implement specific draw logic for Attacking state
  }

  handleInput(input) {}
}

export { states };
