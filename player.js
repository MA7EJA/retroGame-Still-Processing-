import { Idle, Running, Jumping, Falling } from "./playerStates.js";

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
    this.weight = 0.8;
    this.image = document.getElementById("player");
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.fps = 15;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0; 
    this.speed = 0;
    this.maxSpeed = 3;
    this.facingRight = true;
    this.states = [
      new Idle(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input);
    this.x += this.speed;
    if (input.includes("ArrowRight")) {
        this.speed = this.maxSpeed;
        this.facingRight = true;
    }else if (input.includes("ArrowLeft")) {
        this.speed = -this.maxSpeed;
        this.facingRight = false;
    }else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;

    if(this.frameTimer > this.frameInterval){
      this.frameTimer = 0;
      if(this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
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
        context.translate(this.x + this.width, this.y); // Pomeramo se do kraja slike po x osi
        context.scale(-1, 1); // Flipujemo horizontalno
        context.drawImage(
          this.image,
          this.frameX * this.spriteWidth,
          this.frameY * this.spriteHeight,
          this.spriteWidth,
          this.spriteHeight,
          0,
          0,
          this.width, // Širina je negativna kako bi se ispravno nacrtao flip
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