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
  }

  enter() {
  }

  handleInput(input) {
  }
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
