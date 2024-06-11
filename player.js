import { Idle, Running, Jumping, Falling, Shooting, RunningShooting } from "./playerStates.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.spriteWidth = 48;
    this.spriteHeight = 48;
    this.width = this.spriteWidth * 2;
    this.height = this.spriteHeight * 2;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.weight = 15;
    this.image = document.getElementById("player");
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.fps = 15;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0; 
    this.speed = 0;
    this.maxSpeed = 18;
    this.facingRight = true;
    this.states = [
      new Idle(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
      new Shooting(this),
      new RunningShooting(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input);
    this.x += this.speed * deltaTime * 0.01;

    if (this.currentState instanceof Shooting) {
      this.speed = 0;
    } else {
      switch (true) {
        case input.includes("ArrowRight"):
          this.speed = this.maxSpeed;
          this.facingRight = true;
          break;
        case input.includes("ArrowLeft"):
          this.speed = -this.maxSpeed;
          this.facingRight = false;
          break;
        default:
          this.speed = 0;
          break;
      }
    }

    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    this.y += this.vy * deltaTime * 0.01;
    if (!this.onGround()) this.vy += this.weight * deltaTime * 0.01;
    else this.vy = 0;

    if(this.frameTimer > this.frameInterval){
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        if (this.currentState.loop) {
          this.frameX = 0;
        } else {
          this.frameX = this.maxFrame;
        }
      }
    }else {
        this.frameTimer += deltaTime;
    }
  }
  draw(context) {
    context.imageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    if(this.facingRight){
        context.drawImage(
          this.image,
          this.frameX * this.spriteWidth,
          this.frameY * this.spriteHeight,
          this.spriteWidth,
          this.spriteHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );
    }else{
        context.save();
        context.translate(this.x + this.width, this.y); 
        context.scale(-1, 1);
        context.drawImage(
          this.image,
          this.frameX * this.spriteWidth,
          this.frameY * this.spriteHeight,
          this.spriteWidth,
          this.spriteHeight,
          0,
          0,
          this.width,
          this.height
        );
        context.restore();
    }
  }
  onGround() {
    return this.y >= this.game.height - this.height;
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}