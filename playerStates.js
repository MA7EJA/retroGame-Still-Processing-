const states = {
    IDLE: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3
}

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
        this.player.frameX = 4;
        this.player.frameY = 2;
        this.player.maxFrame = 0;
        this.loop = false; 
    }
    handleInput(input){
        if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
          this.player.setState(states.RUNNING);
        } else if (input.includes("ArrowUp")) {
          this.player.setState(states.JUMPING);
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
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super("Jumping");
    this.player = player;
  }
  enter() {
    if(this.player.onGround()) this.player.vy -= 10;
    this.player.frameX = 0;
    this.player.frameY = 3;
    this.player.maxFrame = 3;
    this.loop = false; 
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
    this.player.frameX = 4;
    this.player.frameY = 3;
    this.player.maxFrame = 0;
    this.loop = false; 
  }
  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(states.IDLE);
    }
  }
}