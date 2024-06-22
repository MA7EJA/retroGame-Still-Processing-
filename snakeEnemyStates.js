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
}

export class Idle extends State {
  constructor(enemy) {
    super("Idle");
    this.enemy = enemy;
  }

  enter() {
  }

  handleInput(input) {
  }
}

export class Running extends State {
  constructor(enemy) {
    super("Running");
    this.enemy = enemy;
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
    this.distance += Math.abs(this.enemy.speed * deltaTime * 0.01);

    if (this.distance >= this.walkDistance) {
      this.enemy.direction *= -1;
      this.distance = 0;
    }
  }

  handleInput(input) {}
}

export class Attacking extends State {
  constructor(enemy) {
    super("Attacking");
    this.enemy = enemy;
  }

  enter() {
  }

  handleInput(input) {
  }
}

export { states };
