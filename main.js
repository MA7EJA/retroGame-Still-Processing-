import { Player } from './player.js'
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FloorCollisions } from "./collisions.js";
import { Camera } from "./camera.js";
import { SnakeEnemy } from './enemies.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Game {
      constructor(width, height) {
        this.width = width;
        this.height = height;
        this.background = new Background(this);
        this.floorCollisions = new FloorCollisions();
        this.player = new Player(this, this.floorCollisions, this.background);
        this.input = new InputHandler();
        this.enemies = [new SnakeEnemy(this, this.player)];
      }
      update(deltaTime) {
        this.background.update()
        this.player.update(this.input.keys, deltaTime);
        this.enemies.forEach((enemy) => enemy.update(deltaTime));
      }
      draw(context) {
        this.background.draw(context);
        this.floorCollisions.draw(context);
        this.player.draw(context);
        this.enemies.forEach((enemy) => enemy.draw(context));
      }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate)
    }
    animate(0);
});