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
    this.pSpriteWidth = 32;
    this.pSriteHeight = 32;
    this.pWidth = this.pSpriteWidth * 2;
    this.pHeight = this.pSriteHeight * 2;
    this.pFrameX = 1;
    this.pFrameY = 2.5;
    this.aSpriteWidth = 32;
    this.aSriteHeight = 16;
    this.aWidth = this.aSpriteWidth * 2;
    this.aHeight = this.aSriteHeight * 2;
    this.aFrameX = 2;
    this.aFrameY = 3;
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
      54,
      -10,
      this.width,
      this.height
    );
    context.drawImage(
      this.image,
      this.pFrameX * this.pSpriteWidth,
      this.pFrameY * this.pSriteHeight,
      this.pSpriteWidth,
      this.pSriteHeight,
      -10,
      -10,
      this.pWidth,
      this.pHeight
    );
    context.drawImage(
      this.image,
      this.aFrameX * this.aSpriteWidth,
      this.aFrameY * this.aSriteHeight,
      this.aSpriteWidth,
      this.aSriteHeight,
      54,
      22,
      this.aWidth,
      this.aHeight
    );
  }
}