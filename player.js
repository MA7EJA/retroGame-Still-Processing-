export class Player {
    constructor(game){
        this.game = game;
        this.spriteWidth = 48;
        this.spriteHeight = 48;
        this.width = this.spriteWidth * 2;
        this.height = this.spriteHeight * 2;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player')
    }
    update(){

    }
    draw(context){
        context.imageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}