import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FloorCollisions } from "./collisions.js";
import { Camera } from "./camera.js";
import { SnakeEnemy } from "./enemies.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.background = new Background(this);
      this.floorCollisions = new FloorCollisions();
      this.player = new Player(
        this,
        this.floorCollisions,
        this.background,
        this.camera
      );
      this.enemies = [new SnakeEnemy(this, this.player)];
      this.camera = new Camera(
        this.width,
        this.height,
        this.background,
        this.floorCollisions,
        this.enemies
      );
      this.player.camera = this.camera;
      this.camera.enemies = this.enemies;
      this.input = new InputHandler();
    }

    update(deltaTime) {
      this.background.update();
      this.camera.update(this.player, deltaTime);
      this.player.update(this.input.keys, deltaTime);
      this.enemies.forEach((enemy) => enemy.update(deltaTime));
    }

    draw(context) {
      context.translate(-this.camera.x, -this.camera.y);
      this.background.draw(context);
      this.floorCollisions.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => enemy.draw(context));
    }
  }

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate(0);
});
