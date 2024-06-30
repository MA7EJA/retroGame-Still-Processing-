export class ui {
  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.fontSize = 30;
    this.fontFamily = "Helvetica";
    this.spriteWidth = 32;
    this.spriteHeight = 16;
    this.width = this.spriteWidth * 2;
    this.height = this.spriteHeight * 2;
    this.frameX = 0;
    this.frameY = 0;
    this.image = document.getElementById("GuiElements");
  }
  draw(context) {
    context.font = this.fontSize + "px" + this.fontFamily;
    context.textAlight = "left";
    context.fillStyle = this.game.fontColor;
    context.fillText("Lives: " + this.player.lives, 20, 50);
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      0,
      -10,
      this.width,
      this.height
    );
  }
}