const states = {
  IDLE: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  SHOOTING: 4,
  RUNNINGSHOOTING: 5,
  HURT: 6
};

class State {
    constructor(state){
        this.state = state;
        this.loop = true; 
    }
}

export class Idle extends State{
    constructor(player){
        super('Idle');
        this.player = player;
    }
    enter(){
        this.player.frameX = 1;
        this.player.frameY = 2;
        this.player.maxFrame = 1;
        this.loop = false; 
    }
    handleInput(input){
        if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
          this.player.setState(states.RUNNING);
        } else if (input.includes("ArrowUp") && this.player.isOnGround) {
          this.player.setState(states.JUMPING);
        } else if (input.includes("x") && this.player.isOnGround) {
          this.player.setState(states.SHOOTING);
        }
    }
}

export class Running extends State {
  constructor(player) {
    super("Running");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = 1;
    this.player.maxFrame = 7;
    this.loop = true; 
  }
  handleInput(input) {
    if (
      input.indexOf("ArrowLeft") === -1 &&
      input.indexOf("ArrowRight") === -1
    ) {
      this.player.setState(states.IDLE);
    } else if (input.includes("ArrowUp") && this.player.isOnGround) {
      this.player.setState(states.JUMPING);
    } else if (
      input.includes("x") &&
      (input.includes("ArrowLeft") || input.includes("ArrowRight")) &&
      this.player.isOnGround
    ) {
      this.player.setState(states.RUNNINGSHOOTING);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super("Jumping");
    this.player = player;
  }
  enter() {
    this.player.vy = 0;
    if (this.player.isOnGround) this.player.vy = -60;
    this.player.frameX = 0;
    this.player.frameY = 3;
    this.player.maxFrame = 3;
    this.loop = false; 
    this.player.isOnGround = false;
  }
  handleInput(input) {
    if (this.player.vy > this.player.weight) {
      this.player.setState(states.FALLING);
    }
  }
}

export class Falling extends State {
  constructor(player) {
    super("Falling");
    this.player = player;
  }
  enter() {
    this.player.vy = 10;
    this.player.frameX = 3;
    this.player.frameY = 3;
    this.player.maxFrame = 5;
    this.loop = false; 
  }
  handleInput(input) {
    if (this.player.isOnGround) {
      this.player.setState(states.IDLE);
    } else if (input.includes("ArrowUp") && this.player.isOnGround) {
      this.player.setState(states.JUMPING);
    }
  }
}

export class Shooting extends State {
  constructor(player) {
    super("Shooting");
    this.player = player;
    this.createBulletAction = new CreateBulletAction(player);
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = 4;
    this.player.maxFrame = 5;
    this.loop = false;
  }
  handleInput(input) {
    if (this.player.frameX >= this.player.maxFrame && !input.includes("x")) {
      this.player.setState(states.IDLE);
      this.loop = false;
    } else {
      this.loop = true;
    }

    if (this.player.frameX === 2 && !this.bulletCreated) {
      this.createBulletAction.execute();
      this.bulletCreated = true;
    }

    if (this.player.frameX === 0 || this.player.frameX > 2) {
      this.bulletCreated = false;
    }
  }
}

export class RunningShooting extends State {
  constructor(player) {
    super("RunningShooting");
    this.player = player;
    this.createBulletAction = new CreateBulletAction(player);
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = 0;
    this.player.maxFrame = 7;
    this.loop = false;
  }
  handleInput(input) {
    if (this.player.frameX >= this.player.maxFrame && !input.includes("x")) {
      this.player.setState(states.IDLE);
      this.loop = false;
    } else {
      this.loop = true;
    }
    if (
      !input.includes("ArrowRight") &&
      !input.includes("ArrowLeft") &&
      input.includes("x")
    ) {
      this.player.setState(states.SHOOTING);
    }
    if (this.player.frameX === 4 && !this.bulletCreated) {
      this.createBulletAction.execute();
      this.bulletCreated = true;
    }

    if (this.player.frameX === 0 || this.player.frameX > 4) {
      this.bulletCreated = false;
    }
  }
}

export class CreateBulletAction {
  constructor(player) {
    this.player = player;
  }
  enter() {
    this.player.bulletFrameX = 0;
    this.player.bulletMaxFrame = 7;
    this.loop = false;
  }
  execute() {
    const bulletX = this.player.facingRight
      ? this.player.x + this.player.width / 2.5
      : this.player.x;

    const bullet = new this.player.Bullet(
      bulletX,
      this.player.y,
      this.player.facingRight ? 1 : -1
    );
    this.player.bullets.push(bullet);
  }
}

export class Hurt extends State {
  constructor(player) {
    super("Hurt");
    this.player = player;
  }
  enter() {
    this.player.frameX = 5;
    this.player.frameY = 2;
    this.player.maxFrame = 7;
    this.loop = false;
  }
  handleInput(input) {
    if (this.player.frameX >= this.player.maxFrame) {
      this.player.setState(states.IDLE);
    }
  }
}