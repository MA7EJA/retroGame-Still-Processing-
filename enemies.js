class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 15;
        this.frameINterval = 1000 / this.fps;
        this.frameTimer = 0;
    }
    update(){

    }
    draw(){

    }
}

class SpiderEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 48;
        this.height = 48;
        this.x = 200;
        this.y = 200;
        this.speedX = 2;
        this.maxFrame;
    }
}

export class SnakeEnemy {
  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.x = 0;
    this.y = 0;
    this.width = 64;
    this.height = 64;
    this.speed = 3;
    this.direction = 1;
    this.states = [new Idle(this), new Walking(this), new Attacking(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
  }

  update(deltaTime) {
    this.currentState.update(deltaTime);
  }

  draw(context) {
    this.currentState.draw(context);
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}

class OctopusEnemy extends Enemy{

}