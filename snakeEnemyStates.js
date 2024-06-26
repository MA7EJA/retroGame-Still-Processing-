const states = {
  IDLE: 0,
  RUNNING: 1,
  ATTACKING: 2,
  JUMPING: 3,
  FALLING: 4
};

class State {
  constructor(state) {
    this.state = state;
    this.loop = true;
  }

  update(deltaTime) {}

  draw(context) {}
}

export class Idle extends State {
  constructor(enemy) {
    super("Idle");
    this.enemy = enemy;
    this.frameInterval = 1000 / 8;
    this.frameTimer = 0;
  }

  enter() {
    this.enemy.frameX = 0;
    this.enemy.frameY = 0;
    this.enemy.maxFrame = 3;
    this.enemy.loop = true;
  }

  update(deltaTime) {
    this.frameTimer += deltaTime;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.enemy.frameX < this.enemy.maxFrame) {
        this.enemy.frameX++;
      } else if (this.enemy.loop) {
        this.enemy.frameX = 0;
      }
    }
  }

  draw(context) {}

  handleInput(input) {}
}

export class Running extends State {
  constructor(enemy) {
    super("Running");
    this.enemy = enemy;
    this.frameInterval = 1000 / 10;
    this.frameTimer = 0;
  }

  enter() {
    this.enemy.frameX = 0;
    this.enemy.frameY = 1;
    this.enemy.maxFrame = 7;
    this.enemy.loop = true;
  }

  update(deltaTime) {
    this.frameTimer += deltaTime;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.enemy.frameX < this.enemy.maxFrame) {
        this.enemy.frameX++;
      } else if (this.enemy.loop) {
        this.enemy.frameX = 0;
      }
    }
  }

  draw(context) {}

  handleInput(input) {}
}

export class Attacking extends State {
  constructor(enemy) {
    super("Attacking");
    this.enemy = enemy;
    this.frameInterval = 1000 / 10;
    this.frameTimer = 0;
  }

  enter() {
    this.enemy.frameX = 0;
    this.enemy.frameY = 2;
    this.enemy.maxFrame = 7;
    this.enemy.loop = false;
  }

  update(deltaTime) {
    this.frameTimer += deltaTime;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.enemy.frameX < this.enemy.maxFrame) {
        this.enemy.frameX++;
      }
    }
  }

  draw(context) {}

  handleInput(input) {}
}

export class Jumping extends State {
  constructor(enemy) {
    super("Jumping");
    this.enemy = enemy;
    this.frameInterval = 1000 / 10;
    this.frameTimer = 0;
    this.maxFrame = 2;
  }

  enter() {
    this.enemy.frameX = 0;
    this.enemy.frameY = 3;
    this.enemy.loop = false;
  }

  update(deltaTime) {
    this.frameTimer += deltaTime;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.enemy.frameX < this.maxFrame) {
        this.enemy.frameX++;
      }
    }
  }

  draw(context) {}

  handleInput(input) {}
}


export class Falling extends State {
  constructor(enemy) {
    super("Falling");
    this.enemy = enemy;
    this.frameInterval = 1000 / 10;
    this.frameTimer = 0;
    this.maxFrame = 5;
  }

  enter() {
    this.enemy.frameX = 4;
    this.enemy.frameY = 3;
    this.enemy.loop = false;
  }

  update(deltaTime) {
    this.frameTimer += deltaTime;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.enemy.frameX < this.maxFrame) {
        this.enemy.frameX++;
      }
    }
  }

  draw(context) {}

  handleInput(input) {}
}

export { states };
