export class Camera {
  constructor(gameWidth, gameHeight) {
    this.x = 0;
    this.y = 0;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  update(player) {
    this.x = player.x - this.gameWidth / 2;
    this.y = player.y - this.gameHeight / 2;
  }
}
