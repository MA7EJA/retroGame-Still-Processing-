class Layer {
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update(){

    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 384 * 2;
    this.height = 256 * 2;
    this.background = document.getElementById("probaBackground");
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.background
    );
  }
  update() {
    this.layer1.update();
  }
  draw(context) {
    context.imageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    this.layer1.draw(context);
  }
}