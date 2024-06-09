const states = {
    IDLE: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3
}

class State {
    constructor(state){
        this.state = state;
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
  }
  handleInput(input) {
    if (input.indexOf() === -1) {
      this.player.setState(states.IDLE);
    }else if (input.includes("ArrowUp")) {
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
    if(this.player.onGround()) this.player.vy -= 20;
    this.player.frameX = 0;
    this.player.frameY = 3;
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
    this.player.frameX = 0;
    this.player.frameY = 3;
  }
  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(states.IDLE);
    }
  }
}