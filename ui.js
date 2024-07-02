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
    this.fImage = document.getElementById("tilesetGui");
    this.fSpriteWidth = 16;
    this.fSpriteHeight = 16;
    this.fWidth = this.fSpriteWidth * 2;
    this.fHeight = this.fSpriteHeight * 2;
    this.ftFrameX = 1;
    this.ftFrameY = 3;
    this.fbFrameX = 1;
    this.fbFrameY = 5;
    this.flFrameX = 0;
    this.flFrameY = 4;
    this.frFrameX = 2;
    this.frFrameY = 4;
  }
  draw(context) {
    context.font = this.fontSize + "px" + this.fontFamily;
    context.textAlight = "left";
    context.fillStyle = this.game.fontColor;
    context.fillText("Lives: " + this.player.lives, 20, 50);
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, 58);
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      58,
      -6,
      this.width,
      this.height
    );
    context.drawImage(
      this.image,
      this.pFrameX * this.pSpriteWidth,
      this.pFrameY * this.pSriteHeight,
      this.pSpriteWidth,
      this.pSriteHeight,
      -6,
      -6,
      this.pWidth,
      this.pHeight
    );
    context.drawImage(
      this.image,
      this.aFrameX * this.aSpriteWidth,
      this.aFrameY * this.aSriteHeight,
      this.aSpriteWidth,
      this.aSriteHeight,
      58,
      26,
      this.aWidth,
      this.aHeight
    );
    for (let x = 0; x < canvas.width; x += this.fWidth) {
      context.drawImage(
        this.fImage,
        this.ftFrameX * this.fSpriteWidth,
        this.ftFrameY * this.fSpriteHeight,
        this.fSpriteWidth,
        this.fSpriteHeight,
        x,
        58,
        this.fWidth,
        this.fHeight
      );
    }
    for (let x = 0; x < canvas.width; x += this.fWidth) {
      context.drawImage(
        this.fImage,
        this.fbFrameX * this.fSpriteWidth,
        this.fbFrameY * this.fSpriteHeight,
        this.fSpriteWidth,
        this.fSpriteHeight,
        x,
        canvas.height - 32,
        this.fWidth,
        this.fHeight
      );
    }
    for (let y = 74; y < canvas.height - 16; y += this.fHeight) {
      context.drawImage(
        this.fImage,
        this.flFrameX * this.fSpriteWidth,
        this.flFrameY * this.fSpriteHeight,
        this.fSpriteWidth,
        this.fSpriteHeight,
        0,
        y,
        this.fWidth,
        this.fHeight
      );
    }
    for (let y = 74; y < canvas.height - 16; y += this.fHeight) {
      context.drawImage(
        this.fImage,
        this.frFrameX * this.fSpriteWidth,
        this.frFrameY * this.fSpriteHeight,
        this.fSpriteWidth,
        this.fSpriteHeight,
        canvas.width - 32,
        y,
        this.fWidth,
        this.fHeight
      );
    }
    context.drawImage(
      this.fImage,
      this.frFrameX * this.fSpriteWidth,
      3 * this.fSpriteHeight,
      this.fSpriteWidth,
      this.fSpriteHeight,
      canvas.width - 32,
      58,
      this.fWidth,
      this.fHeight
    );
    context.drawImage(
      this.fImage,
      0 * this.fSpriteWidth,
      this.ftFrameY * this.fSpriteHeight,
      this.fSpriteWidth,
      this.fSpriteHeight,
      0,
      58,
      this.fWidth,
      this.fHeight
    );
    context.drawImage(
      this.fImage,
      0 * this.fSpriteWidth,
      5 * this.fSpriteHeight,
      this.fSpriteWidth,
      this.fSpriteHeight,
      0,
      canvas.height - 32,
      this.fWidth,
      this.fHeight
    );
    context.drawImage(
      this.fImage,
      this.frFrameX * this.fSpriteWidth,
      5 * this.fSpriteHeight,
      this.fSpriteWidth,
      this.fSpriteHeight,
      canvas.width - 32,
      canvas.height - 32,
      this.fWidth,
      this.fHeight
    );
  }
}